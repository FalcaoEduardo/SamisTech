document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SCROLL REVEAL (Aparecimento Suave)
    // ==========================================
    const reveals = document.querySelectorAll(".reveal");
    const revealOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -20px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // ==========================================
    // 2. EFEITO GLOW (Holofote de Mouse)
    // ==========================================
    const cards = document.querySelectorAll('.card, .tech-card, .pricing-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================
    // 3. LÓGICA DO CARROSSEL DE PORTFÓLIO
    // ==========================================
    const container = document.getElementById('carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (container && prevBtn && nextBtn) {
        const updateButtons = () => {
            const tolerance = 10;
            if (container.scrollLeft < tolerance) {
                prevBtn.classList.add('hidden');
            } else {
                prevBtn.classList.remove('hidden');
            }
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - tolerance) {
                nextBtn.classList.add('hidden');
            } else {
                nextBtn.classList.remove('hidden');
            }
        };

        nextBtn.addEventListener('click', () => container.scrollBy({ left: 340, behavior: 'smooth' }));
        prevBtn.addEventListener('click', () => container.scrollBy({ left: -340, behavior: 'smooth' }));
        
        container.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        updateButtons();
    }
});