<script setup>
import { onMounted } from 'vue';
import { useReviewsStore } from '../../application/reviews-store.js';
import ReviewCard from '../components/review-card.vue';
import ReputationBadge from '../components/reputation-badge.vue';
import StarRating from '../components/star-rating.vue';

const props = defineProps({
  workerId: { type: [String, Number], required: true },
});

const store = useReviewsStore();

onMounted(async () => {
  await store.fetchReviewsByWorker(props.workerId);
});
</script>

<template>
  <div class="worker-reviews">
    <div class="worker-reviews__header">
      <h2 class="worker-reviews__title">Reputación y Calificaciones</h2>
      <div class="worker-reviews__reputation">
        <ReputationBadge :reputation="store.workerReputation" />
      </div>
    </div>

    <div v-if="store.loading" class="worker-reviews__loading">
      Cargando calificaciones...
    </div>

    <div v-else-if="store.reviews.length === 0" class="worker-reviews__empty">
      Esta trabajadora aún no tiene calificaciones.
    </div>

    <div v-else class="worker-reviews__list">
      <ReviewCard
          v-for="review in store.reviews"
          :key="review.id"
          :review="review"
      />
    </div>
  </div>
</template>

<style scoped>
.worker-reviews {
  max-width: 680px;
  margin: 0 auto;
  padding: 1.5rem;
}
.worker-reviews__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #E6F9F2 0%, rgba(230, 249, 242, 0.3) 100%);
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid #00B272;
}
.worker-reviews__title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #009960;
  margin: 0;
}
.worker-reviews__loading,
.worker-reviews__empty {
  color: #7A8FA6;
  text-align: center;
  padding: 2rem;
  font-size: 0.95rem;
}
.worker-reviews__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
