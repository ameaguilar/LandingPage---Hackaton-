/**
 * Módulo de Newsletter
 * Valida el correo y muestra mensajes de éxito
 */

export const initNewsletter = () => {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que se recargue la página

        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();

        // Validación simple con expresión regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            // Mostrar mensaje en la consola como pidió el usuario
            console.log("correo suscrito correctamente Bienvenido a la Manada.");

            // Opcional: También mostrar un Toast visual al usuario
            showNewsletterToast(email);

            // Limpiar el formulario
            form.reset();
        } else {
            console.error("Por favor, ingresa un correo electrónico válido.");
            alert("El correo ingresado no tiene un formato válido.");
        }
    });
};

const showNewsletterToast = (email) => {
    const toastContainer = document.getElementById('toastPlacement');
    if (!toastContainer) return;

    const toastEl = document.createElement('div');
    toastEl.className = 'vanilla-toast';
    toastEl.innerHTML = `
        <div class="vanilla-toast-body">
            <strong>¡Bienvenido a la Manada!</strong><br>
            <span style="font-size: 14px; color: #94A3B8;">Confirmación enviada a ${email}</span>
        </div>
        <button class="vanilla-toast-close" aria-label="Cerrar">&times;</button>
    `;
    
    toastContainer.appendChild(toastEl);
    
    setTimeout(() => {
        toastEl.classList.add('show');
    }, 10);

    const closeBtn = toastEl.querySelector('.vanilla-toast-close');
    closeBtn.addEventListener('click', () => {
        toastEl.classList.remove('show');
        setTimeout(() => toastEl.remove(), 400);
    });

    setTimeout(() => {
        if (toastEl.parentNode) {
            toastEl.classList.remove('show');
            setTimeout(() => {
                if (toastEl.parentNode) toastEl.remove();
            }, 400);
        }
    }, 5000);
};
