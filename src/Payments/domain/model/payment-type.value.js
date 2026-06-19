/**
 * Value Object PaymentType — tipos de pago válidos en el sistema.
 * Capa: Payments / domain / model
 */
export const PaymentType = Object.freeze({
  CASH:          "cash",
  CARD:          "card",
  YAPE:          "yape",
  PLIN:          "plin",
  BANK_TRANSFER: "bank_transfer",
});

export const ALL_PAYMENT_TYPES = Object.values(PaymentType);
