<script setup>
import StarRating from './star-rating.vue';

const props = defineProps({
  review: { type: Object, required: true },
  showWorker: { type: Boolean, default: false },
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('es-PE', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}
</script>

<template>
  <div class="review-card">
    <div class="review-card__header">
      <div class="review-card__avatar">
        {{ review.clientName?.charAt(0)?.toUpperCase() || '?' }}
      </div>
      <div class="review-card__meta">
        <span class="review-card__author">{{ review.clientName }}</span>
        <span v-if="showWorker" class="review-card__worker">
                    Para: {{ review.workerName }}
                </span>
        <span class="review-card__date">{{ formatDate(review.createdAt) }}</span>
      </div>
      <StarRating :model-value="review.rating" :readonly="true" size="small" />
    </div>
    <p v-if="review.comment" class="review-card__comment">{{ review.comment }}</p>
  </div>
</template>

<style scoped>
.review-card {
  background: white;
  border: 2px solid #E6F9F2;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  transition: all 0.3s ease;
}
.review-card:hover {
  border-color: #00B272;
  box-shadow: 0 4px 16px rgba(0, 153, 96, 0.1);
}
.review-card__header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}
.review-card__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #009960 0%, #00B272 100%);
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.review-card__meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.review-card__author {
  font-weight: 600;
  color: #1A2E4A;
}
.review-card__worker {
  font-size: 0.78rem;
  color: #00B272;
  font-weight: 500;
}
.review-card__date {
  font-size: 0.78rem;
  color: #7A8FA6;
}
.review-card__comment {
  color: #3A4A5C;
  font-size: 0.92rem;
  margin: 0;
  padding-left: 3.25rem;
  line-height: 1.5;
}
</style>
