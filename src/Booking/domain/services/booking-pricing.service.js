/**
 * Servicio de dominio: cálculo de precios de una reserva.
 * Capa: Booking / domain / services
 *
 * Regla de negocio: la plataforma retiene un 10% del total.
 * Es pura lógica de negocio — no tiene dependencias externas.
 */
export const PLATFORM_FEE_RATE = 0.10;

export const BookingPricingService = {
  calculateSubtotal(hourlyRate, hours) {
    return hourlyRate * hours;
  },
  calculatePlatformFee(subtotal) {
    return subtotal * PLATFORM_FEE_RATE;
  },
  calculateWorkerEarning(subtotal) {
    return subtotal * (1 - PLATFORM_FEE_RATE);
  },
};
