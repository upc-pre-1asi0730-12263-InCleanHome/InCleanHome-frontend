import axios from 'axios';

// Definimos la URL base igual que tus compañeros
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Creamos la instancia de axios configurada específicamente para este endpoint
const http = axios.create({
    baseURL: `${BASE_URL}/api/v1/reviews`,
    headers: { 'Content-Type': 'application/json' },
});

// Mantenemos la clase y los nombres de los métodos EXACTAMENTE igual
// para que reviews-store.js no necesite ningún cambio.
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