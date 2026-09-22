/**
 * Archivo principal que inicializa todos los módulos del proyecto.
 * Importa e inicia el carrito, las animaciones y el newsletter.
 */
import { initShoppingCart } from './cart.js';
import { initScrollAnimations, initSmoothScroll } from './animations.js';
import { initNewsletter } from './newsletter.js';

document.addEventListener("DOMContentLoaded", () => {
    initShoppingCart();
    initScrollAnimations();
    initSmoothScroll();
    initNewsletter();
    
    console.info("SportStore: Módulos cargados e inicializados correctamente.");
});
