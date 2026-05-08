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
    },

    async addPayment(paymentData) {
      this.loading = true;
      try {
        // 1. Enviamos al API (falso backend)
        const response = await apiService.createPayment(paymentData);
        
        // 2. Convertimos la respuesta del API a una Entidad de nuestro dominio
        const newEntity = PaymentsResource.toEntity(response.data);
        
        // 3. Lo agregamos localmente a la lista para que la tabla se actualice al instante
        this.payments.push(newEntity);
        
        return true; // Para avisar al componente que todo salió bien
      } catch (error) {
        this.error = "No se pudo registrar el pago";
        return false;
      } finally {
        this.loading = false;
      }
    }


  }
});