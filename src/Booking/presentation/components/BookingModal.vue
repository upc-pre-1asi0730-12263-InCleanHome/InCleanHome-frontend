<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ worker: { type: Object, required: true } })
const emit  = defineEmits(['close', 'confirmed'])

// ── State ──────────────────────────────────────────────────────────
const step = ref(1)

// Step 1 – day/time selection
const DAYS_FULL  = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']
const PERIOD_KEYS = ['mañana', 'tarde', 'noche']
const PERIOD_LABELS = { mañana: 'Mañana', tarde: 'Tarde', noche: 'Noche' }
const REF_SCHEDULES = { mañana: '8:00 am – 12:00 p.m.', tarde: '12:00 pm – 7:00 p.m.', noche: '7:00 pm – 10:00 p.m.' }

const selectedSlot = ref(null) // { period, dayIndex }

function selectSlot(period, dayIdx) {
  const w = props.worker.availability
  if (!w[period][dayIdx]) return
  selectedSlot.value = { period, dayIdx }
}

function isSelected(period, dayIdx) {
  return selectedSlot.value?.period === period && selectedSlot.value?.dayIdx === dayIdx
}

// Step 2 – location
const address     = ref('')
const useLocation = ref(false)
const reference   = ref('')
const confirmedAddress = ref('')

function confirmAddress() {
  if (address.value.trim()) {
    confirmedAddress.value = address.value.trim()
  }
}

// Step 3 – payment
const PAYMENT_OPTIONS = ['Tarjeta', 'Yape', 'Efectivo']
const paymentMethod = ref('')

// ── Navigation ─────────────────────────────────────────────────────
const canContinue = computed(() => {
  if (step.value === 1) return selectedSlot.value !== null
  if (step.value === 2) return address.value.trim().length > 0
  if (step.value === 3) return paymentMethod.value !== ''
  return true
})

function next() {
  if (step.value === 3) { step.value = 4; return }
  if (step.value === 4) { step.value = 5; return }
  if (step.value < 5) step.value++
}

function back() {
  if (step.value > 1) step.value--
  else emit('close')
}

function finish() {
  emit('confirmed')
  emit('close')
}

// ── Helpers ────────────────────────────────────────────────────────
function slotState(period, dayIdx) {
  const available = props.worker.availability[period]?.[dayIdx]
  if (!available) return 'unavailable'
  if (isSelected(period, dayIdx)) return 'selected'
  return 'available'
}

const selectedDayLabel = computed(() => {
  if (!selectedSlot.value) return ''
  return DAYS_FULL[selectedSlot.value.dayIdx]
})
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click.self="emit('close')">
      <div class="modal" role="dialog" aria-modal="true">

        <!-- ── STEP 1: Day / Time ─────────────────────────── -->
        <div v-if="step === 1" class="step-layout">
          <div class="step-main">
            <button class="back-btn" @click="back()">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="#3a4a5c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Regresar
            </button>
            <h2 class="step-title">Elija el Día y hora del servicio:</h2>

            <div class="worker-hint">
              <div class="mini-avatar">{{ worker.name.charAt(0) }}</div>
              <span class="hint-text">Disponibilidad de {{ worker.name }}</span>
            </div>

            <div class="avail-grid">
              <div class="grid-header">
                <span class="period-col" />
                <span v-for="d in DAYS_FULL" :key="d" class="day-col">{{ d }}</span>
              </div>
              <div v-for="pk in PERIOD_KEYS" :key="pk" class="grid-row">
                <span class="period-col period-name">{{ PERIOD_LABELS[pk] }}</span>
                <button
                  v-for="(_, di) in DAYS_FULL"
                  :key="di"
                  class="slot-btn"
                  :class="slotState(pk, di)"
                  :disabled="slotState(pk, di) === 'unavailable'"
                  @click="selectSlot(pk, di)"
                >
                  <span v-if="slotState(pk, di) === 'unavailable'">✕</span>
                  <span v-else-if="slotState(pk, di) === 'selected'">✓</span>
                  <span v-else>✓</span>
                </button>
              </div>
            </div>

            <p v-if="selectedSlot" class="selection-note">
              Se seleccionó <b>{{ selectedDayLabel }}</b> de la semana
            </p>
          </div>

          <aside class="step-side">
            <h4 class="side-title">Horarios referenciales:</h4>
            <ul class="ref-list">
              <li v-for="pk in PERIOD_KEYS" :key="pk">
                <b>{{ PERIOD_LABELS[pk] }}</b>: {{ REF_SCHEDULES[pk] }}
              </li>
            </ul>
            <hr class="side-divider" />
            <p class="side-note">
              Nota: La trabajadora podrá tardar hasta 3 horas en aceptar la solicitud. Durante este periodo, se podrán realizar otras solicitudes en el mismo horario y dirección para recibir una respuesta.
            </p>
          </aside>
        </div>

        <!-- ── STEP 2: Location ───────────────────────────── -->
        <div v-else-if="step === 2" class="step-single">
          <button class="back-btn" @click="back()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="#3a4a5c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Regresar
          </button>
          <h2 class="step-title">Elija la ubicación del servicio:</h2>

          <input
            v-model="address"
            class="field-input"
            placeholder="Escribir Ubicación"
            @input="confirmedAddress = ''"
            @blur="confirmAddress"
          />

          <label class="checkbox-row">
            <input v-model="useLocation" type="checkbox" class="checkbox" />
            Usar mi ubicación actual
          </label>

          <p class="field-label-sm">Referencia (opcional)</p>
          <input v-model="reference" class="field-input" placeholder="Escribir Ubicación" />

          <p v-if="confirmedAddress" class="selection-note">
            Se seleccionó: <b>{{ confirmedAddress }}</b>
          </p>
        </div>

        <!-- ── STEP 3: Payment ────────────────────────────── -->
        <div v-else-if="step === 3" class="step-single">
          <h2 class="step-title">Elegir método de pago:</h2>

          <label
            v-for="opt in PAYMENT_OPTIONS"
            :key="opt"
            class="radio-row"
          >
            <input v-model="paymentMethod" type="radio" :value="opt" class="radio" />
            <span>{{ opt }}</span>
          </label>

          <p class="payment-note">
            <b>Nota:</b> El pago se cobrará después del servicio
          </p>

          <p v-if="paymentMethod" class="selection-note">
            Se seleccionó un método de pago: <b>{{ paymentMethod }}</b>
          </p>
        </div>

        <!-- ── STEP 4: Notification sent ──────────────────── -->
        <div v-else-if="step === 4" class="step-center">
          <div class="icon-circle">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 8c-6.627 0-12 5.373-12 12 0 2.386.698 4.61 1.9 6.482L8 30h8.52A7.99 7.99 0 0020 32c1.49 0 2.88-.408 4.07-1.118H32l-1.9-3.518A11.956 11.956 0 0032 20c0-6.627-5.373-12-12-12Z" fill="white"/>
              <rect x="19" y="14" width="2" height="8" rx="1" fill="#00b272"/>
              <circle cx="20" cy="25" r="1.2" fill="#00b272"/>
            </svg>
          </div>
          <p class="confirm-msg">Tu solicitud ha sido enviada a la trabajadora.</p>
          <p class="confirm-sub">Recibirás una notificación cuando sea aceptada.</p>
          <div class="progress-bar"><div class="progress-fill" /></div>
        </div>

        <!-- ── STEP 5: Confirmed ──────────────────────────── -->
        <div v-else-if="step === 5" class="step-center">
          <div class="icon-broom">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <circle cx="36" cy="36" r="35" stroke="#00b272" stroke-width="2"/>
              <path d="M28 44l8-18 8 18H28Z" stroke="#00b272" stroke-width="2" stroke-linejoin="round"/>
              <path d="M24 44h24" stroke="#00b272" stroke-width="2" stroke-linecap="round"/>
              <path d="M36 26v-8" stroke="#00b272" stroke-width="2" stroke-linecap="round"/>
              <path d="M30 28l-4-4M42 28l4-4" stroke="#00b272" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h3 class="confirm-title">¡Servicio confirmado!</h3>
          <p class="confirm-msg">Tu limpieza ha sido agendada correctamente.</p>
        </div>

        <!-- ── Footer ─────────────────────────────────────── -->
        <div class="modal-footer">
          <button
            v-if="step <= 3"
            class="btn-continue"
            :disabled="!canContinue"
            @click="next"
          >
            {{ step === 3 ? 'Aceptar' : 'Continuar' }}
          </button>
          <button
            v-else
            class="btn-continue"
            @click="step === 5 ? finish() : next()"
          >
            Aceptar
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* ── tokens ──────────────────────────────────────────────── */
.overlay {
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

  position: fixed;
  inset: 0;
  background: rgba(26,46,74,.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

/* ── modal card ──────────────────────────────────────────── */
.modal {
  background: var(--white);
  border-radius: 18px;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(26,46,74,.18);
  display: flex;
  flex-direction: column;
}

/* ── step layouts ────────────────────────────────────────── */
.step-layout {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 1.25rem;
  padding: 1.5rem 1.5rem 0;
}
.step-single {
  padding: 1.5rem 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}
.step-center {
  padding: 2.5rem 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

/* ── back button ─────────────────────────────────────────── */
.back-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text);
  font-family: 'Inter', system-ui, sans-serif;
  padding: 0;
  margin-bottom: 0.5rem;
}
.back-btn:hover { color: var(--navy); }

/* ── titles ──────────────────────────────────────────────── */
.step-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--navy);
  margin: 0 0 0.75rem;
}

/* ── worker hint row ─────────────────────────────────────── */
.worker-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.mini-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7dbea0, #4d9178);
  color: var(--white);
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hint-text { font-size: 0.85rem; color: var(--text); }

/* ── availability grid ───────────────────────────────────── */
.avail-grid { margin-bottom: 0.75rem; }

.grid-header,
.grid-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.3rem;
}

.period-col { width: 54px; flex-shrink: 0; }
.day-col {
  width: 26px;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-light);
}
.period-name { font-size: 0.78rem; color: var(--text); }

/* ── slot buttons ────────────────────────────────────────── */
.slot-btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--bg);
  cursor: pointer;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.15s, border-color 0.15s;
  color: var(--white);
}
.slot-btn.available {
  border-color: #c8e6d8;
  background: #e6f9f2;
  color: var(--green);
}
.slot-btn.available:hover {
  background: var(--green);
  color: var(--white);
}
.slot-btn.selected {
  background: var(--green);
  border-color: var(--green);
  color: var(--white);
}
.slot-btn.unavailable {
  background: var(--border);
  border-color: var(--border);
  color: var(--text-light);
  cursor: not-allowed;
}

/* ── sidebar (step 1) ────────────────────────────────────── */
.step-side {
  border-left: 1px solid var(--border);
  padding-left: 1.1rem;
  padding-top: 2.75rem;
}
.side-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--navy);
  margin: 0 0 0.5rem;
}
.ref-list {
  list-style: none;
  padding: 0;
  margin: 0 0 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.ref-list li { font-size: 0.78rem; color: var(--text); }
.side-divider { border: none; border-top: 1px solid var(--border); margin: 0.5rem 0; }
.side-note {
  font-size: 0.73rem;
  color: var(--text-light);
  line-height: 1.5;
}

/* ── step 2 (location) ───────────────────────────────────── */
.field-input {
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 0.6rem 0.875rem;
  font-size: 0.9rem;
  color: var(--text);
  background: var(--bg);
  outline: none;
  font-family: 'Inter', system-ui, sans-serif;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.field-input:focus { border-color: var(--green); background: var(--white); }

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
}
.checkbox { accent-color: var(--green); cursor: pointer; }
.field-label-sm {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--navy);
  margin: 0;
}

/* ── step 3 (payment) ────────────────────────────────────── */
.radio-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.15rem 0;
}
.radio { accent-color: var(--green); cursor: pointer; width: 16px; height: 16px; }
.payment-note {
  font-size: 0.8rem;
  color: var(--text-light);
  margin-top: 0.25rem;
}

/* ── common ──────────────────────────────────────────────── */
.selection-note {
  font-size: 0.8rem;
  color: var(--text);
  background: var(--green-light);
  border-radius: 8px;
  padding: 0.4rem 0.75rem;
  margin: 0;
}

/* ── step 4 & 5 (icon states) ────────────────────────────── */
.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}
.icon-broom { margin-bottom: 0.5rem; }

.confirm-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--navy);
  margin: 0;
}
.confirm-msg {
  font-size: 0.9rem;
  color: var(--text);
  margin: 0;
  max-width: 280px;
}
.confirm-sub {
  font-size: 0.82rem;
  color: var(--text-light);
  margin: 0;
}

.progress-bar {
  width: 200px;
  height: 4px;
  background: var(--border);
  border-radius: 4px;
  margin-top: 0.5rem;
  overflow: hidden;
}
.progress-fill {
  width: 60%;
  height: 100%;
  background: var(--green);
  border-radius: 4px;
  animation: pulse-progress 1.8s ease-in-out infinite;
}
@keyframes pulse-progress {
  0%, 100% { width: 30%; }
  50%       { width: 80%; }
}

/* ── footer ──────────────────────────────────────────────── */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border);
  margin-top: 1.25rem;
}
.btn-continue {
  background: var(--green);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  padding: 0.55rem 1.5rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-continue:hover:not(:disabled) { background: var(--green-dark); }
.btn-continue:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
