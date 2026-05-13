import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const http = axios.create({
    baseURL: `${BASE_URL}/api/v1/reviews`,
    headers: { 'Content-Type': 'application/json' },
});

export class ReviewsApi {
    static async getAllReviews() {
        const response = await http.get('/');
        return response.data;
    }

    static async getReviewsByWorkerId(workerId) {
        const response = await http.get('/', { params: { workerId } });
        return response.data;
    }

    static async getReviewsByClientId(clientId) {
        const response = await http.get('/', { params: { clientId } });
        return response.data;
    }

    static async getReviewById(id) {
        const response = await http.get(`/${id}`);
        return response.data;
    }

    static async createReview(reviewData) {
        const response = await http.post('/', reviewData);
        return response.data;
    }

    static async updateReview(id, reviewData) {
        const response = await http.put(`/${id}`, reviewData);
        return response.data;
    }

    static async deleteReview(id) {
        const response = await http.delete(`/${id}`);
        return response.data;
    }
}