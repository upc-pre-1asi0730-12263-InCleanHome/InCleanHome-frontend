// Asegúrate de que la palabra "worker" esté bien escrita
import WorkerReviews from './presentation/views/worker-reviews.vue'; 
import ReviewForm from './presentation/views/review-form.vue'; 

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
  }
];

export default reviewsRoutes