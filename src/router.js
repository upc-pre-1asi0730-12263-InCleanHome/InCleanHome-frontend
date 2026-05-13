import { createRouter, createWebHistory } from 'vue-router'
import paymentsRoutes from './Payments/infrastructure/payments-routes.js'
import { bookingRoutes } from './Booking/booking-routes.js'
import { searchRoutes } from './Search-and-catalog/search-routes.js'
import Home from './shared/presentation/views/home.vue'

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
  ...bookingRoutes,
  ...searchRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'InCleanHome'
  next()
})

export default router
