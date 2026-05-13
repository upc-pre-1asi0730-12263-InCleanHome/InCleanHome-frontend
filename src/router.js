import { createRouter, createWebHistory } from 'vue-router';
import paymentsRoutes from './Payments/infrastructure/payments-routes.js';
import Home from './shared/presentation/views/home.vue'; // Importación necesaria
import searchRoutes from './Search-and-catalog/search-routes.js';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { title: 'Inicio - InCleanHome' }
  },
  ...paymentsRoutes,
  ...searchRoutes,
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