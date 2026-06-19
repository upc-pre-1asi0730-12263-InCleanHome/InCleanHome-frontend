/**
 * Entidad PaymentMethod — método de pago guardado por el usuario.
 * Capa: Payments / domain / model
 */
export class PaymentMethod {
  constructor({ id, type, label, details, isDefault = false }) {
    this.id        = id;
    this.type      = type;       // cash | card | yape | plin | bank_transfer
    this.label     = label;
    this.details   = details;
    this.isDefault = isDefault;
  }

  icon() {
    return { cash:"💵", card:"💳", yape:"📱", plin:"📲", bank_transfer:"🏦" }[this.type] || "💰";
  }

  static fromApi(raw) {
    return new PaymentMethod({ id: raw.id, type: raw.type, label: raw.label, details: raw.details, isDefault: raw.isDefault ?? false });
  }
}
