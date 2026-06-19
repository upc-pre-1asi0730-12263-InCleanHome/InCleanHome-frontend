/**
 * Cliente API de métodos de pago.
 * Capa: Payments / infrastructure
 *
 * Endpoints: GET/POST /payments/methods,
 *   PATCH /payments/methods/:id/default, DELETE /payments/methods/:id
 */
import apiClient from "../../Shared/infrastructure/http/api.client.js";

export const PaymentMethodApi = {
  async list()        { const { data } = await apiClient.get("/payments/methods"); return data; },
  async add(payload)  { const { data } = await apiClient.post("/payments/methods", payload); return data; },
  async setDefault(id){ const { data } = await apiClient.patch(`/payments/methods/${id}/default`); return data; },
  async remove(id)    { await apiClient.delete(`/payments/methods/${id}`); },
};
