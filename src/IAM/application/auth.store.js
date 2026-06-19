/**
 * Auth store (Pinia).
 * Capa: IAM / application
 *
 * Mantiene el estado de la sesión actual (usuario + token) y expone
 * acciones para iniciar/cerrar sesión. La persistencia se delega a
 * `AuthStorage` (infraestructura), no se accede a localStorage aquí.
 *
 * Este store es consumido por el router, los layouts (Shared) y
 * varias vistas de otros contexts. Es la "API pública" de IAM.
 */
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import apiClient from "../../Shared/infrastructure/http/api.client.js";
import { AuthStorage } from "../../Shared/infrastructure/storage/auth.storage.js";

export const useAuthStore = defineStore("auth", () => {
  // Restauramos sesión desde el almacenamiento
  const user = ref(AuthStorage.getUser());
  const token = ref(AuthStorage.getToken());

  const isLoggedIn = computed(() => !!token.value && !!user.value);

  function setAuth(userData, tokenData) {
    user.value = userData;
    token.value = tokenData;
    AuthStorage.setUser(userData);
    AuthStorage.setToken(tokenData);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${tokenData}`;
  }

  function clearAuth() {
    user.value = null;
    token.value = null;
    AuthStorage.clear();
    delete apiClient.defaults.headers.common["Authorization"];
  }

  function updateUser(partial) {
    const merged = { ...user.value, ...partial };
    user.value = merged;
    AuthStorage.setUser(merged);
  }

  // Al cargar, si hay token persistido, lo aplicamos al cliente HTTP
  if (token.value) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
  }

  return { user, token, isLoggedIn, setAuth, clearAuth, updateUser };
});
