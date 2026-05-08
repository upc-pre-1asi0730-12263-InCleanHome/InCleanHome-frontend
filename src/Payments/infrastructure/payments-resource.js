import { Payment } from '../domain/model/payments-entity';

export class PaymentsResource {
  static toEntity(apiData) {
    return new Payment(
      apiData.id,
      apiData.booking_id,
      apiData.total_amount,
      new Date(apiData.transaction_date).toLocaleDateString(),
      apiData.payment_method,
      apiData.status
    );
  }

  static toApi(entity) {
    return {
      booking_id: entity.bookingId,
      amount: entity.amount,
      method: entity.method
    };
  }
}