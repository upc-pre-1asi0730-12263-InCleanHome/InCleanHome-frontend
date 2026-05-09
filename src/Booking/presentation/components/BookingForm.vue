<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const HOURLY_RATE = 25

const form = ref({
  date: '',
  startTime: '',
  endTime: '',
  instructions: ''
})

const timeSlots = (() => {
  const slots = []
  for (let h = 7; h <= 22; h++) {
    for (const m of [0, 30]) {
      if (h === 22 && m === 30) break
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
  }
  return slots
})()

const endTimeSlots = computed(() =>
  form.value.startTime
    ? timeSlots.filter(slot => slot > form.value.startTime)
    : timeSlots
)

const durationHours = computed(() => {
  if (!form.value.startTime || !form.value.endTime) return 0
  const [sh, sm] = form.value.startTime.split(':').map(Number)
  const [eh, em] = form.value.endTime.split(':').map(Number)
  const minutes = (eh * 60 + em) - (sh * 60 + sm)
  return minutes > 0 ? +(minutes / 60).toFixed(1) : 0
})

const totalCost = computed(() => (durationHours.value * HOURLY_RATE).toFixed(2))

const isValid = computed(() =>
  form.value.date && form.value.startTime && form.value.endTime && durationHours.value > 0
)

const todayISO = new Date().toISOString().split('T')[0]

function handleSubmit() {
  if (!isValid.value) return
  // dispatch to booking-store
}
</script>

<template>
  <div class="booking-card">
    <header class="booking-header">
      <h2 class="booking-title">{{ t('booking.title') }}</h2>
      <p class="booking-subtitle">{{ t('booking.subtitle') }}</p>
    </header>

    <form class="booking-form" @submit.prevent="handleSubmit" novalidate>
      <!-- Date -->
      <div class="field">
        <label class="field-label" for="booking-date">
          {{ t('booking.date.label') }}
        </label>
        <input
          id="booking-date"
          v-model="form.date"
          type="date"
          class="field-input"
          :min="todayISO"
        />
      </div>

      <!-- Time row -->
      <div class="field-row">
        <div class="field">
          <label class="field-label" for="booking-start">
            {{ t('booking.startTime.label') }}
          </label>
          <select id="booking-start" v-model="form.startTime" class="field-input">
            <option value="" disabled>{{ t('booking.startTime.placeholder') }}</option>
            <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }}</option>
          </select>
        </div>

        <div class="field">
          <label class="field-label" for="booking-end">
            {{ t('booking.endTime.label') }}
          </label>
          <select
            id="booking-end"
            v-model="form.endTime"
            class="field-input"
            :disabled="!form.startTime"
          >
            <option value="" disabled>{{ t('booking.endTime.placeholder') }}</option>
            <option v-for="slot in endTimeSlots" :key="slot" :value="slot">{{ slot }}</option>
          </select>
        </div>
      </div>

      <!-- Additional instructions -->
      <div class="field">
        <label class="field-label" for="booking-instructions">
          {{ t('booking.instructions.label') }}
        </label>
        <textarea
          id="booking-instructions"
          v-model="form.instructions"
          class="field-input field-textarea"
          rows="3"
          :placeholder="t('booking.instructions.placeholder')"
        />
      </div>

      <!-- Cost summary -->
      <Transition name="fade">
        <div v-if="durationHours > 0" class="cost-summary">
          <h3 class="summary-title">{{ t('booking.summary.title') }}</h3>
          <div class="summary-row">
            <span>{{ t('booking.summary.duration') }}</span>
            <span class="summary-value">{{ durationHours }}h</span>
          </div>
          <div class="summary-row">
            <span>{{ t('booking.summary.rate') }}</span>
            <span class="summary-value">${{ HOURLY_RATE }}/h</span>
          </div>
          <div class="summary-divider" />
          <div class="summary-row summary-total">
            <span>{{ t('booking.summary.total') }}</span>
            <span class="summary-value total-amount">${{ totalCost }}</span>
          </div>
        </div>
      </Transition>

      <!-- CTA -->
      <button type="submit" class="btn-primary" :disabled="!isValid">
        {{ t('booking.submit') }}
      </button>
    </form>
  </div>
</template>

<style scoped>
/* ── Design tokens ─────────────────────────────────────── */
.booking-card {
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
}

/* ── Card container ────────────────────────────────────── */
.booking-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 24px rgba(26, 46, 74, 0.08);
  padding: 2rem;
  max-width: 560px;
  width: 100%;
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--text);
}

/* ── Header ────────────────────────────────────────────── */
.booking-header { margin-bottom: 1.75rem; }

.booking-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--navy);
  margin: 0 0 0.25rem;
}

.booking-subtitle {
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0;
}

/* ── Form layout ───────────────────────────────────────── */
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1;
}

/* ── Labels ────────────────────────────────────────────── */
.field-label {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--navy);
}

/* ── Inputs ────────────────────────────────────────────── */
.field-input {
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 0.65rem 0.875rem;
  font-size: 0.9375rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--text);
  background: var(--bg);
  outline: none;
  transition: border-color 0.18s, background 0.18s;
  width: 100%;
  box-sizing: border-box;
  appearance: none;
}

.field-input:focus {
  border-color: var(--green);
  background: var(--white);
}

.field-input:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.field-textarea {
  resize: vertical;
  min-height: 80px;
  line-height: 1.5;
}

/* ── Cost summary ──────────────────────────────────────── */
.cost-summary {
  background: var(--green-light);
  border-radius: var(--radius);
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.summary-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--navy);
  margin: 0 0 0.25rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text);
}

.summary-value {
  font-weight: 600;
  color: var(--navy);
}

.summary-divider {
  height: 1px;
  background: rgba(0, 178, 114, 0.2);
}

.summary-total {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
}

.total-amount {
  font-size: 1.125rem;
  color: var(--green);
}

/* ── CTA button ────────────────────────────────────────── */
.btn-primary {
  background: var(--green);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  padding: 0.875rem 1.5rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.18s, transform 0.1s;
  margin-top: 0.25rem;
}

.btn-primary:hover:not(:disabled) { background: var(--green-dark); }
.btn-primary:active:not(:disabled) { transform: scale(0.985); }
.btn-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── Fade transition for cost summary ──────────────────── */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.25s, transform 0.25s; }
.fade-enter-from,
.fade-leave-to    { opacity: 0; transform: translateY(-6px); }
</style>
