<script setup>
import { ref, computed } from 'vue'
import WorkerProfileView from './WorkerProfileView.vue'
import { mockWorkers } from '../data/mock-workers.js'

const selectedWorker = ref(null)
const searchQuery    = ref('')
const sortBy         = ref('')

const DAYS         = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']
const PERIOD_KEYS  = ['mañana', 'tarde', 'noche']
const PERIOD_LABELS = { mañana: 'Mañana', tarde: 'Tarde', noche: 'Noche' }

const filterOpen = ref({
  disponibilidad: true,
  ubicacion:      false,
  experiencia:    false,
  calificacion:   false,
  tipo:           false,
  precio:         false
})

const FILTER_SECTIONS = [
  { key: 'disponibilidad', label: 'Disponibilidad' },
  { key: 'ubicacion',      label: 'Ubicacion' },
  { key: 'experiencia',    label: 'Experiencia' },
  { key: 'calificacion',   label: 'Calificación' },
  { key: 'tipo',           label: 'Tipo Limpieza' },
  { key: 'precio',         label: 'Precio' }
]

const filteredWorkers = computed(() => {
  let list = mockWorkers
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(w =>
      w.name.toLowerCase().includes(q) || w.role.toLowerCase().includes(q)
    )
  }
  if (sortBy.value === 'rating') return [...list].sort((a, b) => b.rating - a.rating)
  if (sortBy.value === 'price')  return [...list].sort((a, b) => a.price - b.price)
  return list
})
</script>

<template>
  <div class="booking-page">

    <!-- ── Green banner ──────────────────────────────────── -->
    <div class="booking-banner">
      <h1 class="banner-title">Trabajadores Cerca de Mi</h1>
      <p class="banner-sub">San Isidro</p>
    </div>

    <!-- ── Profile mode ──────────────────────────────────── -->
    <WorkerProfileView
      v-if="selectedWorker"
      :worker="selectedWorker"
      @back="selectedWorker = null"
    />

    <!-- ── Catalog mode ──────────────────────────────────── -->
    <div v-else class="catalog-body">

      <!-- Filter panel -->
      <aside class="filter-panel">
        <div class="fp-header">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M1 3h13M3 7.5h9M5.5 12h4" stroke="#3a4a5c" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span class="fp-label">Filtrar por:</span>
        </div>

        <div v-for="f in FILTER_SECTIONS" :key="f.key" class="filter-section">
          <button class="filter-toggle" @click="filterOpen[f.key] = !filterOpen[f.key]">
            <span>{{ f.label }}</span>
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              :style="{ transform: filterOpen[f.key] ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s' }"
            >
              <path d="M2 4l4 4 4-4" stroke="#7a8fa6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Disponibilidad: availability grid -->
          <div v-if="f.key === 'disponibilidad' && filterOpen.disponibilidad" class="avail-filter">
            <div class="ag-row ag-header-row">
              <span class="ag-period-lbl" />
              <span v-for="d in DAYS" :key="d" class="ag-day">{{ d }}</span>
            </div>
            <div v-for="pk in PERIOD_KEYS" :key="pk" class="ag-row">
              <span class="ag-period-lbl">{{ PERIOD_LABELS[pk] }}</span>
              <div
                v-for="(_, di) in DAYS" :key="di"
                class="ag-dot"
                :class="{ 'ag-dot--off': true }"
              />
            </div>
          </div>
        </div>
      </aside>

      <!-- Worker list -->
      <main class="worker-list">

        <!-- Search row -->
        <div class="search-row">
          <div class="search-bar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="#94a3b8" stroke-width="1.5"/>
              <path d="M10 10l3.5 3.5" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <input v-model="searchQuery" class="search-input" placeholder="Busca y encuentra trabajadores" />
          </div>
          <select v-model="sortBy" class="sort-select">
            <option value="">Ordenar por</option>
            <option value="rating">Mejor valorado</option>
            <option value="price">Menor precio</option>
          </select>
        </div>

        <!-- Worker cards -->
        <div class="worker-cards">
          <div v-for="w in filteredWorkers" :key="w.id" class="worker-card">

            <!-- Photo area -->
            <div class="card-photo-area">
              <span class="rank-triangle">▲</span>
              <div class="avatar-circle">{{ w.name.charAt(0) }}</div>
            </div>

            <!-- Info area -->
            <div class="card-info">
              <div class="card-top-row">
                <div class="name-line">
                  <span class="worker-name">{{ w.name }}</span>
                  <span v-if="w.verified" class="verified-dot" title="Verificado">●</span>
                </div>
                <span class="worker-price">S/.{{ w.price }}.00 x hora</span>
              </div>
              <p class="worker-role">{{ w.role }}</p>
              <p class="worker-rating">⭐ {{ w.rating }} ({{ w.reviews }} reseñas)</p>
              <p class="worker-services">✓ {{ w.services }} Limpiezas realizadas</p>
              <p class="worker-bio">{{ w.bio.slice(0, 145) }}...</p>

              <div class="card-actions">
                <button class="btn-view-profile" @click="selectedWorker = w">Ver Perfil</button>
                <button class="btn-hire-card"    @click="selectedWorker = w">Contratar</button>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>

  </div>
</template>

<style scoped>
/* ── tokens ──────────────────────────────────────────────── */
.booking-page {
  --green:      #00b272;
  --green-dark: #009960;
  --green-lt:   #e6f9f2;
  --white:      #ffffff;
  --bg:         #f7fafc;
  --navy:       #1a2e4a;
  --text:       #3a4a5c;
  --text-lt:    #7a8fa6;
  --border:     #e2edf5;
  --radius:     12px;

  /* pull out the main-viewport's padding so the banner goes edge-to-edge */
  margin: -2.5rem -2.5rem 0;
  background: var(--bg);
  font-family: 'Inter', system-ui, sans-serif;
}

/* ── banner ──────────────────────────────────────────────── */
.booking-banner {
  background: var(--green);
  padding: 0.85rem 2.5rem;
}
.banner-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
  margin: 0;
}
.banner-sub {
  font-size: 0.8rem;
  color: rgba(255,255,255,.82);
  margin: 0;
}

/* ── catalog layout ──────────────────────────────────────── */
.catalog-body {
  display: grid;
  grid-template-columns: 185px 1fr;
  gap: 1.25rem;
  padding: 1.25rem 2.5rem 2.5rem;
  align-items: start;
}

/* ── filter panel ────────────────────────────────────────── */
.filter-panel {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  position: sticky;
  top: 1rem;
}

.fp-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.875rem;
}
.fp-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--navy);
}

.filter-section {
  border-top: 1px solid var(--border);
  padding: 0.25rem 0;
}

.filter-toggle {
  width: 100%;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text);
  cursor: pointer;
  font-family: 'Inter', system-ui, sans-serif;
}
.filter-toggle:hover { color: var(--navy); }

/* ── availability grid (filter) ──────────────────────────── */
.avail-filter { padding-bottom: 0.5rem; }
.ag-row {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 4px;
}
.ag-header-row { margin-bottom: 2px; }
.ag-period-lbl {
  width: 46px;
  font-size: 0.68rem;
  color: var(--text);
  flex-shrink: 0;
}
.ag-day {
  width: 18px;
  text-align: center;
  font-size: 0.63rem;
  font-weight: 600;
  color: var(--text-lt);
}
.ag-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5rem;
  color: var(--text-lt);
  flex-shrink: 0;
}
.ag-dot--on  { background: var(--green); color: #fff; }
.ag-dot--off { background: var(--border); }

/* ── worker list ─────────────────────────────────────────── */
.worker-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── search row ──────────────────────────────────────────── */
.search-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  background: var(--white);
  padding: 0.5rem 0.875rem;
  box-shadow: 0 1px 4px rgba(26,46,74,.05);
}
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: var(--text);
  background: transparent;
  font-family: 'Inter', system-ui, sans-serif;
}
.search-input::placeholder { color: var(--text-lt); }

.sort-select {
  border: 1.5px solid var(--border);
  border-radius: 10px;
  background: var(--white);
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  color: var(--text);
  cursor: pointer;
  outline: none;
  font-family: 'Inter', system-ui, sans-serif;
  white-space: nowrap;
}

/* ── worker cards ────────────────────────────────────────── */
.worker-cards {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.worker-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.1rem 1.25rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(26,46,74,.05);
  transition: box-shadow 0.2s;
}
.worker-card:hover { box-shadow: 0 4px 16px rgba(26,46,74,.1); }

/* ── photo area ──────────────────────────────────────────── */
.card-photo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 4px;
}

.rank-triangle {
  font-size: 0.6rem;
  color: var(--text-lt);
  line-height: 1;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a8d5bf, #5ea88a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: #fff;
  flex-shrink: 0;
}

/* ── card info ───────────────────────────────────────────── */
.card-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.name-line {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.worker-name {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--navy);
}
.verified-dot {
  color: var(--green);
  font-size: 0.7rem;
}
.worker-price {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--navy);
  white-space: nowrap;
  flex-shrink: 0;
}

.worker-role    { font-size: 0.8rem; color: var(--text-lt); margin: 0; }
.worker-rating  { font-size: 0.8rem; color: var(--text);    margin: 0; }
.worker-services{ font-size: 0.8rem; color: var(--text);    margin: 0; }
.worker-bio {
  font-size: 0.8rem;
  color: var(--text);
  line-height: 1.5;
  margin: 0.2rem 0 0.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* ── card actions ────────────────────────────────────────── */
.card-actions {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.3rem;
}

.btn-view-profile {
  border: 1.5px solid var(--green);
  background: transparent;
  color: var(--green);
  border-radius: 8px;
  padding: 0.4rem 0.875rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: background 0.15s;
}
.btn-view-profile:hover { background: var(--green-lt); }

.btn-hire-card {
  background: var(--green);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.875rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: background 0.15s;
}
.btn-hire-card:hover { background: var(--green-dark); }
</style>
