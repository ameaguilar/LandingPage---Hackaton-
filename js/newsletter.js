/**
 * Módulo de Newsletter.
 * Valida el formulario de suscripción mediante expresiones regulares y muestra una notificación en caso de éxito.
 */
export const initNewsletter = () => {
    const form = document.querySelector('.input-container');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            console.log("correo suscrito correctamente Bienvenido a la Manada.");
            showNewsletterToast(email);
            form.reset();
        } else {
            console.error("Por favor, ingresa un correo electrónico válido.");
            alert("El correo ingresado no tiene un formato válido.");
        }
    });
};

const showNewsletterToast = (email) => {
    let toastContainer = document.getElementById('toastPlacement');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastPlacement';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '9999';
        toastContainer.style.display = 'flex';
        toastContainer.style.flexDirection = 'column';
        toastContainer.style.gap = '10px';
        document.body.appendChild(toastContainer);
    }

    const toastEl = document.createElement('div');
    toastEl.style.background = '#1E293B';
    toastEl.style.color = '#FFFFFF';
    toastEl.style.padding = '16px';
    toastEl.style.borderRadius = '8px';
    toastEl.style.border = '1px solid #00FF88';
    toastEl.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
    toastEl.style.display = 'flex';
    toastEl.style.justifyContent = 'space-between';
    toastEl.style.alignItems = 'center';
    toastEl.style.gap = '16px';
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateY(20px)';
    toastEl.style.transition = 'opacity 0.3s, transform 0.3s';
    
    toastEl.innerHTML = `
        <div>
            <strong>¡Bienvenido a la Manada!</strong><br>
            <span style="font-size: 14px; color: #94A3B8;">Confirmación enviada a ${email}</span>
        </div>
        <button aria-label="Cerrar" style="background:transparent;border:none;color:#fff;font-size:20px;cursor:pointer;">&times;</button>
    `;
    
    toastContainer.appendChild(toastEl);
    
    setTimeout(() => {
        toastEl.style.opacity = '1';
        toastEl.style.transform = 'translateY(0)';
    }, 10);

    const closeBtn = toastEl.querySelector('button');
    closeBtn.addEventListener('click', () => {
        toastEl.style.opacity = '0';
        toastEl.style.transform = 'translateY(20px)';
        setTimeout(() => toastEl.remove(), 300);
    });

    setTimeout(() => {
        if (toastEl.parentNode) {
            toastEl.style.opacity = '0';
            toastEl.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (toastEl.parentNode) toastEl.remove();
            }, 300);
        }
    }, 5000);
};
