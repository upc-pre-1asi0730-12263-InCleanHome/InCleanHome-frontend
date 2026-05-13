import ReviewsList from './presentation/views/reviews-list.vue'; 
import WorkerReviews from './presentation/views/worker-reviews.vue'; 
import ReviewForm from './presentation/views/review-form.vue';
import ReviewsList from "@/Reviews-and-Evaluation/presentation/views/reviews-list.vue";

export const reviewsRoutes = [
  {
    path: '/reviews',
    name: 'reviews',
    component: ReviewsList
  },
  {
    path: '/worker-reviews',
    redirect: '/reviews'
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