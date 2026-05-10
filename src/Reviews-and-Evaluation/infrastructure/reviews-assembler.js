import { Review, WorkerReputation } from '../domain/model/reviews-entity.js';
import { ReviewResource } from './reviews-resource.js';

export class ReviewsAssembler {
    static toEntityFromResource(resource) {
        return new Review({
            id: resource.id,
            workerId: resource.workerId,
            clientId: resource.clientId,
            bookingId: resource.bookingId,
            rating: resource.rating,
            comment: resource.comment,
            createdAt: resource.createdAt,
            workerName: resource.workerName,
            clientName: resource.clientName,
        });
    }

    static toResourceFromEntity(entity) {
        return new ReviewResource({
            id: entity.id,
            workerId: entity.workerId,
            clientId: entity.clientId,
            bookingId: entity.bookingId,
            rating: entity.rating,
            comment: entity.comment,
            createdAt: entity.createdAt,
            workerName: entity.workerName,
            clientName: entity.clientName,
        });
    }

    static toWorkerReputation(workerId, reviews) {
        const avg = WorkerReputation.computeAverageRating(reviews);
        return new WorkerReputation({
            workerId,
            averageRating: avg,
            totalReviews: reviews.length,
            reputation: WorkerReputation.computeReputation(avg),
        });
    }
}
