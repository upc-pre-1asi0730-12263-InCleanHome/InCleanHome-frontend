import { createRouter, createWebHistory } from 'vue-router'
import Home from './shared/presentation/views/home.vue';
import searchRoutes from './Search-and-catalog/search-routes.js';
import userRoutes from './User-Management/presentation/router/user-routes.js';
import reviewsRoutes from './Reviews-and-Evaluation/reviews-routes.js';
import paymentsRoutes from './Payments/infrastructure/payments-routes.js';
import bookingRoutes from './Booking/booking-routes.js';


const routes = [
  
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { title: 'Inicio - InCleanHome' }
  },
  ...userRoutes,
  ...paymentsRoutes,
  ...bookingRoutes,
  ...searchRoutes,
  ...reviewsRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'InCleanHome';
  next();
})

export default router;
