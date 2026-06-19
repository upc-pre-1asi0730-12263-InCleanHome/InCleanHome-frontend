/**
 * Value Object PaymentType — tipos de pago válidos en el sistema.
 * Capa: Payments / domain / model
 * ALL_PAYMENT_TYPES expone los valores como array para iteración.
 */
export const PaymentType = Object.freeze({
  CASH:          "cash",
  CARD:          "card",
  YAPE:          "yape",
  PLIN:          "plin",
  BANK_TRANSFER: "bank_transfer",
});

export const ALL_PAYMENT_TYPES = Object.values(PaymentType);
