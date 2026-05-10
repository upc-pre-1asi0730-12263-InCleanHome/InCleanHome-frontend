import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const ENDPOINT = `${BASE_URL}/api/v1/reviews`;

export class ReviewsApi {
    static async getAllReviews() {
        const response = await axios.get(ENDPOINT);
        return response.data;
    }

    static async getReviewsByWorkerId(workerId) {
        const response = await axios.get(`${ENDPOINT}?workerId=${workerId}`);
        return response.data;
    }

    static async getReviewsByClientId(clientId) {
        const response = await axios.get(`${ENDPOINT}?clientId=${clientId}`);
        return response.data;
    }

    static async getReviewById(id) {
        const response = await axios.get(`${ENDPOINT}/${id}`);
        return response.data;
    }

    static async createReview(reviewData) {
        const response = await axios.post(ENDPOINT, reviewData);
        return response.data;
    }

    static async updateReview(id, reviewData) {
        const response = await axios.put(`${ENDPOINT}/${id}`, reviewData);
        return response.data;
    }

    static async deleteReview(id) {
        const response = await axios.delete(`${ENDPOINT}/${id}`);
        return response.data;
    }
}
