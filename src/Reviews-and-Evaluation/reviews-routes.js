import ReviewsList from './presentation/views/reviews-list.vue'; 
import WorkerReviews from './presentation/views/worker-reviews.vue'; 
import ReviewForm from './presentation/views/review-form.vue'; 

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
  }
];

export default reviewsRoutes