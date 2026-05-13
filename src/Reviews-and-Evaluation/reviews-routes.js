// Asegúrate de que la palabra "worker" esté bien escrita
import WorkerReviews from './presentation/views/worker-reviews.vue'; 
import ReviewForm from './presentation/views/review-form.vue';
import ReviewsList from "@/Reviews-and-Evaluation/presentation/views/reviews-list.vue";

export const reviewsRoutes = [
  {
    path: '/worker-reviews',
    name: 'worker-reviews',
    component: WorkerReviews
  },
  {
    path: '/review-form',
    name: 'review-form',
    component: ReviewForm
  },
  {
    path: '/review-list',
    name: 'review-list',
    component: ReviewsList
  },

];

export default reviewsRoutes