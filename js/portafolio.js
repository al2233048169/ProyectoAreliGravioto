document.addEventListener('DOMContentLoaded', function() {
    // Solo debes editar este array con tus imágenes
    const portfolioImages = [
        { src: 'img/portfolio1.jpeg' },
        { src: 'img/portfolio2.jpeg' },
        { src: 'img/portfolio3.jpeg' },
        { src: 'img/portfolio4.jpeg'},
        { src: 'img/portfolio5.jpeg' },
        { src: 'img/portfolio6.jpeg' }
        // Agrega más imágenes según necesites
    ];
    
    // Elementos del DOM
    const slider = document.querySelector('.gallery-slider');
    const thumbnails = document.querySelector('.gallery-thumbnails');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const lightbox = document.querySelector('.gallery-lightbox');
    const lightboxImg = document.getElementById('expandedImg');
    const lightboxCaption = document.querySelector('.gallery-caption');
    const closeBtn = document.querySelector('.gallery-close');
    
    let currentIndex = 0;
    
    // Cargar imágenes en el slider y miniaturas
    function loadGallery() {
        // Limpiar galería existente
        slider.innerHTML = '';
        thumbnails.innerHTML = '';
        
        // Agregar imágenes al slider
        portfolioImages.forEach((item, index) => {
            // Crear slide
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.title;
            img.loading = 'lazy';
            img.addEventListener('click', () => openLightbox(index));
            
            slide.appendChild(img);
            slider.appendChild(slide);
            
            // Crear miniatura
            const thumbnail = document.createElement('img');
            thumbnail.src = item.src;
            thumbnail.alt = item.title;
            thumbnail.className = 'gallery-thumbnail';
            thumbnail.dataset.index = index;
            
            if (index === 0) thumbnail.classList.add('active');
            
            thumbnail.addEventListener('click', () => goToSlide(index));
            thumbnails.appendChild(thumbnail);
        });
    }
    
    // Navegación
    function goToSlide(index) {
        currentIndex = index;
        slider.scrollTo({
            left: slider.clientWidth * index,
            behavior: 'smooth'
        });
        
        // Actualizar miniaturas activas
        document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % portfolioImages.length;
        goToSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
        goToSlide(currentIndex);
    }
    
    // Lightbox
    function openLightbox(index) {
        const item = portfolioImages[index];
        lightboxImg.src = item.src;
        lightboxCaption.textContent = item.title;
        lightbox.style.display = 'block';
        currentIndex = index;
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    closeBtn.addEventListener('click', closeLightbox);
    
    // Cerrar lightbox al hacer clic fuera
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        }
    });
    
    // Auto-slide (opcional)
    let slideInterval = setInterval(nextSlide, 5000);
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Inicializar galería
    loadGallery();
});