import { createRouter, createWebHistory } from 'vue-router';
// 1. Importamos las rutas del módulo Payments
import paymentsRoutes from './Payments/infrastructure/payments-routes.js';

const routes = [
  {
    path: '/',
    redirect: '/home' // O la ruta que tengas por defecto
  },
  // 2. Esparcimos (spread) las rutas de pagos aquí
  ...paymentsRoutes,
  
  // Aquí irían tus otras rutas (User-Management, etc.)
  // ...userRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Opcional: Cambiar el título de la pestaña según la ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'InCleanHome';
  next();
});

export default router;