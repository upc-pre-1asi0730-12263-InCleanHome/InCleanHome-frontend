import { Booking } from '../domain/model/booking-entity'

export class BookingResource {
  static toEntity(apiData) {
    return new Booking(
      apiData.id,
      apiData.client_id,
      apiData.worker_id,
      apiData.worker_name || 'Profesional',
      apiData.date,
      apiData.start_time,
      apiData.end_time,
      apiData.status || 'Pending',
      apiData.instructions || '',
      parseFloat(apiData.total_amount || 0)
    )
  }

  static toEntityList(apiDataList) {
    if (!Array.isArray(apiDataList)) return []
    return apiDataList.map(item => this.toEntity(item))
  }

  static toApi(entity) {
    return {
      client_id: entity.clientId,
      worker_id: entity.workerId,
      worker_name: entity.workerName,
      date: entity.date,
      start_time: entity.startTime,
      end_time: entity.endTime,
      status: entity.status,
      instructions: entity.instructions,
      total_amount: parseFloat(entity.totalAmount)
    }
  }
}
