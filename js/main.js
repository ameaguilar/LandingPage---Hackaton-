/**
 * ARCHIVO PRINCIPAL DE JAVASCRIPT (ENTRY POINT)
 * Tema: "Cuidado con el Gato"
 * 
 * Este archivo actúa como orquestador, importando los módulos necesarios
 * para mantener un código limpio, escalable y profesional.
 */

import { initShoppingCart } from './cart.js';
import { initScrollAnimations, initSmoothScroll } from './animations.js';
import { initNewsletter } from './newsletter.js';
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar submódulos
    initShoppingCart();
    initScrollAnimations();
    initSmoothScroll();
    initNewsletter();
    
    // Confirmación de carga exitosa en consola
    console.info("SportStore: Módulos cargados e inicializados correctamente.");
});
