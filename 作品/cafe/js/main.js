document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Header Scroll Effect
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    /* ==========================================================================
       Hero Slideshow
       ========================================================================== */
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 6000);
    }

    /* ==========================================================================
       Fade-in Animation on Scroll (Intersection Observer)
       ========================================================================== */
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = { 
        threshold: 0.15 
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));

    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            // Tailwindのクラス制御から、独自のis-openクラスのトグルに変更
            mobileMenu.classList.toggle('is-open');
        });

        // モバイルメニュー内のリンクをクリックした時もメニューを閉じる
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
            });
        });
    }
});
