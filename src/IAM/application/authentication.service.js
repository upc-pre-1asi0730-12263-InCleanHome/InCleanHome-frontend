/**
 * Servicio de aplicación de autenticación.
 * Capa: IAM / application
 *
 * Implementa los casos de uso de IAM:
 *   - Iniciar sesión
 *   - Registrar cliente
 *   - Registrar trabajadora
 *   - Cerrar sesión
 *
 * Encapsula la llamada a la API + la actualización del auth store.
 * Las vistas (LoginView, RegisterView) llaman a este servicio.
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
