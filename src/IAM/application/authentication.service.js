/**
 * Authentication application service.
 * Layer: IAM / application
 *
 * Implements the following IAM use cases:
 *   - Log in
 *   - Register customer
 *   - Register employee
 *   - Log out
 *
 * Encapsulates the API call and the auth store update.
 * The views (LoginView, RegisterView) call this service.
 */
import { AuthApi } from "../infrastructure/auth.api.js";
import { useAuthStore } from "./auth.store.js";

export const AuthenticationService = {
  async login({ email, password }) {
    const data = await AuthApi.login({ email, password });
    const auth = useAuthStore();
    auth.setAuth(data.user, data.token);
    return data.user;
  },

  async registerClient({ name, email, password, phone }) {
    const data = await AuthApi.registerClient({ name, email, password, phone });
    const auth = useAuthStore();
    auth.setAuth(data.user, data.token);
    return data.user;
  },

  async registerWorker(workerData) {
    const data = await AuthApi.registerWorker(workerData);
    const auth = useAuthStore();
    auth.setAuth(data.user, data.token);
    return data.user;
  },

  logout() {
    const auth = useAuthStore();
    auth.clearAuth();
  },
};
