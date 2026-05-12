<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content main-content-card">
        <div class="modal-header">
          <h3>Registrar Nuevo Pago</h3>
          <button class="btn-close" @click="$emit('close')">&times;</button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="new-payment-form">
          <div class="form-group">
            <label>Monto Total (S/)</label>
            <input v-model="form.total_amount" type="number" step="0.01" required />
          </div>
          <div class="form-group">
            <label>Fecha</label>
            <input v-model="form.transaction_date" type="date" required />
          </div>
          <div class="form-group">
            <label>Método</label>
            <select v-model="form.payment_method">
              <option value="Visa">Visa</option>
              <option value="Yape">Yape</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" @click="$emit('close')">Cancelar</button>
            <button type="submit" class="btn-action">Guardar Pago</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['close', 'created']);

const form = ref({
  total_amount: '',
  payment_method: 'Visa',
  transaction_date: new Date().toISOString().substr(0, 10),
  status: 'Completed'
});

const handleSubmit = () => {
  emit('created', { ...form.ref }); // Enviamos los datos al padre
};
</script>