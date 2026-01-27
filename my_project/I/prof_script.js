document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация экскурсий
    const filterButtons = document.querySelectorAll('.filter-btn');
    const excursionCards = document.querySelectorAll('.vertical-excursion-card');
    const searchInput = document.getElementById('search-input');

    // Функция фильтрации
    function filterExcursions() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const searchTerm = searchInput.value.toLowerCase();
        
        excursionCards.forEach(card => {
            const categories = card.dataset.category;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.excursion-description').textContent.toLowerCase();
            const classInfo = card.querySelector('.excursion-class').textContent.toLowerCase();
            
            const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
            const matchesSearch = searchTerm === '' || 
                title.includes(searchTerm) || 
                description.includes(searchTerm) ||
                classInfo.includes(searchTerm);
            
            if (matchesFilter && matchesSearch) {
                card.style.display = 'flex';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Обработчики для кнопок фильтров
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterExcursions();
        });
    });

    // Обработчик для поиска
    searchInput.addEventListener('input', filterExcursions);

    // Отправка формы
    const excursionForm = document.getElementById('excursion-form');
    if (excursionForm) {
        excursionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const excursionName = document.getElementById('excursion-name').value;
            const excursionClass = document.getElementById('excursion-class').value;
            const excursionType = document.getElementById('excursion-type').value;
            const excursionCity = document.getElementById('excursion-city').value;
            const excursionDescription = document.getElementById('excursion-description').value;
            
            // Здесь можно добавить отправку данных на сервер
            alert(`Спасибо за предложение!\n\nЭкскурсия: ${excursionName}\nКласс: ${excursionClass}\nТип: ${excursionType}\nГород: ${excursionCity}\n\nВаше предложение будет рассмотрено администрацией.`);
            
            // Очистка формы
            excursionForm.reset();
        });
    }

    // Анимация при прокрутке
    function animateOnScroll() {
        const cards = document.querySelectorAll('.vertical-excursion-card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.1;
            
            if (cardPosition < screenPosition && card.style.display !== 'none') {
                card.style.animationPlayState = 'running';
            }
        });
    }

    // Запуск анимации при загрузке
    setTimeout(animateOnScroll, 300);
    
    // Запуск анимации при прокрутке
    window.addEventListener('scroll', animateOnScroll);
});