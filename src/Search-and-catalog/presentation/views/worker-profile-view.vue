<script setup>
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '../../application/search-store.js'
import WorkerProfileDetail from '../components/worker-profile-detail.vue'

const route  = useRoute()
const router = useRouter()
const store  = useSearchStore()

function load() {
  store.loadWorkerById(route.params.id)
}

onMounted(load)

watch(() => route.params.id, load)

function goBack() {
  router.push({ name: 'catalog' })
}

function handleBook(worker) {
  // Navega al bounded context Booking con el ID de la trabajadora
  router.push({ name: 'booking-create', query: { workerId: worker.id } })
}
</script>

<template>
  <div class="profile-page">
    <!-- Loading -->
    <div v-if="store.isLoading" class="state-container">
      <div class="spinner-ring" />
      <p>Cargando perfil…</p>
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="state-container error">
      <i class="pi pi-exclamation-circle state-icon" />
      <p>{{ store.error }}</p>
      <button class="back-link" @click="goBack()">Volver al catálogo</button>
    </div>

    <!-- Profile -->
    <WorkerProfileDetail
      v-else-if="store.selectedWorker"
      :worker="store.selectedWorker"
      @back="goBack"
      @book="handleBook"
    />
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f7fafc;
  font-family: 'Inter', sans-serif;
  padding: 32px 40px;
  max-width: 1100px;
  margin: 0 auto;
}

.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 100px 40px;
  text-align: center;
  color: #7a8fa6;
}

.state-container.error .state-icon {
  font-size: 48px;
  color: #ef4444;
}

.back-link {
  background: none;
  border: 1.5px solid #e2edf5;
  color: #3a4a5c;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-link:hover {
  border-color: #00b272;
  color: #00b272;
}

.spinner-ring {
  width: 48px;
  height: 48px;
  border: 4px solid #e2edf5;
  border-top-color: #00b272;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 20px 16px;
  }
}
</style>
