export class Review {
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

export class WorkerReputation {
    constructor({ workerId, averageRating, totalReviews, reputation }) {
        this.workerId = workerId;
        this.averageRating = averageRating;
        this.totalReviews = totalReviews;
        this.reputation = reputation;
    }

    /**
     * Actualiza la reputación automáticamente en base al promedio de calificaciones.
     * Lógica: promedio >= 4.5 => 'Excelente', >= 3.5 => 'Bueno', >= 2.5 => 'Regular', < 2.5 => 'Bajo'
     */
    static computeReputation(averageRating) {
        if (averageRating >= 4.5) return 'Excelente';
        if (averageRating >= 3.5) return 'Bueno';
        if (averageRating >= 2.5) return 'Regular';
        return 'Bajo';
    }

    static computeAverageRating(reviews) {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return Math.round((sum / reviews.length) * 10) / 10;
    }
}
