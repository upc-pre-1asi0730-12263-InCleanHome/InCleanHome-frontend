// src/Payments/application/payments-store.js
import { defineStore } from 'pinia';
import { PaymentsApiService } from '../infrastructure/payments-api';
import { PaymentsAssembler } from '../infrastructure/payments-assembler'; // <--- Verifica que el archivo se llame así exactamente

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
        // Aquí ocurre la magia: transformamos el JSON del falso backend a Entidades
        this.payments = PaymentsAssembler.toEntityList(response.data);
        console.log("¡Datos cargados!", this.payments); 
      } catch (error) {
        this.error = "Error al conectar con el servidor";
        console.error("Fallo en el Store:", error);
      } finally {
        this.loading = false;
      }
    }
  }
});