<script setup>
import { ref, onMounted } from 'vue'
import { useBookingStore } from '@/Booking/application/booking-store'

const store = useBookingStore()
const showForm = ref(false)

const newBooking = ref({
  client_id: 1,
  worker_id: '',
  worker_name: '',
  date: '',
  start_time: '',
  end_time: '',
  status: 'Pending',
  instructions: '',
  total_amount: 0
})

const statusLabels = {
  Pending: 'Pendiente',
  Confirmed: 'Confirmada',
  Cancelled: 'Cancelada',
  Completed: 'Completada'
}

const statusClass = {
  Pending: 'badge-pending',
  Confirmed: 'badge-confirmed',
  Cancelled: 'badge-cancelled',
  Completed: 'badge-completed'
}

onMounted(() => store.fetchBookings())

async function handleCreate() {
  const success = await store.addBooking({ ...newBooking.value })
  if (success) {
    showForm.value = false
    newBooking.value = {
      client_id: 1, worker_id: '', worker_name: '',
      date: '', start_time: '', end_time: '',
      status: 'Pending', instructions: '', total_amount: 0
    }
  }
}

async function handleCancel(id) {
  await store.cancelBooking(id)
}
</script>

<template>
  <div class="booking-container">
    <header class="panel-header">
      <div class="welcome-section">
        <h1>Mis Reservas</h1>
        <p>Gestiona tus servicios de limpieza programados</p>
      </div>
      <button class="btn-action" @click="showForm = !showForm">
        <span class="icon">📅</span> {{ showForm ? 'Cancelar' : 'Nueva Reserva' }}
      </button>
    </header>

    <div v-if="store.loading" class="loading-state">
      <p>Cargando reservas...</p>
    </div>

    <template v-else>
      <Teleport to="body">
        <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Nueva Reserva</h3>
              <button class="btn-close" @click="showForm = false">&times;</button>
            </div>
            <form @submit.prevent="handleCreate" class="booking-form">
              <div class="form-group">
                <label>Nombre del profesional</label>
                <input v-model="newBooking.worker_name" type="text" placeholder="Ej: María López" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Fecha del servicio</label>
                  <input v-model="newBooking.date" type="date" required />
                </div>
                <div class="form-group">
                  <label>Monto total (S/)</label>
                  <input v-model="newBooking.total_amount" type="number" step="0.01" min="0" placeholder="0.00" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Hora inicio</label>
                  <input v-model="newBooking.start_time" type="time" required />
                </div>
                <div class="form-group">
                  <label>Hora fin</label>
                  <input v-model="newBooking.end_time" type="time" required />
                </div>
              </div>
              <div class="form-group">
                <label>Instrucciones adicionales</label>
                <textarea v-model="newBooking.instructions" rows="3"
                  placeholder="Cualquier solicitud especial para el profesional..."></textarea>
              </div>
              <div class="modal-actions">
                <button type="button" class="btn-secondary" @click="showForm = false">Cancelar</button>
                <button type="submit" class="btn-primary">Confirmar Reserva</button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>

      <div v-if="store.bookings.length === 0" class="empty-state">
        <p>📅 No tienes reservas aún.</p>
        <p>Haz clic en <strong>Nueva Reserva</strong> para comenzar.</p>
      </div>

      <div v-else class="bookings-grid">
        <div v-for="booking in store.bookings" :key="booking.id" class="booking-card">
          <div class="card-header">
            <div class="worker-info">
              <span class="worker-avatar">👤</span>
              <div>
                <strong>{{ booking.workerName }}</strong>
                <p class="card-date">{{ booking.date }} · {{ booking.startTime }} – {{ booking.endTime }}</p>
              </div>
            </div>
            <span :class="['badge', statusClass[booking.status]]">
              {{ statusLabels[booking.status] || booking.status }}
            </span>
          </div>

          <div v-if="booking.instructions" class="card-instructions">
            <span class="label">Notas:</span> {{ booking.instructions }}
          </div>

          <div class="card-footer">
            <span class="amount">S/ {{ booking.totalAmount.toFixed(2) }}</span>
            <button
              v-if="booking.status === 'Pending' || booking.status === 'Confirmed'"
              class="btn-cancel"
              @click="handleCancel(booking.id)"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.booking-container {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.panel-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a2e4a;
}

.panel-header p {
  color: #64748b;
  margin-top: 0.25rem;
}

.btn-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #00b272;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.65rem 1.25rem;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.btn-action:hover { background: #009960; }

.loading-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  font-size: 1.1rem;
  line-height: 2;
}

.bookings-grid {
  display: grid;
  gap: 1.25rem;
}

.booking-card {
  background: white;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.worker-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.worker-avatar {
  font-size: 1.75rem;
  background: #e8f5f0;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.worker-info strong {
  display: block;
  color: #1a2e4a;
  font-size: 1rem;
}

.card-date {
  color: #64748b;
  font-size: 0.85rem;
  margin-top: 2px;
}

.badge {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
}

.badge-pending   { background: #fef3c7; color: #92400e; }
.badge-confirmed { background: #d1fae5; color: #065f46; }
.badge-cancelled { background: #fee2e2; color: #991b1b; }
.badge-completed { background: #dbeafe; color: #1e40af; }

.card-instructions {
  font-size: 0.875rem;
  color: #475569;
  background: #f8fafc;
  border-radius: 8px;
  padding: 0.6rem 0.9rem;
}

.card-instructions .label {
  font-weight: 600;
  color: #334155;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.amount {
  font-weight: 700;
  font-size: 1.1rem;
  color: #00b272;
}

.btn-cancel {
  background: transparent;
  border: 1.5px solid #f87171;
  color: #ef4444;
  border-radius: 8px;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #fee2e2;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a2e4a;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #94a3b8;
  line-height: 1;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group textarea,
.form-group select {
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.6rem 0.85rem;
  font-size: 0.9rem;
  color: #1a2e4a;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #00b272;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn-secondary {
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1.25rem;
  color: #475569;
  font-weight: 600;
}

.btn-primary {
  background: #00b272;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1.25rem;
  color: white;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-primary:hover { background: #009960; }
</style>
