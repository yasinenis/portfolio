// Firebase ile Ziyaretçi Sayacı
document.addEventListener('DOMContentLoaded', function() {
    initFirebaseVisitorCounter();
});

// Firebase'i başlat ve ziyaretçi sayacını oluştur
function initFirebaseVisitorCounter() {
    try {
        // Firebase yapılandırmasını kontrol et
        if (!window.firebaseConfig || !window.firebaseConfig.apiKey) {
            console.error('Firebase yapılandırması bulunamadı veya eksik. config.js dosyasını kontrol edin.');
            return;
        }

        // Firebase'i başlat
        const firebaseApp = firebase.initializeApp(window.firebaseConfig);
        const database = firebase.database();

        // Ziyaretçi bilgisi için gereken verileri topla
        const visitorData = collectVisitorData();

        // Ziyareti kaydet
        recordVisit(database, visitorData);

        // Ziyaretçi sayısını göster
        createAndShowCounter(database);

        console.log('Firebase ziyaretçi sayacı başlatıldı.');
    } catch (error) {
        console.error('Firebase ziyaretçi sayacı başlatılamadı:', error);
    }
}

// Ziyaretçi verilerini topla
function collectVisitorData() {
    // Tarayıcı ve cihaz bilgilerini al
    const browserInfo = {
        userAgent: navigator.userAgent || "Bilinmeyen",
        language: navigator.language || "Bilinmeyen",
        screenWidth: window.screen.width || 0,
        screenHeight: window.screen.height || 0,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Bilinmeyen",
        platform: navigator.platform || "Bilinmeyen",
        vendor: navigator.vendor || "Bilinmeyen"
    };

    // Tarayıcı ve işletim sistemi tespiti
    const browserData = detectBrowser(browserInfo.userAgent);

    // Referrer bilgisi (kullanıcının hangi siteden geldiği)
    const referrer = document.referrer || 'Doğrudan ziyaret';

    // Ziyaretçi kimliği oluştur veya mevcut kimliği kullan
    let visitorId = localStorage.getItem('visitorId');
    let isNewVisitor = false;

    if (!visitorId) {
        isNewVisitor = true;
        // Benzersiz kimlik oluşturma için ek entropi faktörleri ekleyelim
        let randomPart = Math.random().toString(36).substring(2, 15);
        let timePart = Date.now().toString(36);
        
        // Tarayıcı bilgilerinden benzersiz bir kimlik oluştur
        const visitorData = browserInfo.userAgent + browserInfo.language + browserInfo.screenWidth + browserInfo.screenHeight + randomPart + timePart;
        
        // Basit bir hash fonksiyonu
        let hash = 0;
        for (let i = 0; i < visitorData.length; i++) {
            const char = visitorData.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 32bit integer'a çevir
        }
        visitorId = hash.toString() + '-' + randomPart;
        
        // Ziyaretçi kimliğini kaydet
        localStorage.setItem('visitorId', visitorId);
        localStorage.setItem('firstVisitTime', Date.now());
    }

    // Ekran boyutu değerini oluştur
    const screenSize = (browserInfo.screenWidth && browserInfo.screenHeight) 
        ? `${browserInfo.screenWidth}x${browserInfo.screenHeight}` 
        : "Bilinmeyen";

    return {
        visitorId: visitorId,
        isNewVisitor: isNewVisitor,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now(),
        browser: browserData.browser || "Bilinmeyen",
        browserVersion: browserData.version || "Bilinmeyen",
        os: browserData.os || "Bilinmeyen",
        screenSize: screenSize,
        language: browserInfo.language || "Bilinmeyen",
        timezone: browserInfo.timezone || "Bilinmeyen",
        referrer: referrer
    };
}

// Ziyareti Firebase'e kaydet
function recordVisit(database, visitorData) {
    try {
        // Günün tarihini al (YYYY-MM-DD formatında)
        const today = new Date().toISOString().split('T')[0];
        
        // Ziyaretçi detaylarını kaydet
        const visitorRef = database.ref('visitors/' + visitorData.visitorId);
        
        // Önce ziyaretçinin bilgilerini al
        visitorRef.once('value', snapshot => {
            const existingData = snapshot.val() || {};
            const visitCount = (existingData.visitCount || 0) + 1;
            
            // Ziyaretçi bilgilerini güncelle
            visitorRef.update({
                firstVisit: existingData.firstVisit || visitorData.date,
                firstVisitTime: existingData.firstVisitTime || visitorData.time,
                lastVisit: visitorData.date,
                lastVisitTime: visitorData.time,
                visitCount: visitCount,
                browser: visitorData.browser,
                browserVersion: visitorData.browserVersion,
                os: visitorData.os,
                screenSize: visitorData.screenSize,
                language: visitorData.language,
                timezone: visitorData.timezone
            });
            
            // Ziyaret kaydını ekle
            const visitRef = database.ref('visits').push();
            visitRef.set({
                visitorId: visitorData.visitorId,
                date: visitorData.date,
                time: visitorData.time,
                timestamp: visitorData.timestamp,
                browser: visitorData.browser,
                os: visitorData.os,
                screenSize: visitorData.screenSize,
                referrer: visitorData.referrer,
                isNewVisitor: visitorData.isNewVisitor,
                visitCount: visitCount
            });
            
            // Günlük ziyaret sayısını güncelle
            const dailyRef = database.ref('stats/daily/' + today);
            dailyRef.transaction(currentData => {
                // Günün toplam ziyaret sayısını artır
                const data = currentData || { total: 0, unique: [] };
                data.total = (data.total || 0) + 1;
                
                // Benzersiz ziyaretçileri güncelle
                if (!data.unique) data.unique = [];
                if (!data.unique.includes(visitorData.visitorId)) {
                    data.unique.push(visitorData.visitorId);
                }
                
                return data;
            });
        });
        
    } catch (error) {
        console.error('Ziyaret kaydedilemedi:', error);
    }
}

// Firebase'den gelen verilere göre sayacı oluştur ve göster
function createAndShowCounter(database) {
    try {
        // Ziyaretçi sayacı div'ini oluştur
        const counterElement = document.createElement('div');
        counterElement.id = 'visitorCounter';
        counterElement.className = 'visitor-counter';
        
        // Günlük ve toplam istatistikleri gösterecek HTML yapısını oluştur
        counterElement.innerHTML = `
            <div class="visitor-stats">
                <div class="visitor-stat-item">
                    <div class="visitor-stat-title">Toplam Ziyaretçi</div>
                    <div id="totalVisitors" class="visitor-stat-value">0</div>
                </div>
                <div class="visitor-stat-item">
                    <div class="visitor-stat-title">Bugünkü Ziyaretçi</div>
                    <div id="todayVisitors" class="visitor-stat-value">0</div>
                </div>
            </div>
            <div class="recent-visitors-container">
                <div class="recent-visitors-title">Son Ziyaretçiler</div>
                <div id="recentVisitors" class="recent-visitors-list"></div>
            </div>
        `;
        
        // Sayacı sayfaya ekle
        document.body.appendChild(counterElement);
        
        // Sayacın görünürlüğünü ayarla (önce gizli)
        counterElement.style.opacity = 0;
        
        // CSS stillerini ekle
        const counterStyle = document.createElement('style');
        counterStyle.textContent = `
            .visitor-counter {
                position: fixed !important;
                top: 15px !important;
                left: 15px !important;
                background-color: rgba(0, 0, 0, 0.8) !important;
                color: white !important;
                padding: 15px !important;
                border-radius: 8px !important;
                font-family: Arial, sans-serif !important;
                font-size: 14px !important;
                z-index: 9998 !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
                max-width: 300px !important;
                backdrop-filter: blur(5px) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                transition: opacity 0.3s ease !important;
            }
            
            .visitor-stats {
                display: flex !important;
                justify-content: space-between !important;
                margin-bottom: 10px !important;
            }
            
            .visitor-stat-item {
                text-align: center !important;
                flex: 1 !important;
            }
            
            .visitor-stat-title {
                font-size: 12px !important;
                color: rgba(255, 255, 255, 0.7) !important;
                margin-bottom: 5px !important;
            }
            
            .visitor-stat-value {
                font-size: 18px !important;
                font-weight: bold !important;
                color: #007bff !important;
            }
            
            .recent-visitors-container {
                border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
                padding-top: 10px !important;
            }
            
            .recent-visitors-title {
                font-size: 12px !important;
                color: rgba(255, 255, 255, 0.7) !important;
                margin-bottom: 8px !important;
            }
            
            .recent-visitors-list {
                max-height: 150px !important;
                overflow-y: auto !important;
                font-size: 12px !important;
            }
            
            .recent-visitor-item {
                padding: 5px 0 !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
            }
            
            .recent-visitor-item:last-child {
                border-bottom: none !important;
            }
            
            .visitor-info {
                flex: 1 !important;
            }
            
            .visitor-browser {
                display: inline-block !important;
                margin-right: 5px !important;
                color: #007bff !important;
            }
            
            .visitor-date {
                color: rgba(255, 255, 255, 0.5) !important;
                font-size: 10px !important;
            }
            
            .visitor-status {
                padding: 2px 5px !important;
                border-radius: 3px !important;
                font-size: 9px !important;
                font-weight: bold !important;
                text-transform: uppercase !important;
            }
            
            .status-new {
                background-color: #28a745 !important;
                color: white !important;
            }
            
            .status-returning {
                background-color: #17a2b8 !important;
                color: white !important;
            }
            
            ::-webkit-scrollbar {
                width: 5px !important;
            }
            
            ::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 5px !important;
            }
            
            ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3) !important;
                border-radius: 5px !important;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.5) !important;
            }
        `;
        document.head.appendChild(counterStyle);
        
        // Animasyon ile görünür yapma
        setTimeout(() => {
            counterElement.style.opacity = 1;
        }, 1000);
        
        // Firebase'den istatistikleri getir ve göster
        displayVisitorCount(database);
        
    } catch (error) {
        console.error('Ziyaretçi sayacı oluşturulamadı:', error);
    }
}

// Firebase'den ziyaretçi istatistiklerini getir ve göster
function displayVisitorCount(database) {
    try {
        // Günün tarihini al (YYYY-MM-DD formatında)
        const today = new Date().toISOString().split('T')[0];
        
        // Günlük istatistikler için referans
        const dailyStatsRef = database.ref('stats/daily/' + today);
        
        // Günlük istatistikleri dinle ve güncelle
        dailyStatsRef.on('value', (snapshot) => {
            const todayStats = snapshot.val() || { total: 0, unique: [] };
            // Bugünkü ziyaretçi sayısını güncelle
            const uniqueVisitorsToday = todayStats.unique ? todayStats.unique.length : 0;
            updateStatisticsHTML('todayVisitors', uniqueVisitorsToday);
        });
        
        // Toplam ziyaretçi sayısı için referans
        const visitorsRef = database.ref('visitors');
        
        // Toplam ziyaretçi sayısını dinle ve güncelle
        visitorsRef.on('value', (snapshot) => {
            const totalUniqueVisitors = snapshot.numChildren();
            updateStatisticsHTML('totalVisitors', totalUniqueVisitors);
        });
        
        // Son ziyaretleri göstermek için referans
        const visitsRef = database.ref('visits').orderByChild('timestamp').limitToLast(10);
        
        // Son ziyaretleri dinle ve güncelle
        visitsRef.on('value', (snapshot) => {
            const visits = [];
            
            // Firebase'den gelen verileri array'e çevir
            snapshot.forEach((childSnapshot) => {
                const visit = childSnapshot.val();
                visits.push(visit);
            });
            
            // Ziyaretleri tarihe göre sırala (en son ziyaret üstte)
            visits.sort((a, b) => b.timestamp - a.timestamp);
            
            // Aynı ziyaretçiden gelen en son ziyareti göster (uniq ziyaretçilere göre grupla)
            const uniqueVisits = {};
            visits.forEach(visit => {
                // Eğer bu ziyaretçi daha önce eklenmemişse veya daha yeni bir ziyaret ise ekle
                if (!uniqueVisits[visit.visitorId] || uniqueVisits[visit.visitorId].timestamp < visit.timestamp) {
                    uniqueVisits[visit.visitorId] = visit;
                }
            });
            
            // Yeniden sırala ve en fazla 10 kayıt göster
            const sonBenzersizZiyaretler = Object.values(uniqueVisits)
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 10);
            
            console.log('Son benzersiz ziyaretler:', sonBenzersizZiyaretler);
            
            // Son ziyaretleri HTML'de göster
            updateRecentVisits('recentVisitors', sonBenzersizZiyaretler, getSafeValue);
        });
        
        // Güvenli değer alma yardımcı fonksiyonu
        const getSafeValue = (visitor, key, defaultValue = "Bilinmeyen") => {
            if (!visitor) return defaultValue;
            return visitor[key] !== undefined && visitor[key] !== null ? visitor[key] : defaultValue;
        };
        
    } catch (error) {
        console.error('Ziyaretçi sayıları görüntülenemedi:', error);
    }
}

// Tarayıcı ve işletim sistemi tespiti
function detectBrowser(userAgent) {
    // Varsayılan değerler
    let browser = "Bilinmeyen";
    let version = "Bilinmeyen";
    let os = "Bilinmeyen";
    
    try {
        userAgent = userAgent.toLowerCase();
        
        // İşletim sistemi tespiti
        if (userAgent.indexOf("win") != -1) os = "Windows";
        else if (userAgent.indexOf("mac") != -1) os = "MacOS";
        else if (userAgent.indexOf("linux") != -1) os = "Linux";
        else if (userAgent.indexOf("android") != -1) os = "Android";
        else if (userAgent.indexOf("iphone") != -1 || userAgent.indexOf("ipad") != -1) os = "iOS";
        
        // Tarayıcı tespiti
        if (userAgent.indexOf("edge") != -1 || userAgent.indexOf("edg/") != -1) {
            browser = "Edge";
            const match = userAgent.match(/(edge|edg)\/(\d+(\.\d+)?)/);
            if (match && match[2]) version = match[2];
        } else if (userAgent.indexOf("chrome") != -1) {
            browser = "Chrome";
            const match = userAgent.match(/chrome\/(\d+(\.\d+)?)/);
            if (match && match[1]) version = match[1];
        } else if (userAgent.indexOf("firefox") != -1) {
            browser = "Firefox";
            const match = userAgent.match(/firefox\/(\d+(\.\d+)?)/);
            if (match && match[1]) version = match[1];
        } else if (userAgent.indexOf("safari") != -1 && userAgent.indexOf("chrome") == -1) {
            browser = "Safari";
            const match = userAgent.match(/version\/(\d+(\.\d+)?)/);
            if (match && match[1]) version = match[1];
        } else if (userAgent.indexOf("opera") != -1 || userAgent.indexOf("opr/") != -1) {
            browser = "Opera";
            const match = userAgent.match(/(opera|opr)\/(\d+(\.\d+)?)/);
            if (match && match[2]) version = match[2];
        }
        
        // Versiyon basitleştirme (sadece ana sürüm)
        if (version !== "Bilinmeyen") {
            const majorVersion = version.split('.')[0];
            version = majorVersion;
        }
    } catch (error) {
        console.error('Tarayıcı tespitinde hata:', error);
    }
    
    return { browser, version, os };
}

// İstatistikleri HTML'de güncelle
function updateStatisticsHTML(elementId, data) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = data.toString();
    }
}

// Son ziyaretleri HTML'de güncelle
function updateRecentVisits(elementId, visits, getSafeValue) {
    const element = document.getElementById(elementId);
    
    if (element) {
        // İçeriği temizle
        element.innerHTML = '';
        
        // Ziyaret yoksa mesaj göster
        if (!visits || visits.length === 0) {
            element.innerHTML = '<div class="recent-visitor-item">Henüz ziyaret yok</div>';
            return;
        }
        
        // Her ziyaret için HTML oluştur
        visits.forEach(visit => {
            const browser = getSafeValue(visit, 'browser');
            const os = getSafeValue(visit, 'os');
            const date = getSafeValue(visit, 'date');
            const time = getSafeValue(visit, 'time');
            const isNewVisitor = getSafeValue(visit, 'isNewVisitor', false);
            const visitCount = getSafeValue(visit, 'visitCount', 1);
            
            // Ziyaretçi durumu (yeni/tekrarlayan)
            let statusClass = isNewVisitor ? 'status-new' : 'status-returning';
            let statusText = isNewVisitor ? 'Yeni' : `${visitCount}. ziyaret`;
            
            // HTML oluştur
            const visitHTML = `
                <div class="recent-visitor-item">
                    <div class="visitor-info">
                        <div>
                            <span class="visitor-browser">${browser}</span>
                            <span class="visitor-os">${os}</span>
                        </div>
                        <div class="visitor-date">${date} ${time}</div>
                    </div>
                    <div class="visitor-status ${statusClass}">${statusText}</div>
                </div>
            `;
            
            // HTML'i ekle
            element.innerHTML += visitHTML;
        });
    }
} 