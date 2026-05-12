<template>
  <div class="dashboard-container">
    <header class="panel-header">
      <h1>Historial de Pagos</h1>
      <button class="btn-action" @click="showForm = true">Nuevo Pago</button>
    </header>

    <NotificationToast 
      :visible="notification.visible" 
      :message="notification.message" 
    />

    <PaymentCreateForm 
      v-if="showForm" 
      @close="showForm = false" 
      @created="handleSave" 
    />

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePaymentsStore } from '../payments-store';
// Importación de los nuevos componentes
import NotificationToast from '/shared/presentation/components/notification-toast.vue';
import PaymentCreateForm from '/src/Payments/presentation/components/payment-form.vue';

const store = usePaymentsStore();
const showForm = ref(false);
const notification = ref({ visible: false, message: '' });

const handleSave = async (payload) => {
  const success = await store.addPayment(payload);
  if (success) {
    showForm.value = false;
    triggerNotification('¡Pago registrado con éxito en InCleanHome!');
  }
};

const triggerNotification = (msg) => {
  notification.value = { visible: true, message: msg };
  setTimeout(() => notification.value.visible = false, 3000);
};

onMounted(() => store.fetchPayments());
</script>