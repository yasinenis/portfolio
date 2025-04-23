// Çerez bildirimi için JavaScript kodu
document.addEventListener('DOMContentLoaded', function() {
    // Daha önce kabul edilmiş mi kontrol et
    if (!localStorage.getItem('cookieConsentAccepted') && !localStorage.getItem('cookieConsentDeclined')) {
        // Çerez bildirimi için div oluştur
        const cookieConsent = document.createElement('div');
        cookieConsent.className = 'cookie-consent';
        
        // Bildirim içeriği
        cookieConsent.innerHTML = `
            <div class="cookie-content">
                <p class="cookie-text" data-lang="cookie-text">Bu site deneyiminizi geliştirmek için çerezler kullanmaktadır. <a href="privacy-policy.html" class="privacy-link" data-lang="privacy-link">Gizlilik Politikamızı</a> inceleyebilirsiniz.</p>
                <div class="cookie-buttons">
                    <button class="cookie-accept" data-lang="cookie-accept">Kabul Et</button>
                    <button class="cookie-decline" data-lang="cookie-decline">Reddet</button>
                </div>
            </div>
        `;
        
        // Bildirimi sayfaya ekle
        document.body.appendChild(cookieConsent);
        
        // Butonlara event listener ekle
        const acceptButton = cookieConsent.querySelector('.cookie-accept');
        const declineButton = cookieConsent.querySelector('.cookie-decline');
        
        // Kabul butonu
        acceptButton.addEventListener('click', function() {
            localStorage.setItem('cookieConsentAccepted', 'true');
            cookieConsent.classList.add('cookie-fade-out');
            setTimeout(() => {
                cookieConsent.remove();
                // Ziyaretçi sayımı zaten yapılıyor, ek bir işlem gerekmiyor
            }, 500);
        });
        
        // Reddet butonu
        declineButton.addEventListener('click', function() {
            localStorage.setItem('cookieConsentDeclined', 'true');
            cookieConsent.classList.add('cookie-fade-out');
            setTimeout(() => {
                cookieConsent.remove();
            }, 500);
        });

        // Dil değiştirme işlemlerini kontrol et
        if (window.updateLanguage && typeof window.currentLang !== 'undefined') {
            // Cookie banner metinlerini seçili dile güncelle
            updateCookieLanguage(window.currentLang);
        }
    }
});

// Çevirileri güncelle
function updateCookieLanguage(lang) {
    const translations = {
        tr: {
            "cookie-text": "Bu site deneyiminizi geliştirmek için çerezler kullanmaktadır. <a href='privacy-policy.html' class='privacy-link'>Gizlilik Politikamızı</a> inceleyebilirsiniz.",
            "privacy-link": "Gizlilik Politikamızı",
            "cookie-accept": "Kabul Et",
            "cookie-decline": "Reddet"
        },
        en: {
            "cookie-text": "This site uses cookies to enhance your experience. Please review our <a href='privacy-policy.html' class='privacy-link'>Privacy Policy</a>.",
            "privacy-link": "Privacy Policy",
            "cookie-accept": "Accept",
            "cookie-decline": "Decline"
        }
    };
    
    // Eğer çerez bildirimi görünüyorsa, metinleri güncelle
    const cookieConsent = document.querySelector('.cookie-consent');
    if (cookieConsent) {
        const cookieText = cookieConsent.querySelector('.cookie-text');
        const acceptButton = cookieConsent.querySelector('.cookie-accept');
        const declineButton = cookieConsent.querySelector('.cookie-decline');
        
        if (cookieText) cookieText.innerHTML = translations[lang]["cookie-text"];
        if (acceptButton) acceptButton.textContent = translations[lang]["cookie-accept"];
        if (declineButton) declineButton.textContent = translations[lang]["cookie-decline"];
    }
} 