// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Ziyaretçi sayacını oluştur - önce oluşturup sonra değerleri güncelleyelim
    createVisitorCounter();
    
    // Çerez tercihinden bağımsız olarak her ziyaretçiyi takip et
    trackVisitor();
    
    // Her durumda ziyaretçi sayısını göster (sayaç görünür olmasa da değerleri güncelle)
    displayVisitorCount();
    
    // Özel tuş kombinasyonu (Ctrl+Alt+Z) ile sayacı göster/gizle
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.altKey && e.key === 'z') {
            const visitorCounter = document.getElementById('visitorCounter');
            if (visitorCounter) {
                if (visitorCounter.style.display === 'none' || visitorCounter.style.display === '') {
                    visitorCounter.style.display = 'flex';
                    visitorCounter.style.opacity = '1';
                    // Sayacı gösterdikten 5 saniye sonra tekrar gizle
                    setTimeout(() => {
                        visitorCounter.style.opacity = '0';
                        setTimeout(() => {
                            visitorCounter.style.display = 'none';
                        }, 300);
                    }, 10000); // 10 saniye göster
                } else {
                    visitorCounter.style.opacity = '0';
                    setTimeout(() => {
                        visitorCounter.style.display = 'none';
                    }, 300);
                }
            }
        }
    });
    
    // Kullanıcının çerez onayını kontrol et (yalnızca çerez amaçlı)
    if (localStorage.getItem('cookieConsentAccepted') === 'true') {
        console.log('Çerezler kabul edildi.');
    } else if (localStorage.getItem('cookieConsentDeclined') === 'true') {
        console.log('Çerezler reddedildi, ancak ziyaretçi sayımı devam ediyor.');
    } else {
        // Çerez bildirimini göstermeye devam et
        // Ama ziyaretçi sayımı yine de yapılacak
    }
    
    // Navbar scroll event
    const navbar = document.querySelector('nav');
    const heroSection = document.querySelector('.hero');
    const sections = document.querySelectorAll('.section');
    const heroNavLinks = document.querySelectorAll('.hero-nav ul li a');
    
    // Aktif bölümü işaretle
    function setActiveSection() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - (navbar?.offsetHeight || 0) - 10;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Hero navigasyon için aktif sınıfı güncelle
        heroNavLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', function() {
        // Hero bölümünün görünürlüğünü kontrol et
        if (heroSection) {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            if (navbar && heroBottom <= 0) {
                navbar.style.opacity = '1';
            } else if (navbar) {
                navbar.style.opacity = '0.9';
            }
        }
        
        // Aktif bölümü güncelle
        setActiveSection();
    });
    
    // Sayfa yüklendiğinde aktif bölümü ayarla
    setActiveSection();
    
    // Smooth scroll için tüm navigasyon linklerini ayarla (hero nav)
    document.querySelectorAll('.hero-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (navbar?.offsetHeight || 0),
                    behavior: 'smooth'
                });
                
                // Tüm aktif sınıfları kaldır
                heroNavLinks.forEach(link => link.classList.remove('active'));
                
                // Tıklanan link'e aktif sınıfını ekle
                this.classList.add('active');
            }
        });
    });
    
    // Hero navigasyonunda hover efekti için
    heroNavLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            heroNavLinks.forEach(l => {
                if (l !== this) {
                    l.style.opacity = '0.7';
                }
            });
        });
        
        link.addEventListener('mouseleave', function() {
            heroNavLinks.forEach(l => {
                l.style.opacity = '1';
            });
        });
    });
    
    // Yetenek çubuklarını doğrudan aktifleştir
    const skillBars = document.querySelectorAll('.skill-level');
    
    // Artık beceri seviyeleri CSS sınıflarıyla kontrol ediliyor
    // JavaScript müdahale etmiyor
    
    // Telif yılını güncelle
    if (document.getElementById('current-year')) {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
    
    // Dil değiştirme fonksiyonu
    const langToggle = document.getElementById('langToggle');
    const langIcon = document.getElementById('lang-icon');
    
    // Dil çevirisi metinleri
    const translations = {
        tr: {
            // Navbar
            "nav-hakkimda": "Hakkımda",
            "nav-yetenekler": "Yeteneklerim",
            "nav-projelerim": "Projelerim",
            "nav-egitim": "Eğitim",
            "nav-iletisim": "İletişim",
            
            // Hero
            "hero-title": "Merhaba, Ben Yasin Eniş",
            "hero-subtitle": "Bilgisayar Mühendisliği Öğrencisi & Teknoloji Tutkunu",
            
            // Sections
            "section-hakkimda-title": "Hakkımda",
            "section-hakkimda-p1": "Merhaba! Ben Yasin Eniş. Bilgisayar Mühendisliği ikinci sınıf öğrencisiyim ve teknoloji alanında tutkulu biriyim. Yeni projeler geliştirmeye ve heyecan verici projelere katkıda bulunmaya her zaman istekliyim.",
            "section-hakkimda-p2": "Çeşitli programlama dilleri ve teknolojilerdeki becerilerim sayesinde, farklı problemleri çözmek ve yaratıcı çözümler üretmek için çalışıyorum. Bu web sitesi, becerilerimi ve deneyimlerimi paylaşmak için oluşturulmuştur.",
            
            "section-yetenekler-title": "Yeteneklerim",
            "section-skill-cat-1": "Programlama Dilleri",
            "section-skill-cat-2": "Web Geliştirme",
            "section-skill-cat-3": "Veritabanları",
            "section-skill-cat-4": "Araçlar & Teknolojiler",
            
            "section-projelerim-title": "Projelerim",
            "section-projelerim-coming-soon": "Yakında",
            "section-projelerim-desc": "Projelerim bu bölümde yakında paylaşılacaktır.",
            
            "section-egitim-title": "Eğitim",
            "section-egitim-uni": "Recep Tayyip Erdoğan Üniversitesi",
            "section-egitim-program": "Bilgisayar Mühendisliği",
            "section-egitim-period": "İkinci Sınıf (Tahmini Mezuniyet: 2027)",
            
            "section-iletisim-title": "İletişim",
            "section-iletisim-email": "E-posta",
            
            // Footer
            "footer-copyright": "Tüm hakları saklıdır.",
            "footer-privacy": "Gizlilik Politikası",
            
            // Visitor counter
            "visitor-counter": "Ziyaretçi Sayısı:",
            "visitor-unique": "Benzersiz Ziyaretçi:",
            "visitor-today": "Bugün:",
            "visitor-week": "Bu Hafta:",
            "visitor-month": "Bu Ay:",
            "visitor-year": "Bu Yıl:"
        },
        en: {
            // Navbar
            "nav-hakkimda": "About Me",
            "nav-yetenekler": "Skills",
            "nav-projelerim": "Projects",
            "nav-egitim": "Education",
            "nav-iletisim": "Contact",
            
            // Hero
            "hero-title": "Hello, I'm Yasin Eniş",
            "hero-subtitle": "Computer Engineering Student & Technology Enthusiast",
            
            // Sections
            "section-hakkimda-title": "About Me",
            "section-hakkimda-p1": "Hello! I'm Yasin Eniş. I'm a second-year Computer Engineering student and passionate about technology. I'm always eager to develop new projects and contribute to exciting projects.",
            "section-hakkimda-p2": "With my skills in various programming languages and technologies, I work to solve different problems and create innovative solutions. This website was created to share my skills and experiences.",
            
            "section-yetenekler-title": "My Skills",
            "section-skill-cat-1": "Programming Languages",
            "section-skill-cat-2": "Web Development",
            "section-skill-cat-3": "Databases",
            "section-skill-cat-4": "Tools & Technologies",
            
            "section-projelerim-title": "My Projects",
            "section-projelerim-coming-soon": "Coming Soon",
            "section-projelerim-desc": "My projects will be shared in this section soon.",
            
            "section-egitim-title": "Education",
            "section-egitim-uni": "Recep Tayyip Erdoğan University",
            "section-egitim-program": "Computer Engineering",
            "section-egitim-period": "Second Year (Expected Graduation: 2027)",
            
            "section-iletisim-title": "Contact",
            "section-iletisim-email": "Email",
            
            // Footer
            "footer-copyright": "All rights reserved.",
            "footer-privacy": "Privacy Policy",
            
            // Visitor counter
            "visitor-counter": "Visitor Count:",
            "visitor-unique": "Unique Visitors:",
            "visitor-today": "Today:",
            "visitor-week": "This Week:",
            "visitor-month": "This Month:",
            "visitor-year": "This Year:"
        }
    };
    
    // Dil durumu (başlangıçta İngilizce)
    let currentLang = 'en';
    
    // HTML lang etiketini İngilizce olarak ayarla
    document.documentElement.setAttribute('lang', 'en');
    
    // Dil butonunun görüntüsünü değiştir (Türkçe bayrağı gösterilerek İngilizce'den Türkçe'ye geçiş yapılabileceğini belirt)
    langIcon.src = 'https://flagcdn.com/w40/tr.png';
    langIcon.alt = 'Türkçe';
    langToggle.title = 'Dili Değiştir';
    
    // Sayfa yüklendiğinde İngilizce metinleri uygula
    updateLanguage(currentLang);
    
    // Tüm çevirilebilecek metinleri güncelleme fonksiyonu
    function updateLanguage(lang) {
        // Navigasyon metinleri
        document.querySelectorAll('.nav-text').forEach(item => {
            const href = item.parentElement.getAttribute('href').substring(1); // # işaretini kaldır
            if (href === 'hakkimda') item.textContent = translations[lang]['nav-hakkimda'];
            if (href === 'yetenekler') item.textContent = translations[lang]['nav-yetenekler'];
            if (href === 'projelerim') item.textContent = translations[lang]['nav-projelerim'];
            if (href === 'egitim') item.textContent = translations[lang]['nav-egitim'];
            if (href === 'iletisim') item.textContent = translations[lang]['nav-iletisim'];
        });
        
        // Hero bölümü
        document.querySelector('.hero h1').textContent = translations[lang]['hero-title'];
        document.querySelector('.hero p').textContent = translations[lang]['hero-subtitle'];
        
        // Hakkımda bölümü
        document.querySelector('#hakkimda h2').textContent = translations[lang]['section-hakkimda-title'];
        const hakkimdaParagraphs = document.querySelectorAll('#hakkimda p');
        hakkimdaParagraphs[0].textContent = translations[lang]['section-hakkimda-p1'];
        hakkimdaParagraphs[1].textContent = translations[lang]['section-hakkimda-p2'];
        
        // Yetenekler bölümü
        document.querySelector('#yetenekler h2').textContent = translations[lang]['section-yetenekler-title'];
        const skillCategories = document.querySelectorAll('.skill-category-title');
        skillCategories[0].textContent = translations[lang]['section-skill-cat-1'];
        skillCategories[1].textContent = translations[lang]['section-skill-cat-2'];
        skillCategories[2].textContent = translations[lang]['section-skill-cat-3'];
        skillCategories[3].textContent = translations[lang]['section-skill-cat-4'];
        
        // Projelerim bölümü
        document.querySelector('#projelerim h2').textContent = translations[lang]['section-projelerim-title'];
        document.querySelector('.coming-soon-container h3').textContent = translations[lang]['section-projelerim-coming-soon'];
        document.querySelector('.coming-soon-container p').textContent = translations[lang]['section-projelerim-desc'];
        
        // Eğitim bölümü
        document.querySelector('#egitim h2').textContent = translations[lang]['section-egitim-title'];
        document.querySelector('.education-item h3').textContent = translations[lang]['section-egitim-uni'];
        document.querySelector('.education-program').textContent = translations[lang]['section-egitim-program'];
        document.querySelector('.education-period').textContent = translations[lang]['section-egitim-period'];
        
        // İletişim bölümü
        document.querySelector('#iletisim h2').textContent = translations[lang]['section-iletisim-title'];
        
        // Footer
        document.querySelector('footer p').innerHTML = '&copy; <span id="current-year">' + new Date().getFullYear() + '</span> Yasin Eniş. <span data-lang="footer-copyright">' + translations[lang]['footer-copyright'] + '</span> | <a href="privacy-policy.html" class="footer-link" data-lang="footer-privacy">' + translations[lang]['footer-privacy'] + '</a>';
        
        // Diğer data-lang özniteliği içeren öğeleri çevir
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        
        // Ziyaretçi sayaç metinlerini güncelle
        if (document.getElementById('visitor-counter-title')) {
            document.getElementById('visitor-counter-title').textContent = translations[lang]['visitor-counter'];
        }
        if (document.getElementById('visitor-unique-title')) {
            document.getElementById('visitor-unique-title').textContent = translations[lang]['visitor-unique'];
        }
        if (document.getElementById('visitor-today-title')) {
            document.getElementById('visitor-today-title').textContent = translations[lang]['visitor-today'];
        }
        if (document.getElementById('visitor-week-title')) {
            document.getElementById('visitor-week-title').textContent = translations[lang]['visitor-week'];
        }
        if (document.getElementById('visitor-month-title')) {
            document.getElementById('visitor-month-title').textContent = translations[lang]['visitor-month'];
        }
        if (document.getElementById('visitor-year-title')) {
            document.getElementById('visitor-year-title').textContent = translations[lang]['visitor-year'];
        }
    }
    
    // Dil değiştirme butonuna tıklama olayı
    langToggle.addEventListener('click', function() {
        if (currentLang === 'tr') {
            // Türkçe'den İngilizce'ye geçiş
            currentLang = 'en';
            document.documentElement.setAttribute('lang', 'en');
            langIcon.src = 'https://flagcdn.com/w40/tr.png';
            langIcon.alt = 'Türkçe';
            this.title = 'Dili Değiştir';
        } else {
            // İngilizce'den Türkçe'ye geçiş
            currentLang = 'tr';
            document.documentElement.setAttribute('lang', 'tr');
            langIcon.src = 'https://flagcdn.com/w40/gb.png';
            langIcon.alt = 'English';
            this.title = 'Change Language';
        }
        
        // Dil çevirilerini uygula
        updateLanguage(currentLang);
    });
    
    // İletişim formu işlevselliği
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Formspree.io'ya gönder (buraya kendi formspree ID'nizi eklemelisiniz)
            fetch('https://formspree.io/f/XXXX', { // XXXX yerine formspree ID'nizi ekleyin
                method: 'POST',
                body: JSON.stringify(formDataObj),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    // Başarılı yanıt
                    formStatus.textContent = window.currentLang === 'tr' ? 
                        'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.' : 
                        'Your message has been sent successfully! I will get back to you as soon as possible.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                    
                    // 5 saniye sonra durum mesajını kaldır
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                formStatus.textContent = window.currentLang === 'tr' ? 
                    'Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta ile iletişime geçin.' : 
                    'An error occurred. Please try again later or contact me directly via email.';
                formStatus.className = 'form-status error';
                
                // 5 saniye sonra durum mesajını kaldır
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            });
        });
    }
    
    // Dil değişimi için iletişim formu etiketlerini güncelle
    function updateContactFormLanguage(lang) {
        const translations = {
            tr: {
                "contact-form-title": "Benimle İletişime Geçin",
                "contact-form-name": "Ad Soyad",
                "contact-form-email": "E-posta",
                "contact-form-subject": "Konu",
                "contact-form-message": "Mesajınız",
                "contact-form-submit": "Gönder"
            },
            en: {
                "contact-form-title": "Contact Me",
                "contact-form-name": "Full Name",
                "contact-form-email": "Email",
                "contact-form-subject": "Subject",
                "contact-form-message": "Your Message",
                "contact-form-submit": "Send"
            }
        };
        
        // Form etiketlerini güncelle
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }
    
    // Dil değiştirme işlevine form çevirilerini ekle
    if (typeof window.updateLanguage === 'function') {
        const originalUpdateLanguage = window.updateLanguage;
        window.updateLanguage = function(lang) {
            originalUpdateLanguage(lang);
            updateContactFormLanguage(lang);
        };
        
        // Sayfa yüklendiğinde mevcut dile göre güncelle
        if (window.currentLang) {
            updateContactFormLanguage(window.currentLang);
        }
    }
});

// Ziyaretçi takibi
function trackVisitor() {
    try {
        // Geçerli tarih ve zaman
        const today = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
        const visitTimestamp = new Date().getTime();
        
        // Ziyaretçi kimliği oluştur - eğer varsa mevcut kimliği kullan, yoksa yeni oluştur
        let visitorId = localStorage.getItem('visitorId');
        let firstVisit = false;
        
        // Tarayıcı ve cihaz bilgilerini al
        const browserInfo = {
            userAgent: navigator.userAgent || "Bilinmeyen",
            language: navigator.language || "Bilinmeyen",
            screenWidth: window.screen.width || 0,
            screenHeight: window.screen.height || 0,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Bilinmeyen",
            platform: navigator.platform || "Bilinmeyen",
            vendor: navigator.vendor || "Bilinmeyen",
            cookiesEnabled: navigator.cookieEnabled
        };
        
        // Tarayıcı ve işletim sistemi tespiti
        const browserData = detectBrowser(browserInfo.userAgent);
        
        // Referrer bilgisi (kullanıcının hangi siteden geldiği)
        const referrer = document.referrer || 'Doğrudan ziyaret';
        
        if (!visitorId) {
            firstVisit = true;
            
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
            // İlk ziyaret zamanını kaydet
            localStorage.setItem('firstVisitTime', visitTimestamp);
            
            // Bilgilendirme çerezi
            if (!sessionStorage.getItem('counterInfoShown')) {
                console.info("Not: Bu ziyaretçi sayacı her kullanıcı için yereldir ve sadece kendi ziyaretlerinizi sayar. Gerçek ziyaretçi sayımı için sunucu taraflı analitik hizmetleri kullanılmalıdır.");
                sessionStorage.setItem('counterInfoShown', 'true');
            }
        }
        
        // Önceki oturumdan beri geçen süre (dakika cinsinden)
        const lastSessionTime = parseInt(localStorage.getItem('lastSessionTime') || '0');
        const timeSinceLastSession = lastSessionTime ? Math.floor((visitTimestamp - lastSessionTime) / (1000 * 60)) : null;
        
        // Mevcut oturum zamanını kaydet
        localStorage.setItem('lastSessionTime', visitTimestamp);
        
        // LocalStorage'den ziyaretçi bilgilerini kontrol et
        let visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
        let todayVisitors = JSON.parse(localStorage.getItem('todayVisitors') || '{}');
        let visitorSessions = JSON.parse(localStorage.getItem('visitorSessions') || '[]');
        
        // Ekran boyutu değerini güvenli şekilde oluştur
        const screenSize = (browserInfo.screenWidth && browserInfo.screenHeight) 
            ? `${browserInfo.screenWidth}x${browserInfo.screenHeight}` 
            : "Bilinmeyen";
        
        // Benzersiz ziyaretçileri sakla
        if (!visitors[visitorId]) {
            visitors[visitorId] = {
                firstVisit: today,
                firstVisitTime: currentTime,
                visits: 0,
                browser: browserData.browser || "Bilinmeyen",
                browserVersion: browserData.version || "Bilinmeyen",
                os: browserData.os || "Bilinmeyen",
                screenSize: screenSize,
                language: browserInfo.language || "Bilinmeyen",
                platform: browserInfo.platform || "Bilinmeyen",
                timezone: browserInfo.timezone || "Bilinmeyen"
            };
        }
        
        // Ziyaret sayısını artır
        visitors[visitorId].visits += 1;
        visitors[visitorId].lastVisit = today;
        visitors[visitorId].lastVisitTime = currentTime;
        
        // Oturum bilgisini kaydet
        visitorSessions.push({
            visitorId: visitorId,
            date: today,
            time: currentTime,
            timestamp: visitTimestamp,
            referrer: referrer || "Bilinmeyen",
            newVisitor: firstVisit,
            timeSinceLastSession: timeSinceLastSession,
            browser: browserData.browser || "Bilinmeyen",
            os: browserData.os || "Bilinmeyen",
            screenSize: screenSize
        });
        
        // Maksimum 100 oturum kaydı sakla (performans için)
        if (visitorSessions.length > 100) {
            visitorSessions = visitorSessions.slice(-100);
        }
        
        // Bugünkü ziyaretçileri sakla
        if (!todayVisitors[today]) {
            todayVisitors[today] = [];
        }
        
        if (!todayVisitors[today].includes(visitorId)) {
            todayVisitors[today].push(visitorId);
        }
        
        // LocalStorage'a kaydet
        localStorage.setItem('visitors', JSON.stringify(visitors));
        localStorage.setItem('todayVisitors', JSON.stringify(todayVisitors));
        localStorage.setItem('visitorSessions', JSON.stringify(visitorSessions));
        
        console.log("Ziyaretçi kaydedildi:", visitorId, browserData);
        
        // Sayaca bilgileri yansıt
        displayVisitorCount();
        
    } catch (error) {
        console.error('Ziyaretçi bilgileri kaydedilemedi:', error);
    }
}

// Ziyaretçi sayacı oluşturma
function createVisitorCounter() {
    // Önce varsa eski sayaç elementini kaldır
    const existingCounter = document.querySelector('.visitor-counter');
    if (existingCounter) {
        existingCounter.remove();
    }
    
    // Sayaç konteynerini oluştur
    const visitorCounter = document.createElement('div');
    visitorCounter.className = 'visitor-counter';
    visitorCounter.id = 'visitorCounter';
    
    // Sayaç içeriği - Ana sayaç ve detaylı istatistikler için ayrı bölümler
    visitorCounter.innerHTML = `
        <div class="visitor-count-main">
            <div class="visitor-count-item">
                <span id="visitor-unique-title" data-lang="visitor-unique">Benzersiz Ziyaretçi:</span>
                <span id="visitor-unique-count">0</span>
            </div>
            <div class="visitor-count-item">
                <span id="visitor-today-title" data-lang="visitor-today">Bugün:</span>
                <span id="visitor-today-count">0</span>
            </div>
            <div class="visitor-count-item">
                <span id="visitor-week-title" data-lang="visitor-week">Bu Hafta:</span>
                <span id="visitor-week-count">0</span>
            </div>
            <div class="visitor-count-item">
                <span id="visitor-month-title" data-lang="visitor-month">Bu Ay:</span>
                <span id="visitor-month-count">0</span>
            </div>
            <div class="visitor-count-item">
                <span id="visitor-year-title" data-lang="visitor-year">Bu Yıl:</span>
                <span id="visitor-year-count">0</span>
            </div>
            <div class="visitor-info-note">
                Not: Bu sayaç yerel depolamada saklanır ve yalnızca bu cihazdan yapılan ziyaretleri gösterir.
            </div>
        </div>
        <div class="visitor-count-details" id="visitor-details">
            <h3>Detaylı İstatistikler</h3>
            <div class="details-section">
                <h4>İşletim Sistemleri</h4>
                <div id="visitor-os-stats" class="stat-list"></div>
            </div>
            <div class="details-section">
                <h4>Tarayıcılar</h4>
                <div id="visitor-browser-stats" class="stat-list"></div>
            </div>
            <div class="details-section">
                <h4>Ekran Boyutları</h4>
                <div id="visitor-screen-stats" class="stat-list"></div>
            </div>
            <div class="details-section">
                <h4>Son Benzersiz Ziyaretler</h4>
                <div id="visitor-recent-stats" class="recent-visits"></div>
            </div>
        </div>
    `;
    
    // Herhangi bir mevcut sayacı önce kaldır
    const oldCounter = document.getElementById('visitorCounter');
    if (oldCounter) {
        oldCounter.remove();
    }
    
    // Sayacı document.body'nin doğrudan alt öğesi olarak ekle
    document.body.appendChild(visitorCounter);
    
    // Sayaç için stil ekle
    const style = document.createElement('style');
    style.textContent = `
        #visitorCounter {
            position: fixed !important;
            top: 15px !important;
            left: 15px !important;
            background-color: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 9999 !important;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0;
            transition: opacity 0.3s ease;
            transform: none !important;
            width: auto !important;
            min-width: 250px;
            max-width: 350px !important;
            height: auto !important;
            margin: 0 !important;
            pointer-events: auto !important;
            display: none; /* Başlangıçta sayacı gizle */
            overflow-y: auto;
            max-height: 80vh;
        }
        
        .visitor-count-main {
            display: flex;
            flex-direction: column;
            gap: 5px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 8px;
        }
        
        .visitor-count-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
        }
        
        #visitor-unique-count, #visitor-today-count, #visitor-week-count, #visitor-month-count, #visitor-year-count {
            font-weight: bold;
            color: #007bff;
        }
        
        .visitor-info-note {
            font-size: 11px;
            color: #ff9800;
            margin-top: 5px;
            padding: 5px;
            border-radius: 4px;
            background-color: rgba(255, 152, 0, 0.1);
            text-align: center;
        }
        
        .visitor-count-details {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .visitor-count-details h3 {
            font-size: 16px;
            margin: 0;
            padding-bottom: 5px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: #eee;
        }
        
        .details-section {
            margin-bottom: 12px;
        }
        
        .details-section h4 {
            font-size: 14px;
            margin: 0 0 5px 0;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .stat-list {
            display: flex;
            flex-direction: column;
            gap: 3px;
            font-size: 13px;
        }
        
        .stat-item {
            display: flex;
            justify-content: space-between;
            padding: 3px 0;
        }
        
        .stat-name {
            color: rgba(255, 255, 255, 0.7);
        }
        
        .stat-value {
            font-weight: bold;
            color: #49b1ff;
        }
        
        .recent-visits {
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-size: 12px;
        }
        
        .recent-visit-item {
            background-color: rgba(255, 255, 255, 0.05);
            padding: 6px;
            border-radius: 4px;
        }
        
        .recent-visit-time {
            color: #77e2fb;
            font-weight: bold;
            margin-bottom: 3px;
        }
        
        .recent-visit-detail {
            color: rgba(255, 255, 255, 0.6);
            display: flex;
            justify-content: space-between;
        }
        
        .visitor-status {
            font-size: 12px;
            margin-bottom: 6px;
            font-weight: 600;
            padding: 2px 5px;
            border-radius: 3px;
            display: inline-block;
        }
        
        .new-visitor .visitor-status {
            color: #2ecc71;
            background-color: rgba(46, 204, 113, 0.1);
        }
        
        .return-visitor .visitor-status {
            color: #f39c12; 
            background-color: rgba(243, 156, 18, 0.1);
        }
        
        @media (max-width: 768px) {
            #visitorCounter {
                left: 15px !important;
                top: 15px !important;
                font-size: 12px;
                padding: 8px 12px;
                transform: none !important;
                max-width: 280px !important;
            }
        }
    `;
    
    // Stil elementi sayfanın başına eklensin
    document.head.insertBefore(style, document.head.firstChild);
    
    // Sayaçtaki değerleri hemen güncelle
    displayVisitorCount();
}

// Ziyaretçi sayısını göster
function displayVisitorCount() {
    try {
        // LocalStorage'den ziyaretçi bilgilerini al
        const visitors = JSON.parse(localStorage.getItem('visitors') || '{}');
        const todayVisitors = JSON.parse(localStorage.getItem('todayVisitors') || '{}');
        const visitorSessions = JSON.parse(localStorage.getItem('visitorSessions') || '[]');
        
        // Geçerli tarih bilgisi
        const today = new Date();
        const todayStr = today.toLocaleDateString();
        
        // Haftanın başlangıcını belirle (Pazartesi)
        const currentDay = today.getDay(); // 0 (Pazar) - 6 (Cumartesi)
        const weekStartDay = new Date(today);
        weekStartDay.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1)); // Pazartesi'yi hesapla
        
        // Ayın başlangıcını belirle
        const monthStartDay = new Date(today.getFullYear(), today.getMonth(), 1); // Ayın 1'i
        
        // Yılın başlangıcını belirle
        const yearStartDay = new Date(today.getFullYear(), 0, 1); // Ocak 1
        
        // Benzersiz ziyaretçi sayısı
        const uniqueVisitorCount = Object.keys(visitors).length;
        
        // Bugünkü ziyaretçi sayısı
        const todayVisitorCount = todayVisitors[todayStr]?.length || 0;
        
        // Haftalık, aylık ve yıllık ziyaretçileri hesaplama
        const weeklyVisitors = new Set();
        const monthlyVisitors = new Set();
        const yearlyVisitors = new Set();
        
        // Tarihleri dön
        Object.keys(todayVisitors).forEach(dateStr => {
            // Karşılaştırma için tarihi parse et
            const visitDate = new Date(dateStr);
            
            // Bu hafta içinde mi kontrol et
            if (visitDate >= weekStartDay && visitDate <= today) {
                todayVisitors[dateStr].forEach(visitorId => {
                    weeklyVisitors.add(visitorId);
                });
            }
            
            // Bu ay içinde mi kontrol et
            if (visitDate >= monthStartDay && visitDate <= today) {
                todayVisitors[dateStr].forEach(visitorId => {
                    monthlyVisitors.add(visitorId);
                });
            }
            
            // Bu yıl içinde mi kontrol et
            if (visitDate >= yearStartDay && visitDate <= today) {
                todayVisitors[dateStr].forEach(visitorId => {
                    yearlyVisitors.add(visitorId);
                });
            }
        });
        
        // Set boyutlarını al
        const weeklyVisitorCount = weeklyVisitors.size;
        const monthlyVisitorCount = monthlyVisitors.size;
        const yearlyVisitorCount = yearlyVisitors.size;
        
        // İşletim sistemi, tarayıcı ve ekran boyutu dağılımı
        const osCounts = {};
        const browserCounts = {};
        const screenCounts = {};
        
        // Ziyaretçi nesnesi için güvenli değer kontrolü
        const getSafeValue = (visitor, key, defaultValue = "Bilinmeyen") => {
            return visitor && visitor[key] ? visitor[key] : defaultValue;
        };
        
        // İstatistikleri hesapla
        Object.values(visitors).forEach(visitor => {
            // Güvenli değerlerle çalışalım
            const os = getSafeValue(visitor, 'os');
            const browser = getSafeValue(visitor, 'browser');
            const screenSize = getSafeValue(visitor, 'screenSize');
            
            // İşletim sistemi sayısı
            osCounts[os] = (osCounts[os] || 0) + 1;
            
            // Tarayıcı sayısı
            browserCounts[browser] = (browserCounts[browser] || 0) + 1;
            
            // Ekran boyutu sayısı
            screenCounts[screenSize] = (screenCounts[screenSize] || 0) + 1;
        });
        
        // Son ziyaretleri benzersiz şekilde göstermek için işlem yapalım
        const uniqueVisitorSessions = {};
        
        // En son ziyaretleri al (tersten gidiyoruz)
        for (let i = visitorSessions.length - 1; i >= 0; i--) {
            const session = visitorSessions[i];
            const visitorId = getSafeValue(session, 'visitorId');
            
            // Her ziyaretçinin sadece en son ziyaretini saklayalım
            if (!uniqueVisitorSessions[visitorId]) {
                uniqueVisitorSessions[visitorId] = {
                    ...session,
                    visitCount: getSafeValue(visitors[visitorId], 'visits', 1)
                };
            }
        }
        
        // Objeyi dizeye dönüştürüp sıralayalım (zamana göre, en yeniler üstte)
        const recentUniqueVisits = Object.values(uniqueVisitorSessions)
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 10); // En son 10 benzersiz ziyaretçi
        
        console.log("Ziyaretçi bilgileri:", {
            benzersiz: uniqueVisitorCount,
            bugun: todayVisitorCount,
            buHafta: weeklyVisitorCount,
            buAy: monthlyVisitorCount,
            buYil: yearlyVisitorCount,
            isletimSistemleri: osCounts,
            tarayicilar: browserCounts,
            ekranBoyutlari: screenCounts,
            sonBenzersizZiyaretler: recentUniqueVisits
        });
        
        // Sayaçtaki değerleri güncelle
        if (document.getElementById('visitor-unique-count')) {
            document.getElementById('visitor-unique-count').textContent = uniqueVisitorCount;
        }
        
        if (document.getElementById('visitor-today-count')) {
            document.getElementById('visitor-today-count').textContent = todayVisitorCount;
        }
        
        if (document.getElementById('visitor-week-count')) {
            document.getElementById('visitor-week-count').textContent = weeklyVisitorCount;
        }
        
        if (document.getElementById('visitor-month-count')) {
            document.getElementById('visitor-month-count').textContent = monthlyVisitorCount;
        }
        
        if (document.getElementById('visitor-year-count')) {
            document.getElementById('visitor-year-count').textContent = yearlyVisitorCount;
        }
        
        // İstatistiklerin HTML'ini güncelle
        updateStatisticsHTML('visitor-os-stats', osCounts);
        updateStatisticsHTML('visitor-browser-stats', browserCounts);
        updateStatisticsHTML('visitor-screen-stats', screenCounts);
        
        // Son benzersiz ziyaretleri güncelle
        updateRecentVisits('visitor-recent-stats', recentUniqueVisits, getSafeValue);
        
    } catch (error) {
        console.error('Ziyaretçi sayısı görüntülenemedi:', error);
    }
}

// İstatistik HTML'ini güncelleme yardımcı fonksiyonu
function updateStatisticsHTML(elementId, data) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let html = '';
    const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);
    
    for (const [key, count] of sortedData) {
        html += `<div class="stat-item"><span class="stat-name">${key}:</span> <span class="stat-value">${count}</span></div>`;
    }
    
    element.innerHTML = html || '<div class="stat-item">Veri bulunamadı</div>';
}

// Son ziyaretleri güncelleme yardımcı fonksiyonu 
function updateRecentVisits(elementId, visits, getSafeValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let html = '';
    
    visits.forEach(session => {
        // Güvenli değerlerle çalışalım
        const date = getSafeValue(session, 'date', 'Tarih bilinmiyor');
        const time = getSafeValue(session, 'time', 'Saat bilinmiyor');
        const browser = getSafeValue(session, 'browser');
        const os = getSafeValue(session, 'os');
        const screenSize = getSafeValue(session, 'screenSize');
        const referrer = getSafeValue(session, 'referrer', 'Doğrudan ziyaret');
        const visitCount = getSafeValue(session, 'visitCount', 1);
        
        // Ziyaretçi durumunu belirle
        let visitorStatus = '';
        let statusClass = '';
        if (session.newVisitor) {
            visitorStatus = '🆕 Yeni Ziyaretçi';
            statusClass = 'new-visitor';
        } else if (visitCount > 1) {
            visitorStatus = `♻️ Tekrarlı Ziyaretçi (${visitCount}. ziyaret)`;
            statusClass = 'return-visitor';
        }
        
        html += `
            <div class="recent-visit-item ${statusClass}">
                <div class="recent-visit-time">${date}, ${time}</div>
                <div class="visitor-status">${visitorStatus}</div>
                <div class="recent-visit-detail">
                    <span>${browser}</span>
                    <span>${os}</span>
                </div>
                <div class="recent-visit-detail">
                    <span>Ekran: ${screenSize}</span>
                    <span>Ref: ${referrer.substring(0, 20)}${referrer.length > 20 ? '...' : ''}</span>
                </div>
            </div>
        `;
    });
    
    element.innerHTML = html || '<div class="no-data">Henüz ziyaret kaydı yok</div>';
}

// Tarayıcı ve işletim sistemi tespiti
function detectBrowser(userAgent) {
    try {
        const ua = userAgent.toLowerCase();
        let browser = "Bilinmeyen tarayıcı";
        let version = "Bilinmeyen sürüm";
        let os = "Bilinmeyen işletim sistemi";
        
        // Tarayıcı tespiti
        if (ua.indexOf("firefox") > -1) {
            browser = "Firefox";
            const match = ua.match(/firefox\/([\d.]+)/);
            version = match && match[1] ? match[1] : "Bilinmeyen";
        } else if (ua.indexOf("edg") > -1) {
            browser = "Microsoft Edge";
            const match = ua.match(/edg\/([\d.]+)/);
            version = match && match[1] ? match[1] : "Bilinmeyen";
        } else if (ua.indexOf("chrome") > -1) {
            browser = "Chrome";
            const match = ua.match(/chrome\/([\d.]+)/);
            version = match && match[1] ? match[1] : "Bilinmeyen";
        } else if (ua.indexOf("safari") > -1 && ua.indexOf("chrome") === -1) {
            browser = "Safari";
            const match = ua.match(/version\/([\d.]+)/);
            version = match && match[1] ? match[1] : "Bilinmeyen";
        } else if (ua.indexOf("opr") > -1 || ua.indexOf("opera") > -1) {
            browser = "Opera";
            const match = ua.match(/(?:opr|opera)\/([\d.]+)/);
            version = match && match[1] ? match[1] : "Bilinmeyen";
        }
        
        // İşletim sistemi tespiti
        if (ua.indexOf("windows") > -1) {
            os = "Windows";
            if (ua.indexOf("windows nt 10") > -1) os = "Windows 10";
            else if (ua.indexOf("windows nt 6.3") > -1) os = "Windows 8.1";
            else if (ua.indexOf("windows nt 6.2") > -1) os = "Windows 8";
            else if (ua.indexOf("windows nt 6.1") > -1) os = "Windows 7";
        } else if (ua.indexOf("macintosh") > -1 || ua.indexOf("mac os") > -1) {
            os = "macOS";
        } else if (ua.indexOf("android") > -1) {
            os = "Android";
        } else if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1) {
            os = "iOS";
        } else if (ua.indexOf("linux") > -1) {
            os = "Linux";
        }
        
        return { browser, version, os };
    } catch (error) {
        console.error("Tarayıcı tespiti sırasında hata:", error);
        return { 
            browser: "Tespit edilemedi", 
            version: "Bilinmeyen", 
            os: "Tespit edilemedi" 
        };
    }
} 