export const bookingRoutes = [
  {
    path: '/booking',
    name: 'booking',
    component: () => import('./presentation/views/booking-catalog.vue'),
    meta: { title: 'Reservas – InCleanHome' }
  }
]

export default bookingRoutes;