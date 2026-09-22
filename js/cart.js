/**
 * Módulo del Carrito de Compras.
 * Maneja la lógica para agregar productos, actualizar el contador en el icono y mostrar notificaciones visuales (toast) dinámicamente.
 */
export const initShoppingCart = () => {
    const cartButtons = document.querySelectorAll('.add-btn, .add-btn-mujer, .meta a');
    const cartIcon = document.querySelector('.icon-shopping-bag');
    
    let currentCount = 0;
    try {
        const savedCount = localStorage.getItem('cartCount');
        if (savedCount) {
            currentCount = parseInt(savedCount, 10);
        }
    } catch (error) {
        console.warn("LocalStorage no está disponible:", error);
    }
    
    if (cartIcon) {
        cartIcon.textContent = currentCount > 0 ? `🛒 (${currentCount})` : '🛒';
    }

    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); 
            const btnElement = event.currentTarget;
            
            let productName = 'Producto';
            const article = btnElement.closest('article');
            if (article) {
                const titleEl = article.querySelector('h3');
                if (titleEl) productName = titleEl.textContent;
            }
            
            currentCount++;
            
            if (cartIcon) {
                cartIcon.textContent = `🛒 (${currentCount})`;
            }
            
            try {
                localStorage.setItem('cartCount', currentCount);
            } catch (error) {}

            animateButton(btnElement);
            showToastNotification(productName);
        });
    });
};

const animateButton = (btn) => {
    const originalText = btn.innerHTML;
    const originalBg = btn.style.backgroundColor;
    const originalColor = btn.style.color;
    
    btn.innerHTML = '¡Agregado!';
    btn.style.backgroundColor = '#00FF88'; 
    btn.style.color = '#0F172A';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = originalBg;
        btn.style.color = originalColor;
    }, 2000);
};

const showToastNotification = (productName) => {
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
            <strong>¡Instinto activado!</strong> <br>
            <span style="color: #00FF88">${productName}</span> se agregó al carrito.
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
    }, 4000);
};
