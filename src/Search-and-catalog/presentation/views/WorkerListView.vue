<script setup>
import { ref, reactive, computed } from 'vue'

const emit = defineEmits(['select-worker'])

const DAYS_SHORT  = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
const PERIOD_KEYS = ['mañana', 'tarde', 'noche']
const PERIOD_LABELS = { mañana: 'Mañana', tarde: 'Tarde', noche: 'Noche' }
const OTHER_FILTERS = ['Ubicación', 'Experiencia', 'Calificación', 'Tipo Limpieza', 'Precio']

const availOpen    = ref(true)
const searchQuery  = ref('')
const filterSlots  = reactive(
  Object.fromEntries(PERIOD_KEYS.map(k => [k, Array(6).fill(false)]))
)

function toggleSlot(period, i) {
  filterSlots[period][i] = !filterSlots[period][i]
}

// ── Mock data (replace with store when ready) ─────────────────────────────
const ALL_WORKERS = [
  {
    id: 1,
    name: 'Catalina Lopez',
    verified: true,
    role: 'Limpiadora en San Isidro',
    location: 'San Isidro',
    price: 56,
    rating: 4.9,
    reviews: 349,
    services: 340,
    hasPhoto: true,
    bio: 'Tengo años de experiencia y ofrezco servicios de limpieza general del hogar, limpieza profunda y básica, limpieza después de fiestas, organización del hogar, limpieza de entradabilidad de viviendas, embalaje y desembalaje...',
    skills: [
      '💚 Busco ser la profesional de tu limpieza confiable y metódica. Soy Sussy — más de 20 años de experiencia ofreciendo resultados de alta calidad y cuidando cada rincón de tu hogar.',
      'Me especializo en mantenimiento preventivo, limpieza de entradabilidad de viviendas, oficinas, limpiezas después de obras y servicios para Airbnb. No me rindo en circunstancias, calidad es amansar de ayuda. 💚',
    ],
    availability: { mañana: [0,0,0,0,0,0,0], tarde: [0,0,1,0,1,1,0], noche: [0,0,0,0,0,0,0] },
    comments: [
      { author: 'Cesar Obrador', date: '17 de abril', rating: 4.5, text: 'Contraté el servicio de limpieza. Muy puntual y dejó todo impecable' },
      { author: 'Cesar Obrador', date: '17 de abril', rating: 4.5, text: 'Contraté el servicio de limpieza. Muy puntual y dejó todo impecable' },
      { author: 'Cesar Obrador', date: '17 de abril', rating: 4.5, text: 'Contraté el servicio de limpieza. Muy puntual y dejó todo impecable' },
      { author: 'Cesar Obrador', date: '17 de abril', rating: 4.5, text: 'Contraté el servicio de limpieza. Muy puntual y dejó todo impecable' },
    ],
  },
  { id: 2, name: 'Catalina Lopez', verified: true,  role: 'Limpiadora en San Isidro', location: 'San Isidro', price: 56, rating: 4.9, reviews: 349, services: 349, hasPhoto: false, bio: 'Tengo años de experiencia y ofrezco servicios de limpieza general del hogar, limpieza profunda y básica, limpieza después de fiestas, organización del hogar, limpieza de entradabilidad de viviendas, embalaje y desembalaje...', skills: [], availability: { mañana: [0,0,0,0,0,0,0], tarde: [0,0,1,0,1,1,0], noche: [0,0,0,0,0,0,0] }, comments: [] },
  { id: 3, name: 'Catalina Lopez', verified: false, role: 'Limpiadora en San Isidro', location: 'San Isidro', price: 56, rating: 4.8, reviews: 348, services: 348, hasPhoto: false, bio: 'Tengo años de experiencia y ofrezco servicios de limpieza general del hogar, limpieza profunda y básica, limpieza después de fiestas, organización del hogar, limpieza de entradabilidad de viviendas, embalaje y desembalaje...', skills: [], availability: { mañana: [0,0,0,0,0,0,0], tarde: [0,0,1,0,1,1,0], noche: [0,0,0,0,0,0,0] }, comments: [] },
  { id: 4, name: 'Catalina Lopez', verified: false, role: 'Limpiadora en San Isidro', location: 'San Isidro', price: 56, rating: 4.8, reviews: 348, services: 348, hasPhoto: false, bio: 'Tengo años de experiencia y ofrezco servicios de limpieza general del hogar, limpieza profunda y básica, limpieza después de fiestas, organización del hogar, limpieza de entradabilidad de viviendas, embalaje y desembalaje...', skills: [], availability: { mañana: [0,0,0,0,0,0,0], tarde: [0,0,1,0,1,1,0], noche: [0,0,0,0,0,0,0] }, comments: [] },
]

const workers = computed(() =>
  searchQuery.value.trim()
    ? ALL_WORKERS.filter(w => w.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    : ALL_WORKERS
)
</script>

<template>
  <div class="view">

    <!-- ── App Header ─────────────────────────────────────────────────── -->
    <header class="app-header">
      <div class="top-bar">
        <button class="hamburger-btn" aria-label="Menú">
          <span /><span /><span />
        </button>
        <div class="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 9.5L12 3L21 9.5V20c0 .55-.45 1-1 1h-5v-6H9v6H4c-.55 0-1-.45-1-1V9.5Z" fill="#00b272"/>
          </svg>
          <span class="brand-name">InCleanHome</span>
        </div>
        <div class="lang-switch">
          <button class="lang active">ESP</button>
          <button class="lang">ENG</button>
        </div>
      </div>
      <div class="banner">
        <h1 class="banner-title">Trabajadores Cerca de Mi</h1>
        <p class="banner-sub">San Isidro</p>
      </div>
    </header>

    <!-- ── Page layout ─────────────────────────────────────────────────── -->
    <div class="page-grid">

      <!-- Sidebar filters -->
      <aside class="sidebar">
        <div class="filter-header">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M1 2h14M3.5 7h9M6 12h4" stroke="#3a4a5c" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
          <span>Filtrar por:</span>
        </div>

        <!-- Disponibilidad (expandible) -->
        <div class="fgroup">
          <button class="ftoggle" @click="availOpen = !availOpen">
            <span>Disponibilidad</span>
            <svg class="chevron" :class="{ open: availOpen }" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5l4 4 4-4" stroke="#3a4a5c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <Transition name="slide">
            <div v-if="availOpen" class="avail-filter">
              <div class="avail-header-row">
                <span class="period-col" />
                <span v-for="d in DAYS_SHORT" :key="d" class="day-col">{{ d }}</span>
              </div>
              <div v-for="pk in PERIOD_KEYS" :key="pk" class="avail-period-row">
                <span class="period-col period-name">{{ PERIOD_LABELS[pk] }}</span>
                <button
                  v-for="(on, i) in filterSlots[pk]"
                  :key="i"
                  class="slot-circle"
                  :class="{ 'slot-circle--on': on }"
                  @click="toggleSlot(pk, i)"
                  :aria-pressed="on"
                >
                  <span v-if="on">✓</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Otros filtros (colapsados) -->
        <div v-for="label in OTHER_FILTERS" :key="label" class="fgroup">
          <button class="ftoggle">
            <span>{{ label }}</span>
            <svg class="chevron" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5l4 4 4-4" stroke="#3a4a5c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </aside>

      <!-- Results list -->
      <main class="results">
        <!-- Search + sort bar -->
        <div class="search-row">
          <div class="search-box">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="4.2" stroke="#7a8fa6" stroke-width="1.5"/>
              <path d="M9.7 9.7L12.5 12.5" stroke="#7a8fa6" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <input v-model="searchQuery" class="search-input" placeholder="Busca y encuentra trabajadores" />
          </div>
          <button class="sort-btn">
            Ordenar por
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="#3a4a5c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Worker cards -->
        <article v-for="w in workers" :key="w.id" class="wcard">
          <div class="wcard-marker">▲</div>

          <div class="wcard-avatar">
            <div class="avatar" :class="{ 'avatar--photo': w.hasPhoto }">
              <span v-if="w.hasPhoto">CL</span>
            </div>
          </div>

          <div class="wcard-content">
            <div class="wcard-top">
              <div class="wcard-info">
                <div class="wname-row">
                  <span class="wname">{{ w.name }}</span>
                  <span v-if="w.verified" class="badge-check">✓</span>
                  <span class="wrole">{{ w.role }}</span>
                </div>
                <div class="wstat-row">
                  <span class="star-icon">⭐</span>
                  <span class="wrating">{{ w.rating }}</span>
                  <span class="muted">({{ w.reviews }} reseñas)</span>
                </div>
                <div class="wstat-row">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="4.5" stroke="#00b272" stroke-width="1.2"/>
                    <path d="M3.5 6h5M6 3.5v5" stroke="#00b272" stroke-width="1.2" stroke-linecap="round"/>
                  </svg>
                  <span>{{ w.services }} Limpiezas realizadas</span>
                </div>
              </div>
              <span class="wprice">S/.{{ w.price }}.00 x hora</span>
            </div>

            <p class="wbio">{{ w.bio }}</p>

            <div class="wcard-actions">
              <button class="btn-outline" @click="emit('select-worker', w)">Ver Perfil</button>
              <button class="btn-green"   @click="emit('select-worker', w)">Contratar</button>
            </div>
          </div>
        </article>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ── Design tokens ──────────────────────────────────────── */
.view {
  --green:       #00b272;
  --green-dark:  #009960;
  --white:       #ffffff;
  --bg:          #f7fafc;
  --green-light: #e6f9f2;
  --navy:        #1a2e4a;
  --text:        #3a4a5c;
  --text-light:  #7a8fa6;
  --border:      #e2edf5;
  --radius:      12px;
  --radius-lg:   20px;

  min-height: 100vh;
  background: var(--bg);
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--text);
}

/* ── Header ─────────────────────────────────────────────── */
.app-header { background: var(--white); }

.top-bar {
  display: flex;
  align-items: center;
  padding: 0.7rem 1.25rem;
  gap: 0.75rem;
  border-bottom: 1px solid var(--border);
}

.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  flex-shrink: 0;
}
.hamburger-btn span {
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: var(--navy);
}

.brand {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}
.brand-name {
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--navy);
}

.lang-switch { display: flex; gap: 0.3rem; flex-shrink: 0; }
.lang {
  border: 2px solid var(--green);
  background: transparent;
  color: var(--green);
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: background 0.15s, color 0.15s;
}
.lang.active { background: var(--green); color: var(--white); }

.banner {
  background: var(--green);
  padding: 0.6rem 1.25rem;
}
.banner-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--white);
  margin: 0;
}
.banner-sub {
  font-size: 0.78rem;
  color: rgba(255,255,255,.82);
  margin: 0;
}

/* ── Page grid ───────────────────────────────────────────── */
.page-grid {
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
}

/* ── Sidebar ─────────────────────────────────────────────── */
.sidebar {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.875rem;
  height: fit-content;
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--navy);
  margin-bottom: 0.6rem;
}

.fgroup { border-top: 1px solid var(--border); }

.ftoggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.55rem 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
  font-family: 'Inter', system-ui, sans-serif;
}

.chevron { transition: transform 0.2s; flex-shrink: 0; }
.chevron.open { transform: rotate(180deg); }

/* ── Availability grid (filter) ─────────────────────────── */
.avail-filter { padding-bottom: 0.6rem; }

.avail-header-row,
.avail-period-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.3rem;
}

.period-col { width: 50px; flex-shrink: 0; }
.day-col {
  width: 22px;
  text-align: center;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-light);
}
.period-name {
  font-size: 0.75rem;
  color: var(--text);
}

.slot-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--bg);
  cursor: pointer;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  padding: 0;
  transition: background 0.15s, border-color 0.15s;
}
.slot-circle--on {
  background: var(--green);
  border-color: var(--green);
}

/* ── Slide transition ────────────────────────────────────── */
.slide-enter-active, .slide-leave-active { transition: max-height 0.25s ease, opacity 0.2s; overflow: hidden; max-height: 300px; }
.slide-enter-from, .slide-leave-to { max-height: 0; opacity: 0; }

/* ── Search row ──────────────────────────────────────────── */
.search-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: center;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1.5px solid var(--green);
  border-radius: var(--radius);
  padding: 0.55rem 0.875rem;
  background: var(--white);
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
.sort-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 0.55rem 0.875rem;
  background: var(--white);
  font-size: 0.875rem;
  color: var(--text);
  cursor: pointer;
  white-space: nowrap;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ── Worker card ─────────────────────────────────────────── */
.wcard {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.875rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 8px rgba(26,46,74,.05);
}

.wcard-marker {
  font-size: 0.55rem;
  color: var(--text-light);
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.wcard-avatar { flex-shrink: 0; }

.avatar {
  width: 72px;
  height: 72px;
  border-radius: var(--radius);
  background: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-light);
}
.avatar--photo {
  background: linear-gradient(135deg, #7dbea0, #4d9178);
  color: var(--white);
}

.wcard-content { flex: 1; min-width: 0; }

.wcard-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}
.wcard-info { min-width: 0; }

.wname-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-wrap: wrap;
  margin-bottom: 0.15rem;
}
.wname {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--navy);
}
.badge-check {
  background: var(--green);
  color: var(--white);
  border-radius: 50%;
  width: 15px;
  height: 15px;
  font-size: 0.55rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.wrole { font-size: 0.77rem; color: var(--text-light); }

.wstat-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.78rem;
  color: var(--text);
  margin-bottom: 0.1rem;
}
.muted { color: var(--text-light); }
.star-icon { font-size: 0.72rem; }
.wrating { font-weight: 600; }

.wprice {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--navy);
  white-space: nowrap;
  flex-shrink: 0;
}

.wbio {
  font-size: 0.8rem;
  color: var(--text);
  line-height: 1.5;
  margin: 0.4rem 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wcard-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-outline {
  border: 1.5px solid var(--green);
  background: transparent;
  color: var(--green);
  border-radius: 8px;
  padding: 0.38rem 0.875rem;
  font-size: 0.83rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: background 0.15s;
}
.btn-outline:hover { background: var(--green-light); }

.btn-green {
  background: var(--green);
  color: var(--white);
  border: none;
  border-radius: 8px;
  padding: 0.38rem 0.875rem;
  font-size: 0.83rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  transition: background 0.15s;
}
.btn-green:hover { background: var(--green-dark); }
</style>
