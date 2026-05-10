import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ReviewsApi } from '../infrastructure/reviews-api.js';
import { ReviewsAssembler } from '../infrastructure/reviews-assembler.js';

export const useReviewsStore = defineStore('reviews', () => {
    // State
    const reviews = ref([]);
    const currentWorkerReputation = ref(null);
    const loading = ref(false);
    const error = ref(null);

    // Getters
    const reviewsByWorker = computed(() => (workerId) =>
        reviews.value.filter(r => r.workerId === workerId)
    );

    const reviewsByClient = computed(() => (clientId) =>
        reviews.value.filter(r => r.clientId === clientId)
    );

    const workerReputation = computed(() => currentWorkerReputation.value);

    // Actions
    async function fetchAllReviews() {
        loading.value = true;
        error.value = null;
        try {
            const data = await ReviewsApi.getAllReviews();
            reviews.value = data.map(r => ReviewsAssembler.toEntityFromResource(r));
        } catch (e) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    async function fetchReviewsByWorker(workerId) {
        loading.value = true;
        error.value = null;
        try {
            const data = await ReviewsApi.getReviewsByWorkerId(workerId);
            const entities = data.map(r => ReviewsAssembler.toEntityFromResource(r));
            reviews.value = entities;

            // Actualizar reputación automáticamente
            currentWorkerReputation.value = ReviewsAssembler.toWorkerReputation(workerId, entities);

            return entities;
        } catch (e) {
            error.value = e.message;
            return [];
        } finally {
            loading.value = false;
        }
    }

    async function fetchReviewsByClient(clientId) {
        loading.value = true;
        error.value = null;
        try {
            const data = await ReviewsApi.getReviewsByClientId(clientId);
            const entities = data.map(r => ReviewsAssembler.toEntityFromResource(r));
            reviews.value = entities;
            return entities;
        } catch (e) {
            error.value = e.message;
            return [];
        } finally {
            loading.value = false;
        }
    }

    async function submitReview(reviewData) {
        loading.value = true;
        error.value = null;
        try {
            const newReviewData = {
                ...reviewData,
                createdAt: new Date().toISOString(),
            };
            const created = await ReviewsApi.createReview(newReviewData);
            const entity = ReviewsAssembler.toEntityFromResource(created);
            reviews.value.push(entity);

            // Actualizar reputación automáticamente tras nueva calificación
            const workerReviews = reviews.value.filter(r => r.workerId === reviewData.workerId);
            currentWorkerReputation.value = ReviewsAssembler.toWorkerReputation(
                reviewData.workerId,
                workerReviews
            );

            return entity;
        } catch (e) {
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function deleteReview(id) {
        loading.value = true;
        error.value = null;
        try {
            await ReviewsApi.deleteReview(id);
            reviews.value = reviews.value.filter(r => r.id !== id);
        } catch (e) {
            error.value = e.message;
        } finally {
            loading.value = false;
        }
    }

    function clearError() {
        error.value = null;
    }

    return {
        reviews,
        currentWorkerReputation,
        loading,
        error,
        reviewsByWorker,
        reviewsByClient,
        workerReputation,
        fetchAllReviews,
        fetchReviewsByWorker,
        fetchReviewsByClient,
        submitReview,
        deleteReview,
        clearError,
    };
});
