import { Payment } from '../domain/model/payments-entity';

export class PaymentsResource {
  static toEntity(apiData) {
    const dateValue = new Date(apiData.transaction_date);
    const formattedDate = isNaN(dateValue.getTime()) 
      ? apiData.transaction_date 
      : dateValue.toLocaleDateString();

    return new Payment(
      apiData.id, // El ID automático que genera el API
      apiData.id, // Usamos el ID también como booking_id para que se vea en la tabla
      parseFloat(apiData.total_amount || 0),
      formattedDate,
      apiData.payment_method,
      apiData.status || 'Completed'
    );
  }

  // VITAL: Este método permite que fetchPayments funcione al recargar
  static toEntityList(apiDataList) {
    if (!Array.isArray(apiDataList)) return [];
    return apiDataList.map(item => this.toEntity(item));
  }

  static toApi(entity) {
    return {
      // Corregido: usamos los datos de la entidad recibida
      total_amount: parseFloat(entity.total_amount || entity.amount), 
      payment_method: entity.payment_method || entity.method,
      transaction_date: entity.transaction_date || entity.date,
      status: entity.status
    };
  }
}