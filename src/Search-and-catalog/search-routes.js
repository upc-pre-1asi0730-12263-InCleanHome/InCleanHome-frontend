export const searchRoutes = [
  {
    path: '/search',
    name: 'search',
    component: () => import('./presentation/views/catalog-view.vue'),
    meta: {
      title: 'Catálogo de Profesionales – InCleanHome',
      requiresAuth: false,
    },
  },
  {
    path: '/search/:id',
    name: 'worker-profile',
    component: () => import('./presentation/views/worker-profile-view.vue'),
    props: true,
    meta: {
      title: 'Perfil de Profesional – InCleanHome',
      requiresAuth: false,
    },
  },
]

export default searchRoutes;