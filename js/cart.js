/**
 * Módulo de Carrito de Compras (VERSIÓN VANILLA - RAMA ANGÉLICA)
 * Maneja la lógica de estado (localStorage) y notificaciones (Toasts) sin dependencias.
 */

export const initShoppingCart = () => {
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    
    // MANEJO DE ERRORES: Protegemos el acceso al localStorage
    let currentCount = 0;
    try {
        const savedCount = localStorage.getItem('cartCount');
        if (savedCount) {
            currentCount = parseInt(savedCount, 10);
        }
    } catch (error) {
        console.warn("LocalStorage no está disponible:", error);
    }
    
    // Actualizar UI inicial
    if (cartCountElement) {
        cartCountElement.textContent = currentCount;
    }

    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Por si es una etiqueta <a>
            const btnElement = event.currentTarget;
            const productName = btnElement.getAttribute('data-product') || 'Producto';
            
            currentCount++;
            
            if (cartCountElement) {
                cartCountElement.textContent = currentCount;
            }
            
            try {
                localStorage.setItem('cartCount', currentCount);
            } catch (error) {
                console.warn("No se pudo guardar en LocalStorage:", error);
            }

            animateButton(btnElement);
            showToastNotification(productName);
        });
    });
};

const animateButton = (btn) => {
    const originalText = btn.innerHTML;
    btn.innerHTML = '¡Agregado!';
    btn.style.backgroundColor = '#00FF88'; // var(--accent-neon)
    btn.style.color = '#0F172A';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
    }, 2000);
};

const showToastNotification = (productName) => {
    const toastContainer = document.getElementById('toastPlacement');
    if (!toastContainer) return;

    // Crear el elemento toast manualmente (Vanilla JS)
    const toastEl = document.createElement('div');
    toastEl.className = 'vanilla-toast';
    toastEl.innerHTML = `
        <div class="vanilla-toast-body">
            <strong>¡Instinto activado!</strong> <span style="color: #00FF88">${productName}</span> se agregó al carrito.
        </div>
        <button class="vanilla-toast-close" aria-label="Cerrar">&times;</button>
    `;
    
    toastContainer.appendChild(toastEl);
    
    // Animar la entrada
    setTimeout(() => {
        toastEl.classList.add('show');
    }, 10);

    // Funcionalidad del botón de cerrar
    const closeBtn = toastEl.querySelector('.vanilla-toast-close');
    closeBtn.addEventListener('click', () => {
        toastEl.classList.remove('show');
        setTimeout(() => toastEl.remove(), 400); // Esperar que termine la animación
    });

    // Auto-cerrar después de 4 segundos
    setTimeout(() => {
        if (toastEl.parentNode) {
            toastEl.classList.remove('show');
            setTimeout(() => {
                if (toastEl.parentNode) toastEl.remove();
            }, 400);
        }
    }, 4000);
};
