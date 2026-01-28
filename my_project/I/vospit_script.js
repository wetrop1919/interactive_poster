document.addEventListener('DOMContentLoaded', function() {
    // Анимация элементов при прокрутке
    function animateOnScroll() {
        const elements = document.querySelectorAll('.side-image, .text-section, .task-item, .stage, .form-card, .role-card, .advice-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.animationPlayState = 'running';
            }
        });
    }

    // Запуск анимации при загрузке
    setTimeout(animateOnScroll, 300);
    
    // Запуск анимации при прокрутке
    window.addEventListener('scroll', animateOnScroll);

    // Подсветка текущего раздела
    const textSections = document.querySelectorAll('.text-section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        textSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id') || '';
            }
        });
        
        // Убираем подсветку со всех разделов
        textSections.forEach(section => {
            section.style.boxShadow = 'none';
            section.style.borderLeft = 'none';
        });
        
        // Добавляем подсветку текущему разделу
        if (current) {
            const currentSection = document.querySelector(`#${current}`);
            if (currentSection) {
                currentSection.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)';
                currentSection.style.borderLeft = '4px solid #3498db';
                currentSection.style.paddingLeft = '20px';
                currentSection.style.transition = 'all 0.3s ease';
            }
        }
    });

    // Интерактивность для боковых картинок
    const sideImages = document.querySelectorAll('.side-image');
    sideImages.forEach(image => {
        // Увеличиваем изображение при наведении
        image.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.1)';
        });
        
        image.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
        });
        
        // Модальное окно при клике
        image.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.image-caption').textContent;
            
            // Создаем модальное окно
            const modal = document.createElement('div');
            modal.className = 'side-image-modal';
            modal.innerHTML = `
                <div class="modal-overlay"></div>
                <div class="modal-container">
                    <div class="modal-header">
                        <span class="modal-close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <img src="${imgSrc}" alt="${caption}">
                        <p>${caption}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Анимация появления
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Закрытие модального окна
            const closeBtn = modal.querySelector('.modal-close');
            const overlay = modal.querySelector('.modal-overlay');
            
            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);
            
            function closeModal() {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) {
                        document.body.removeChild(modal);
                    }
                }, 300);
            }
            
            // Закрытие по ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
        });
    });

    // Добавляем стили для модального окна
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .side-image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .side-image-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        .modal-container {
            background: white;
            border-radius: 15px;
            max-width: 600px;
            max-height: 80vh;
            overflow: hidden;
            z-index: 1001;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            position: relative;
        }
        
        .side-image-modal.active .modal-container {
            transform: scale(1);
        }
        
        .modal-header {
            padding: 15px 20px;
            background: #2c3e50;
            color: white;
            display: flex;
            justify-content: flex-end;
        }
        
        .modal-close {
            font-size: 28px;
            cursor: pointer;
            line-height: 1;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: #3498db;
        }
        
        .modal-body {
            padding: 30px;
            text-align: center;
        }
        
        .modal-body img {
            max-width: 100%;
            max-height: 50vh;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .modal-body p {
            font-size: 18px;
            color: #2c3e50;
            font-weight: 500;
            line-height: 1.4;
        }
        
        @media (max-width: 768px) {
            .modal-container {
                max-width: 90%;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-body p {
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(modalStyles);

    // Плавная прокрутка к разделам
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function() {
            const parentSection = this.closest('.text-section');
            if (parentSection) {
                window.scrollTo({
                    top: parentSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Добавляем анимированные границы для карточек при наведении
    const cards = document.querySelectorAll('.form-card, .role-card, .advice-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#e74c3c';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('form-card')) {
                this.style.borderColor = '#e74c3c';
            } else if (this.classList.contains('advice-card')) {
                this.style.borderColor = '#f1c40f';
            } else {
                this.style.borderColor = '#3498db';
            }
        });
    });
});