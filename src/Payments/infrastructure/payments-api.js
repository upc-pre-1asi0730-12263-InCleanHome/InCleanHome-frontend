export class PaymentsApiService {
  constructor() {
    // Intentamos cargar datos previos del navegador
    const saved = localStorage.getItem('in_clean_home_payments');
    
    // Si existen, los usamos; si no, usamos la lista inicial
    this.mockPayments = saved ? JSON.parse(saved) : [
    ];
  }

  // Método interno para persistir los datos
  _persist() {
    localStorage.setItem('in_clean_home_payments', JSON.stringify(this.mockPayments));
  }

  async getAllPayments() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: this.mockPayments });
      }, 50);
    });
  }

  async createPayment(paymentData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Calculamos el siguiente ID basado en el largo del array o el último ID
        const nextId = this.mockPayments.length > 0 
          ? Math.max(...this.mockPayments.map(p => p.id)) + 1 
          : 1;

        const newPayment = { 
          ...paymentData, 
          id: nextId, // Este es el número correlativo (1, 2, 3...)
          total_amount: parseFloat(paymentData.total_amount)
        };
        
        this.mockPayments.push(newPayment);
        this._persist(); // Guardamos permanentemente en el navegador
        resolve({ data: newPayment });
      }, 50);
    });
  }
}