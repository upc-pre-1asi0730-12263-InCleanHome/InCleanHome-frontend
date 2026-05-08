import { defineStore } from 'pinia';
import { PaymentsApiService } from '../infrastructure/payments-api';

const apiService = new PaymentsApiService();

export const usePaymentsStore = defineStore('payments', {
  state: () => ({
    payments: [],
    loading: false
  }),
  actions: {
    async fetchPayments() {
      this.loading = true;
      const response = await apiService.getAll();
      this.payments = response.data;
      this.loading = false;
    }
  }
});