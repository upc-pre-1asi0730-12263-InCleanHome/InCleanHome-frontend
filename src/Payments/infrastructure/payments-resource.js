export class PaymentsResource {
  static toEntity(data) {
    return {
      id: data.id,
      total: data.amount_value, // Mapeas nombres de la API a tu entidad
      status: data.payment_status
    };
  }
}