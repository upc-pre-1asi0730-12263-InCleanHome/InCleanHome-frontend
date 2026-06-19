/**
 * Cliente API de autenticación.
 * Capa: IAM / infrastructure
 *
 * Endpoints:
 *   POST /auth/login
 *   POST /auth/register/client
 *   POST /auth/register/worker
 *   POST /auth/worker/upload-document
 */
import apiClient from "../../Shared/infrastructure/http/api.client.js";

export const AuthApi = {
  async login({ email, password }) {
    const { data } = await apiClient.post("/auth/login", { email, password });
    return data; // { user, token }
  },

  async registerClient(payload) {
    const { data } = await apiClient.post("/auth/register/client", payload);
    return data; // { user, token }
  },

  async registerWorker(payload) {
    const { data } = await apiClient.post("/auth/register/worker", payload);
    return data; // { user, token }
  },

  /** Sube un documento (base64) — background_check | experience */
  async uploadWorkerDocument({ documentType, fileBase64, fileName }) {
    const { data } = await apiClient.post("/auth/worker/upload-document", {
      documentType,
      fileBase64,
      fileName,
    });
    return data;
  },
};
