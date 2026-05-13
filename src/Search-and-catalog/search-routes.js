export const searchRoutes = [
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('./presentation/views/catalog-view.vue'),
    meta: {
      title: 'Catálogo de Profesionales – InCleanHome',
      requiresAuth: false,
    },
  },
  {
    path: '/catalog/:id',
    name: 'worker-profile',
    component: () => import('./presentation/views/worker-profile-view.vue'),
    props: true,
    meta: {
      title: 'Perfil de Profesional – InCleanHome',
      requiresAuth: false,
    },
  },
]
