<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '../../application/search-store.js'
import SearchFilters from '../components/search-filters.vue'
import WorkerCard from '../components/worker-card.vue'

const store  = useSearchStore()
const router = useRouter()

onMounted(() => {
  store.loadAll()
})

function goToProfile(workerId) {
  router.push({ name: 'worker-profile', params: { id: workerId } })
}
</script>

<template>
  <div class="catalog-page">
    <!-- Page header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          Catálogo de<br />
          <span class="highlight">Profesionales</span>
        </h1>
        <p class="page-subtitle">
          Encuentra la trabajadora del hogar ideal para tus necesidades.
          Todos los perfiles están verificados.
        </p>
      </div>
      <div class="header-stats" v-if="!store.isLoading">
        <div class="stat-bubble">
          <span class="bubble-value">{{ store.totalResults }}</span>
          <span class="bubble-label">Resultados</span>
        </div>
      </div>
    </header>

    <!-- Main layout -->
    <div class="catalog-layout">
      <!-- Filters sidebar -->
      <SearchFilters />

      <!-- Results area -->
      <section class="results-area">
        <!-- Loading state -->
        <div v-if="store.isLoading" class="state-container">
          <div class="spinner-ring" />
          <p class="state-text">Buscando profesionales…</p>
        </div>

        <!-- Error state -->
        <div v-else-if="store.error" class="state-container error">
          <i class="pi pi-exclamation-circle state-icon" />
          <p class="state-text">{{ store.error }}</p>
          <button class="retry-btn" @click="store.loadAll()">
            <i class="pi pi-refresh" /> Reintentar
          </button>
        </div>

        <!-- Empty state -->
        <div v-else-if="!store.hasResults" class="state-container">
          <i class="pi pi-search state-icon" />
          <p class="state-text">No se encontraron resultados con estos filtros.</p>
          <button class="retry-btn" @click="store.clearFilters()">
            <i class="pi pi-times" /> Limpiar filtros
          </button>
        </div>

        <!-- Cards grid -->
        <transition-group v-else name="card" tag="div" class="cards-grid" appear>
          <WorkerCard
            v-for="worker in store.filteredWorkers"
            :key="worker.id"
            :worker="worker"
            @view-profile="goToProfile"
          />
        </transition-group>
      </section>
    </div>
  </div>
</template>

<style scoped>
.catalog-page {
  min-height: 100vh;
  background: #f7fafc;
  font-family: 'Inter', sans-serif;
}

/* Header */
.page-header {
  background: linear-gradient(135deg, #1a2e4a 0%, #3a4a5c 100%);
  padding: 48px 40px 56px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='1' fill='%2300b272' opacity='0.15'/%3E%3C/svg%3E");
  pointer-events: none;
}

.header-content {
  position: relative;
}

.page-title {
  font-family: 'Nunito', sans-serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 12px;
  line-height: 1.1;
}

.page-title .highlight {
  color: #00b272;
}

.page-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  max-width: 460px;
  line-height: 1.6;
}

.header-stats {
  position: relative;
}

.stat-bubble {
  background: rgba(255, 255, 255, 0.1);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px 28px;
  text-align: center;
  backdrop-filter: blur(8px);
}

.bubble-value {
  display: block;
  font-family: 'Nunito', sans-serif;
  font-size: 36px;
  font-weight: 900;
  color: #00b272;
}

.bubble-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

/* Layout */
.catalog-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 28px;
  padding: 32px 40px;
  max-width: 1280px;
  margin: 0 auto;
}

/* Results */
.results-area {
  min-height: 400px;
}

/* States */
.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 40px;
  text-align: center;
}

.state-icon {
  font-size: 48px;
  color: #7a8fa6;
}

.state-container.error .state-icon {
  color: #ef4444;
}

.state-text {
  font-size: 16px;
  color: #7a8fa6;
  max-width: 320px;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #1a2e4a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.retry-btn:hover {
  background: #3a4a5c;
}

/* Spinner */
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

/* Cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 22px;
}

/* Card transition */
.card-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

/* Responsive */
@media (max-width: 1024px) {
  .catalog-layout {
    grid-template-columns: 1fr;
    padding: 24px 20px;
  }

  .page-header {
    padding: 32px 20px 40px;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
