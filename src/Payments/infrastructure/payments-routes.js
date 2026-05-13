// src/Payments/infrastructure/payments-routes.js
const paymentsRoutes = [
    {
        path: '/payments',
        name: 'payments',
        component: () => import('../application/pages/payments-list.vue')
    }
];

export default paymentsRoutes;