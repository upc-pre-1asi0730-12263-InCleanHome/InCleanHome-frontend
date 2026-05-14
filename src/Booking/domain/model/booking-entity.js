export class Booking {
  constructor(id, clientId, workerId, workerName, date, startTime, endTime, status, instructions, totalAmount) {
    this.id = id
    this.clientId = clientId
    this.workerId = workerId
    this.workerName = workerName
    this.date = date
    this.startTime = startTime
    this.endTime = endTime
    this.status = status   // 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'
    this.instructions = instructions
    this.totalAmount = totalAmount
  }
}
