<script setup>
import { computed } from 'vue';

const props = defineProps({
  reputation: { type: Object, default: null },
});

const badgeColor = computed(() => {
  if (!props.reputation) return '#7A8FA6';
  const map = { Excelente: '#009960', Bueno: '#00B272', Regular: '#F59E0B', Bajo: '#ef4444' };
  return map[props.reputation.reputation] || '#7A8FA6';
});
</script>

<template>
  <div v-if="reputation" class="reputation-badge">
    <div class="reputation-score" :style="{ borderColor: badgeColor, color: badgeColor }">
      {{ reputation.averageRating.toFixed(1) }}
    </div>
    <div class="reputation-info">
             <span class="reputation-label" :style="{ color: badgeColor }">
                 {{ reputation.reputation }}
             </span>
      <span class="reputation-count">
                 {{ reputation.totalReviews }} calificación{{ reputation.totalReviews !== 1 ? 'es' : '' }}
             </span>
    </div>
  </div>
  <div v-else class="reputation-empty">Sin calificaciones aún</div>
</template>

<style scoped>
.reputation-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #E6F9F2;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  border: 2px solid #00B272;
}
.reputation-score {
  font-size: 1.8rem;
  font-weight: 700;
  border: 3px solid;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reputation-info {
  display: flex;
  flex-direction: column;
}
.reputation-label {
  font-weight: 700;
  font-size: 1rem;
}
.reputation-count {
  font-size: 0.8rem;
  color: #7A8FA6;
}
.reputation-empty {
  color: #7A8FA6;
  font-style: italic;
  font-size: 0.9rem;
}
</style>
