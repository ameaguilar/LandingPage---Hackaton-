/**
 * Módulo de Animaciones
 * Maneja efectos visuales basados en scroll mediante IntersectionObserver
 */

export const initScrollAnimations = () => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
};

export const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Si el href es solo "#", scrollear hasta arriba
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            // Buscar el elemento por ID
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Ajustar el offset por la altura del navbar flotante
                const headerOffset = document.querySelector('header')?.offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};
