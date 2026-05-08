export class Payment {
  constructor(id, amount, currency, status, date) {
    this.id = id;
    this.amount = amount;
    this.currency = currency;
    this.status = status;
    this.date = date;
  }
}