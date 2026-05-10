import { createRouter, createWebHistory } from 'vue-router';

// Importar las rutas de cada módulo
import reviewsRoutes from './Reviews-and-Evaluation/reviews-routes.js';

// Crear el router con todas las rutas
const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Rutas del módulo Reviews-and-Evaluation
        ...reviewsRoutes,
        // Ruta por defecto para home si no coincide con otras rutas
        {
            path: '/',
            name: 'home',
            component: () => import('./shared/presentation/views/home.vue'),
        },
        // Ruta 404
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('./shared/presentation/views/home.vue'),
        },
    ],
});

export default router;
