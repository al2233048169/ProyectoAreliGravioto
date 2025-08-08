document.addEventListener('DOMContentLoaded', function() {
    // Mejorar el comportamiento del dropdown en desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        // Para dispositivos con mouse
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) { // Solo para desktop
                const dropdownMenu = this.querySelector('.dropdown-menu');
                dropdownMenu.classList.add('show');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                const dropdownMenu = this.querySelector('.dropdown-menu');
                dropdownMenu.classList.remove('show');
            }
        });
        
        // Para mantener la funcionalidad táctil
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdownMenu = this.querySelector('.dropdown-menu');
                dropdownMenu.classList.toggle('show');
            }
        });
    });
    
    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropdown-toggle') && window.innerWidth <= 992) {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
});