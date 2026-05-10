const ReviewsList = () => import('./presentation/views/reviews-list.vue');
const ReviewForm = () => import('./presentation/views/review-form.vue');
const WorkerReviews = () => import('./presentation/views/woker-reviews.vue');

export default [
    {
        path: '/reviews',
        name: 'reviews-list',
        component: ReviewsList,
        meta: { requiresAuth: true },
    },
    {
        path: '/reviews/new',
        name: 'review-form',
        component: ReviewForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/reviews/worker/:workerId',
        name: 'worker-reviews',
        component: WorkerReviews,
        props: true,
        meta: { requiresAuth: false },
    },
];
