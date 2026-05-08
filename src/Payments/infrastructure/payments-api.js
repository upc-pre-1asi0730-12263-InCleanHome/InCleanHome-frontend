import axios from 'axios';

const http = axios.create({
  baseURL: 'https://tu-api.com/api/v1' 
});

export class PaymentsApiService {
  getAll() {
    return http.get('/payments');
  }
  create(paymentData) {
    return http.post('/payments', paymentData);
  }
}