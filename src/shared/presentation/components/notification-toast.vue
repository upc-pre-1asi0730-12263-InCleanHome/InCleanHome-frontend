<template>
  <Transition name="fade">
    <div v-if="visible" class="custom-toast" :class="type">
      <span class="icon">{{ type === 'success' ? '✅' : 'ℹ️' }}</span>
      <p>{{ message }}</p>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: Boolean,
  message: String,
  type: { type: String, default: 'success' }
});
</script>

<style scoped>
.custom-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  font-weight: 600;
}
.fade-enter-active, .fade-leave-active { transition: all 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-20px); }
</style>