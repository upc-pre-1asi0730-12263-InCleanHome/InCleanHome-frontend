<script setup>
import { ref, reactive } from 'vue';
import { useReviewsStore } from '../../application/reviews-store.js';
import StarRating from '../components/star-rating.vue';

const emit = defineEmits(['submitted', 'cancel']);
const props = defineProps({
  workerId: { type: [String, Number], default: null },
  workerName: { type: String, default: '' },
  clientId: { type: [String, Number], default: null },
  clientName: { type: String, default: '' },
  bookingId: { type: [String, Number], default: null },
});

const store = useReviewsStore();

const form = reactive({
  rating: 0,
  comment: '',
});
const submitted = ref(false);
const success = ref(false);

async function handleSubmit() {
  if (form.rating === 0) return;
  submitted.value = true;
  try {
    await store.submitReview({
      workerId: props.workerId,
      workerName: props.workerName,
      clientId: props.clientId,
      clientName: props.clientName,
      bookingId: props.bookingId,
      rating: form.rating,
      comment: form.comment,
    });
    success.value = true;
    form.rating = 0;
    form.comment = '';
    emit('submitted');
  } catch {
    // error handled in store
  } finally {
    submitted.value = false;
  }
}
</script>

<template>
  <div class="review-form">
    <h3 class="review-form__title">
      Calificar a <span>{{ workerName || 'la trabajadora' }}</span>
    </h3>

    <div v-if="success" class="review-form__success">
      ✅ ¡Gracias! Tu calificación fue enviada y la reputación se actualizó automáticamente.
    </div>

    <div v-if="store.error" class="review-form__error">
      {{ store.error }}
    </div>

    <div class="review-form__field">
      <label class="review-form__label">Tu calificación *</label>
      <StarRating v-model="form.rating" />
      <span v-if="submitted && form.rating === 0" class="review-form__validation">
                Selecciona al menos una estrella.
            </span>
    </div>

    <div class="review-form__field">
      <label class="review-form__label">Comentario (opcional)</label>
      <textarea
          v-model="form.comment"
          class="review-form__textarea"
          rows="4"
          placeholder="Describe tu experiencia con esta trabajadora..."
          maxlength="500"
      />
      <span class="review-form__char-count">{{ form.comment.length }}/500</span>
    </div>

    <div class="review-form__actions">
      <button
          type="button"
          class="btn btn--secondary"
          @click="$emit('cancel')"
      >
        Cancelar
      </button>
      <button
          type="button"
          class="btn btn--primary"
          :disabled="store.loading || form.rating === 0"
          @click="handleSubmit"
      >
        <span v-if="store.loading">Enviando...</span>
        <span v-else>Enviar calificación</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.review-form {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 520px;
  border: 2px solid #E6F9F2;
}
.review-form__title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #009960;
  margin: 0 0 1.25rem;
}
.review-form__title span {
  color: #00B272;
}
.review-form__success {
  background: #E6F9F2;
  color: #009960;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  border-left: 4px solid #00B272;
}
.review-form__error {
  background: #fee2e2;
  color: #991b1b;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
.review-form__field {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.review-form__label {
  font-weight: 600;
  color: #3A4A5C;
  font-size: 0.9rem;
}
.review-form__textarea {
  border: 2px solid #E6F9F2;
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  font-size: 0.92rem;
  resize: vertical;
  font-family: inherit;
  color: #1A2E4A;
  transition: all 0.2s;
}
.review-form__textarea:focus {
  outline: none;
  border-color: #00B272;
  box-shadow: 0 0 0 3px rgba(0, 178, 114, 0.1);
}
.review-form__char-count {
  font-size: 0.75rem;
  color: #7A8FA6;
  text-align: right;
}
.review-form__validation {
  color: #ef4444;
  font-size: 0.8rem;
}
.review-form__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
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
.btn--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #008050 0%, #009960 100%);
  box-shadow: 0 4px 12px rgba(0, 153, 96, 0.3);
  transform: translateY(-2px);
}
.btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn--secondary {
  background: #E6F9F2;
  color: #009960;
  border: 2px solid #00B272;
}
.btn--secondary:hover {
  background: #E6F9F2;
  color: #00B272;
  border-color: #009960;
}
</style>
