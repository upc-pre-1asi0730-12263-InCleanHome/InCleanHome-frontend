export class Payment {
  constructor(id, bookingId, amount, date, method, status) {
    this.id = id;
    this.bookingId = bookingId; // ID de la reserva asociada
    this.amount = amount;
    this.date = date;
    this.method = method; // Ej: 'Visa', 'Mastercard', 'Yape'
    this.status = status; // Ej: 'Completed', 'Pending'
  }
}