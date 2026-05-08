import { Payment } from '../domain/model/payments-entity';

export class PaymentsAssembler {
  static toEntity(apiData) {
    return new Payment(
      apiData.id || Date.now(),
      apiData.booking_id,
      parseFloat(apiData.total_amount || 0),
      apiData.transaction_date, // Viene del input tipo date
      apiData.payment_method,
      apiData.status || 'Completed'
    );
  }

  // ESTO ES VITAL para que fetchPayments funcione
  static toEntityList(apiDataList) {
    if (!Array.isArray(apiDataList)) return [];
    return apiDataList.map(item => this.toEntity(item));
  }
}