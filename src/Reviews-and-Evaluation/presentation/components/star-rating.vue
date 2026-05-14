<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  readonly: { type: Boolean, default: false },
  size: { type: String, default: 'normal' },
});
const emit = defineEmits(['update:modelValue']);

function setRating(value) {
  if (!props.readonly) emit('update:modelValue', value);
}
</script>

<template>
  <div class="star-rating" :class="{ 'star-rating--readonly': readonly }">
        <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="[
                star <= modelValue ? 'star--filled' : 'star--empty',
                size === 'small' ? 'star--small' : '',
            ]"
            @click="setRating(star)"
        >
            ★
        </span>
  </div>
</template>

<style scoped>
.star-rating {
  display: inline-flex;
  gap: 2px;
}
.star {
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #E6F9F2;
}
.star--small {
  font-size: 1.1rem;
}
.star--filled {
  color: #F59E0B;
  text-shadow: 0 0 4px rgba(245, 158, 11, 0.4);
}
.star:hover {
  transform: scale(1.15);
}
.star-rating--readonly .star {
  cursor: default;
}
.star-rating--readonly .star:hover {
  transform: none;
}
</style>
