<script setup>
import { ref } from 'vue'
import BookingModal from '@/Booking/presentation/components/BookingModal.vue'

const props = defineProps({ worker: { type: Object, required: true } })
const emit  = defineEmits(['back'])

const showModal   = ref(false)
const photoIndex  = ref(0)

const DAYS_FULL   = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']
const PERIOD_KEYS = ['mañana', 'tarde', 'noche']
const PERIOD_LABELS = { mañana: 'Mañana', tarde: 'Tarde', noche: 'Noche' }

// Mock work photos (colored placeholder blocks)
const PHOTO_COLORS = ['#c8e6d8', '#b5d5c5', '#a0c4b4', '#8ab4a4', '#74a494', '#5e9484', '#4d9178']
</script>

<template>
  <div class="view">
    <!-- ── Profile content ──────────────────────────────── -->
    <div class="profile-wrap">

      <!-- Back button -->
      <button class="back-btn" @click="emit('back')">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M12 4L7 9L12 14" stroke="#3a4a5c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Regresar
      </button>

      <!-- Profile header card -->
      <div class="profile-card">
        <div class="profile-avatar">
          <div class="avatar-lg" :class="{ 'avatar-lg--photo': worker.hasPhoto }">
            <span v-if="worker.hasPhoto">CL</span>
          </div>
        </div>

        <div class="profile-info">
          <div class="pname-row">
            <h2 class="pname">{{ worker.name }}</h2>
            <span v-if="worker.verified" class="badge-check">✓</span>
          </div>
          <p class="prole">{{ worker.role }}</p>

          <div class="pstat">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="#00b272" stroke-width="1.2"/>
              <path d="M4 6.5h5M6.5 4v5" stroke="#00b272" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
            <span>{{ worker.services }} Limpiezas realizadas</span>
          </div>
          <div class="pstat">
            <span class="prate">⭐ {{ worker.rating }}</span>
            <span class="muted">({{ worker.reviews }} reseñas)</span>
          </div>
          <p class="pprice">S/.{{ worker.price }}.00 x hora</p>
        </div>

        <div class="profile-actions">
          <button class="btn-message">Enviar Mensaje</button>
          <button class="btn-hire" @click="showModal = true">Contratar</button>
        </div>
      </div>

      <!-- ── About me ──────────────────────────────────────── -->
      <section class="section">
        <h3 class="section-title">Acerca de mi</h3>
        <p class="section-text">{{ worker.bio }}</p>
      </section>

      <!-- ── Skills ────────────────────────────────────────── -->
      <section v-if="worker.skills?.length" class="section">
        <h3 class="section-title">Habilidades y experiencia</h3>
        <p v-for="(skill, i) in worker.skills" :key="i" class="section-text">{{ skill }}</p>
      </section>

      <!-- ── Availability ───────────────────────────────────── -->
      <section class="section">
        <h3 class="section-title">Disponibilidad</h3>
        <div class="avail-grid">
          <div class="grid-header">
            <span class="period-col" />
            <span v-for="d in DAYS_FULL" :key="d" class="day-col">{{ d }}</span>
          </div>
          <div v-for="pk in PERIOD_KEYS" :key="pk" class="grid-row">
            <span class="period-col period-name">{{ PERIOD_LABELS[pk] }}</span>
            <div
              v-for="(avail, di) in worker.availability[pk]"
              :key="di"
              class="avail-dot"
              :class="avail ? 'avail-dot--on' : 'avail-dot--off'"
            >
              <span>{{ avail ? '✓' : '✕' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Work photos ────────────────────────────────────── -->
      <section class="section">
        <h3 class="section-title">Fotos del trabajo:</h3>
        <div class="photos-strip">
          <button class="arrow-btn arrow-left" :disabled="photoIndex === 0" @click="photoIndex--">‹</button>
          <div class="photos-row">
            <div
              v-for="(color, i) in PHOTO_COLORS.slice(photoIndex, photoIndex + 4)"
              :key="i"
              class="photo-thumb"
              :style="{ background: color }"
            />
          </div>
          <button class="arrow-btn arrow-right" :disabled="photoIndex + 4 >= PHOTO_COLORS.length" @click="photoIndex++">›</button>
        </div>
      </section>

      <!-- ── Reviews ────────────────────────────────────────── -->
      <section class="section">
        <h3 class="section-title">Comentarios:</h3>
        <div v-for="(c, i) in worker.comments" :key="i" class="review-card">
          <div class="reviewer-avatar">{{ c.author.charAt(0) }}</div>
          <div class="review-body">
            <div class="reviewer-name">{{ c.author }}</div>
            <div class="reviewer-date">{{ c.date }}</div>
            <div class="stars">
              <span v-for="s in 5" :key="s" class="star" :class="{ active: s <= Math.round(c.rating) }">★</span>
              {{ c.rating }}/5
            </div>
            <p class="review-text">{{ c.text }}</p>
          </div>
        </div>
      </section>

    </div>

    <!-- ── Booking Modal ─────────────────────────────────── -->
    <BookingModal
      v-if="showModal"
      :worker="worker"
      @close="showModal = false"
      @confirmed="showModal = false"
    />
  </div>
</template>

<style scoped>
/* ── tokens ──────────────────────────────────────────────── */
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

/* ── profile layout ──────────────────────────────────────── */
.profile-wrap {
  width: 100%;
  padding: 1rem;
}

/* ── back button ─────────────────────────────────────────── */
.back-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text);
  margin-bottom: 1rem;
  padding: 0;
  font-family: 'Inter', system-ui, sans-serif;
}
.back-btn:hover { color: var(--navy); }

/* ── profile card ────────────────────────────────────────── */
.profile-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 12px rgba(26,46,74,.06);
}

.avatar-lg {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text-light);
  flex-shrink: 0;
}
.avatar-lg--photo {
  background: linear-gradient(135deg, #7dbea0, #4d9178);
  color: var(--white);
}

.profile-info { flex: 1; min-width: 0; }
.pname-row { display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.1rem; }
.pname {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--navy);
  margin: 0;
}
.badge-check {
  background: var(--green);
  color: var(--white);
  border-radius: 50%;
  width: 17px;
  height: 17px;
  font-size: 0.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.prole { font-size: 0.82rem; color: var(--text-light); margin: 0 0 0.3rem; }
.pstat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  color: var(--text);
  margin-bottom: 0.2rem;
}
.prate { font-weight: 600; }
.muted { color: var(--text-light); }
.pprice {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--navy);
  margin: 0.2rem 0 0;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
}
.btn-message {
  border: 1.5px solid var(--green);
  background: transparent;
  color: var(--green);
  border-radius: 8px;
  padding: 0.45rem 0.875rem;
  font-size: 0.83rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  white-space: nowrap;
  transition: background 0.15s;
}
.btn-message:hover { background: var(--green-light); }

.btn-hire {
  background: var(--green);
  color: var(--white);
  border: none;
  border-radius: 8px;
  padding: 0.45rem 0.875rem;
  font-size: 0.83rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  white-space: nowrap;
  transition: background 0.15s;
}
.btn-hire:hover { background: var(--green-dark); }

/* ── sections ────────────────────────────────────────────── */
.section {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.1rem 1.25rem;
  margin-bottom: 0.875rem;
}
.section-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--navy);
  margin: 0 0 0.6rem;
}
.section-text {
  font-size: 0.875rem;
  color: var(--text);
  line-height: 1.6;
  margin: 0 0 0.5rem;
}
.section-text:last-child { margin-bottom: 0; }

/* ── availability grid ───────────────────────────────────── */
.avail-grid {}
.grid-header, .grid-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.35rem;
}
.period-col { width: 56px; flex-shrink: 0; }
.day-col {
  width: 28px;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-light);
}
.period-name { font-size: 0.8rem; color: var(--text); }

.avail-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
}
.avail-dot--on  { background: var(--green); color: var(--white); }
.avail-dot--off { background: var(--border); color: var(--text-light); }

/* ── photos ──────────────────────────────────────────────── */
.photos-strip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.photos-row {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  overflow: hidden;
}
.photo-thumb {
  width: 100px;
  height: 80px;
  border-radius: var(--radius);
  flex-shrink: 0;
}
.arrow-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--white);
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  flex-shrink: 0;
  transition: background 0.15s;
}
.arrow-btn:hover:not(:disabled) { background: var(--green-light); }
.arrow-btn:disabled { opacity: 0.35; cursor: not-allowed; }

/* ── reviews ─────────────────────────────────────────────── */
.review-card {
  display: flex;
  gap: 0.75rem;
  padding: 0.875rem 0;
  border-top: 1px solid var(--border);
}
.review-card:first-of-type { border-top: none; padding-top: 0; }

.reviewer-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-light);
  flex-shrink: 0;
}
.review-body { flex: 1; }
.reviewer-name { font-weight: 600; font-size: 0.875rem; color: var(--navy); }
.reviewer-date { font-size: 0.75rem; color: var(--text-light); margin-bottom: 0.2rem; }
.stars { display: flex; align-items: center; gap: 0.1rem; font-size: 0.78rem; color: var(--text-light); margin-bottom: 0.25rem; }
.star { color: var(--border); }
.star.active { color: #f5a623; }
.review-text { font-size: 0.82rem; color: var(--text); line-height: 1.5; margin: 0; }
</style>
