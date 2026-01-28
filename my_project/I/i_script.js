document.addEventListener('DOMContentLoaded', function() {
    // Анимация элементов при прокрутке
    function animateOnScroll() {
        const elements = document.querySelectorAll('.text-block, .gallery-item, .quote-card, .action-card');
        
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

    // Эффект параллакса для главного фото
    const mainPhoto = document.querySelector('.main-photo-container');
    if (mainPhoto) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            mainPhoto.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }

    // Подсветка текущего блока при прокрутке
    const textBlocks = document.querySelectorAll('.text-block');
    window.addEventListener('scroll', function() {
        let current = '';
        
        textBlocks.forEach(block => {
            const blockTop = block.offsetTop;
            const blockHeight = block.clientHeight;
            
            if (pageYOffset >= (blockTop - 200)) {
                current = block.getAttribute('id') || '';
            }
        });
        
        // Убираем подсветку со всех блоков
        textBlocks.forEach(block => {
            block.classList.remove('active');
        });
        
        // Добавляем подсветку текущему блоку
        if (current) {
            document.querySelector(`#${current}`)?.classList.add('active');
        }
    });

    // Интерактивность для галереи
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.querySelector('img').src;
            const imageAlt = this.querySelector('img').alt;
            const description = this.querySelector('p').textContent;
            
            // Создаем модальное окно для просмотра фото
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imageSrc}" alt="${imageAlt}">
                    <p>${description}</p>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Закрытие модального окна
            modal.querySelector('.close-modal').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });

    // Добавляем стили для модального окна (динамически)
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            animation: zoomIn 0.3s ease;
        }
        
        @keyframes zoomIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 70vh;
            border-radius: 10px;
        }
        
        .modal-content p {
            color: white;
            text-align: center;
            margin-top: 20px;
            font-size: 18px;
        }
        
        .close-modal {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            background: rgba(0, 0, 0, 0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .close-modal:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(modalStyles);

    // Плавная прокрутка к блокам
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});