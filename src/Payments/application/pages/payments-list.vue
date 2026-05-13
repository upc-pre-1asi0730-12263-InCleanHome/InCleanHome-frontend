<template>
  <div class="dashboard-container">
    <header class="panel-header">
      <div class="welcome-section">
        <h1>Historial de Pagos</h1>
        <p>Panel de {{ userRole }} - {{ userName }}</p>
      </div>
      <button class="btn-action" @click="showForm = !showForm">
        <span class="icon">🔍</span> {{ showForm ? 'Cancelar' : 'Nuevo Pago' }}
      </button>
    </header>

    <div v-if="store.loading" class="loading-state">
      <p>Cargando información financiera...</p>
    </div>

    <template v-else>
      <Teleport to="body">
        <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
          <div class="modal-content main-content-card">
            <div class="modal-header">
              <h3>Registrar Nuevo Pago</h3>
              <button class="btn-close" @click="showForm = false">&times;</button>
            </div>
            
            <form @submit.prevent="handleCreatePayment" class="new-payment-form">
              <div class="form-group">
                <label>ID de Reserva</label>
                <input v-model="newPayment.booking_id" type="number" placeholder="Ej: 101" required />
              </div>
              
              <div class="form-group">
                <label>Monto Total (S/)</label>
                <input v-model="newPayment.total_amount" type="number" step="0.01" placeholder="0.00" required />
              </div>

              <div class="form-group">
                <label>Fecha de Transacción</label>
                <input v-model="newPayment.transaction_date" type="date" required />
              </div>
              
              <div class="form-group">
                <label>Método de Pago</label>
                <select v-model="newPayment.payment_method">
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Yape">Yape</option>
                </select>
              </div>

              <div class="form-group">
                <label>Estado del Pago</label>
                <select v-model="newPayment.status">
                  <option value="Completed">Completado</option>
                  <option value="Pending">Pendiente</option>
                  <option value="Cancelled">Cancelado</option>
                </select>
              </div>

              <div class="modal-actions">
                <button type="button" class="btn-secondary" @click="showForm = false">Cancelar</button>
                <button type="submit" class="btn-action">Guardar Pago</button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>


      <Transition name="fade">
        <div v-if="notificationVisible" class="custom-toast">
          <span class="icon">✅</span>
          <p>¡Pago registrado con éxito en InCleanHome!</p>
        </div>
      </Transition>

      <section class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Total pagos</span>
          <div class="stat-value">{{ store.payments.length }}</div>
        </div>
        <div class="stat-card">
          <span class="stat-label">Exitosos</span>
          <div class="stat-value text-success">{{ paymentsCompleted }}</div>
        </div>
        <div class="stat-card">
          <span class="stat-label">Pendientes</span>
          <div class="stat-value text-warning">{{ paymentsPending }}</div>
        </div>
        <div class="stat-card">
          <span class="stat-label">Total gastado</span>
          <div class="stat-value font-bold">S/ {{ totalSpent.toFixed(2) }}</div>
        </div>
      </section>

      <section class="main-content-card">
        <h3>Transacciones recientes</h3>
        
        <div v-if="store.payments.length === 0" class="empty-state">
          <div class="empty-icon">💳</div>
          <p>No se encontraron transacciones en tu historial.</p>
        </div>

        <div v-else class="table-responsive">
          <table class="payments-table">
            <thead>
              <tr>
                <th>ID Reserva</th>
                <th>Fecha</th>
                <th>Método</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in store.payments" :key="payment.id">
                <td>#{{ payment.bookingId }}</td>
                <td>{{ payment.date }}</td>
                <td>{{ payment.method }}</td>
                <td class="font-bold">S/ {{ payment.amount.toFixed(2) }}</td>
                <td>
                  <span :class="['status-pill', payment.status ? payment.status.toLowerCase() : '']">
                    {{ payment.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { usePaymentsStore } from '../payments-store';

//import { useAuthStore } from '@/User-Management/application/auth-store';

const store = usePaymentsStore();
const showForm = ref(false);
//const authStore = useAuthStore(); // 2. Inicializa el store de usuario


// 3. Usa el nombre del usuario logueado
//const userName = computed(() => authStore.currentUser?.name || 'Usuario');
//const userRole = computed(() => authStore.currentUser?.role === 'worker' ? 'Trabajadora' : 'Cliente');


// Datos iniciales para el formulario
const newPayment = ref({
  booking_id: '',
  total_amount: '',
  payment_method: 'Visa',
  transaction_date: new Date().toISOString(),
  transaction_date: new Date().toISOString().substr(0, 10), // Fecha de hoy en formato YYYY-MM-DD
  status: 'Completed'
});

const notificationVisible = ref(false); // Nueva variable de estado

// Función para crear el pago
const handleCreatePayment = async () => {
  const success = await store.addPayment(newPayment.value);
  if (success) {
    showForm.value = false;
    
    // REEMPLAZO DEL ALERT:
    notificationVisible.value = true;
    
    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
      notificationVisible.value = false;
    }, 3000);

    newPayment.value = { 
      booking_id: '', 
      total_amount: '', 
      payment_method: 'Visa',
      transaction_date: new Date().toISOString(),
      status: 'Completed' 
    };
    showForm.value = false;
    alert("¡Pago registrado con éxito!");
  }
};

// Carga inicial de datos
onMounted(async () => {
  await store.fetchPayments();
});

// Propiedades computadas para las estadísticas
const totalSpent = computed(() => {
  return store.payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);
});

const paymentsCompleted = computed(() => {
  return store.payments.filter(p => p.status === 'Completed').length;
});

const paymentsPending = computed(() => {
  return store.payments.filter(p => p.status === 'Pending').length;
});
</script>