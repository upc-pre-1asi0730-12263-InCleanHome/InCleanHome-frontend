/**
 * Servicio de aplicación del perfil de cliente.
 * Capa: Profiles / application
 */
import { ProfileApi } from "../infrastructure/profile.api.js";
import { ClientProfile } from "../domain/model/client-profile.entity.js";

export const ClientProfileService = {
  async getProfile() {
    const raw = await ProfileApi.getClientProfile();
    return ClientProfile.fromApi(raw);
  },

  async updateProfile({ name, phone }) {
    const raw = await ProfileApi.updateClientProfile({ name, phone });
    return raw;
  },
};
