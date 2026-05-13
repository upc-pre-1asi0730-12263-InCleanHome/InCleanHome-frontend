import { Booking } from '../domain/model/booking-entity'

export class BookingAssembler {
  static toEntity(apiData) {
    return new Booking(
      apiData.id || Date.now(),
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
}
