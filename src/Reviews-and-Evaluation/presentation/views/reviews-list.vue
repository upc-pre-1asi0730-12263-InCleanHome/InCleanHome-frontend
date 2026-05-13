<script setup>
import { onMounted, ref } from 'vue';
import { useReviewsStore } from '../../application/reviews-store.js';
import ReviewCard from '../components/review-card.vue';
import ReviewForm from './review-form.vue';

const store = useReviewsStore();
const showForm = ref(false);

onMounted(async () => {
  await store.fetchAllReviews();
});
</script>

<template>
  <div class="reviews-list">
    <div class="reviews-list__header">
      <h2 class="reviews-list__title">Calificaciones</h2>
      <button class="btn btn--primary" @click="showForm = !showForm">
        {{ showForm ? 'Cancelar' : '+ Nueva calificación' }}
      </button>
    </div>

    <div v-if="showForm" class="reviews-list__form-wrapper">
      <ReviewForm
          @submitted="showForm = false"
          @cancel="showForm = false"
      />
    </div>

    <div v-if="store.loading" class="reviews-list__loading">
      Cargando...
    </div>

    <div v-else-if="store.reviews.length === 0" class="reviews-list__empty">
      No hay calificaciones registradas aún.
    </div>

    <div v-else class="reviews-list__grid">
      <ReviewCard
          v-for="review in store.reviews"
          :key="review.id"
          :review="review"
          :show-worker="true"
      />
    </div>
  </div>
</template>

<style scoped>
.reviews-list {
  max-width: 760px;
  margin: 0 auto;
  padding: 1.5rem;
}
.reviews-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.reviews-list__title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #009960;
  margin: 0;
}
.reviews-list__form-wrapper {
  margin-bottom: 1.5rem;
  border: 2px solid #00B272;
  border-radius: 16px;
  overflow: hidden;
  background: white;
}
.reviews-list__loading,
.reviews-list__empty {
  color: #7A8FA6;
  text-align: center;
  padding: 2rem;
}
.reviews-list__grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.btn {
  padding: 0.55rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}
.btn--primary {
  background: linear-gradient(135deg, #009960 0%, #00B272 100%);
  color: white;
}
.btn--primary:hover {
  background: linear-gradient(135deg, #008050 0%, #009960 100%);
  box-shadow: 0 4px 12px rgba(0, 153, 96, 0.3);
  transform: translateY(-2px);
}
</style>
