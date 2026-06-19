/**
 * Servicio de aplicación de métodos de pago.
 * Capa: Payments / application
 * Gestiona operaciones CRUD sobre PaymentMethod via PaymentMethodApi.
 */
import { PaymentMethodApi } from "../infrastructure/payment-method.api.js";
import { PaymentMethod } from "../domain/model/payment-method.entity.js";

export const PaymentMethodService = {
  async list() {
    const raw = await PaymentMethodApi.list();
    return raw.map(PaymentMethod.fromApi);
  },

  async add(payload) {
    const raw = await PaymentMethodApi.add(payload);
    return PaymentMethod.fromApi(raw);
  },

  async setDefault(id) {
    return PaymentMethodApi.setDefault(id);
  },

  async remove(id) {
    return PaymentMethodApi.remove(id);
  },
};
