// src/Payments/infrastructure/payments-api.js

export class PaymentsApiService {
  // Simulamos una base de datos local
  constructor() {
    this.mockPayments = [
      {
        id: 1,
        booking_id: 101,
        total_amount: 150.00,
        transaction_date: "2026-05-01T10:00:00Z",
        payment_method: "Visa",
        status: "Completed"
      },
      {
        id: 2,
        booking_id: 105,
        total_amount: 85.50,
        transaction_date: "2026-05-05T15:30:00Z",
        payment_method: "Mastercard",
        status: "Pending"
      },
      {
        id: 3,
        booking_id: 110,
        total_amount: 200.00,
        transaction_date: "2026-05-07T09:15:00Z",
        payment_method: "Yape",
        status: "Completed"
      }
    ];
  }

  async getAllPayments() {
    // Simulamos un retraso de red de 1 segundo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: this.mockPayments });
      }, 1000);
    });
  }

  async createPayment(paymentData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPayment = { ...paymentData, id: Math.random() };
        this.mockPayments.push(newPayment);
        resolve({ data: newPayment });
      }, 800);
    });
  }
}