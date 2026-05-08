<template>
  <div class="dashboard-container">
    <header class="panel-header">
      <div class="welcome-section">
        <h1>Historial de Pagos</h1>
        <p>Panel de cliente - InCleanHome</p>
      </div>
      <button class="btn-action">
        <span class="icon">🔍</span> Nuevo Pago
      </button>
    </header>

    <div v-if="store.loading" class="loading-state">
      <p>Cargando información financiera...</p>
    </div>

    <template v-else>
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
        
        <div v-if="!store.loading && store.payments.length === 0" class="empty-state">
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
import { onMounted, computed } from 'vue';
// Importamos el store (asegúrate de que la ruta sea correcta)
import { usePaymentsStore } from '../payments-store';

const store = usePaymentsStore();

// 1. ESTO ES LO QUE FALTA: Ejecutar la carga al entrar a la vista
onMounted(async () => {
  await store.fetchPayments();
});

// 2. Cálculos para que las tarjetas de arriba funcionen
const totalSpent = computed(() => {
  return store.payments.reduce((acc, curr) => acc + curr.amount, 0);
});

const paymentsCompleted = computed(() => {
  return store.payments.filter(p => p.status === 'Completed').length;
});

const paymentsPending = computed(() => {
  return store.payments.filter(p => p.status === 'Pending').length;
});
</script>