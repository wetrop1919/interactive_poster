document.addEventListener('DOMContentLoaded', function() {
    // Анимация карточек при прокрутке
    function animateOnScroll() {
        const cards = document.querySelectorAll('.profession-card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.animationPlayState = 'running';
            }
        });
    }

    // Запуск анимации при загрузке
    setTimeout(animateOnScroll, 300);
    
    // Запуск анимации при прокрутке
    window.addEventListener('scroll', animateOnScroll);

    // Обработка кнопок "Подробнее"
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const professionTitle = this.closest('.profession-card').querySelector('.profession-title').textContent;
            alert(`Подробная информация о профессии "${professionTitle}" будет доступна в ближайшее время.`);
        });
    });

    // Эффект наведения для карточек
    const professionCards = document.querySelectorAll('.profession-card');
    professionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});