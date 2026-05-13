export const bookingRoutes = [
  {
    path: '/booking',
    name: 'booking',
    component: () => import('./presentation/views/booking-list.vue'),
    meta: { title: 'Mis Reservas – InCleanHome' }
  }
]
