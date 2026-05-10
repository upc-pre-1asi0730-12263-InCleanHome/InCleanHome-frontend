export class ReviewResource {
    constructor({ id, workerId, clientId, bookingId, rating, comment, createdAt, workerName, clientName }) {
        this.id = id;
        this.workerId = workerId;
        this.clientId = clientId;
        this.bookingId = bookingId;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
        this.workerName = workerName;
        this.clientName = clientName;
    }
}
