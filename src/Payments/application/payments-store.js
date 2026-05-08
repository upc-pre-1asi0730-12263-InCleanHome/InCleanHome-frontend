import { defineStore } from 'pinia';
import { PaymentsApiService } from '../infrastructure/payments-api';
// Importamos el Resource pero le damos el alias Assembler para que coincida con tus acciones
import { PaymentsResource as PaymentsAssembler } from '../infrastructure/payments-resource'; 

const apiService = new PaymentsApiService();

export const usePaymentsStore = defineStore('payments', {
  state: () => ({
    payments: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchPayments() {
      this.loading = true;
      try {
        const response = await apiService.getAllPayments();
        // Ahora toEntityList ya existe en el Resource
        this.payments = PaymentsAssembler.toEntityList(response.data);
      } catch (error) {
        this.error = "Error al cargar datos locales";
      } finally {
        this.loading = false;
      }
    },

    async addPayment(paymentData) {
      this.loading = true;
      try {
        const response = await apiService.createPayment(paymentData);
        const newEntity = PaymentsAssembler.toEntity(response.data);
        this.payments.push(newEntity); 
        return true;
      } catch (error) {
        console.error("Error al guardar localmente:", error);
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
});