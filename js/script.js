// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Yetenek çubukları animasyonu - doğrudan çalıştır
    skillBars.forEach((bar, index) => {
        // Animasyon için önce 0 yap sonra %50'ye getir
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = '50%';
        }, 500 + (100 * index));
    });
    
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
            
            // Footer
            "footer-copyright": "Tüm hakları saklıdır."
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
            
            // Footer
            "footer-copyright": "All rights reserved."
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
        document.querySelector('footer p').innerHTML = '&copy; <span id="current-year">' + new Date().getFullYear() + '</span> Yasin Eniş. ' + translations[lang]['footer-copyright'];
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
    
}); 