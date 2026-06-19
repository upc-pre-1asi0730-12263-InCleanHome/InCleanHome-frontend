/**
 * Entidad User — usuario autenticado del sistema.
 * Capa: IAM / domain / model
 *
 * Representa al usuario actual (cliente o trabajadora) y sus
 * datos de identidad. La info de credenciales (token) vive aparte.
 */
import { Role } from "./role.value.js";

export class User {
  constructor({ id, name, email, phone, role, documentsVerified = false }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.role = role; // 'client' | 'worker'
    this.documentsVerified = documentsVerified;
  }

  isWorker() { return this.role === Role.WORKER; }
  isClient() { return this.role === Role.CLIENT; }

  /** Iniciales para mostrar en avatares. */
  initials() {
    return (this.name || "U")
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  /** Construye el User a partir de la respuesta del backend. */
  static fromApi(raw) {
    if (!raw) return null;
    return new User({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      phone: raw.phone,
      role: raw.role,
      documentsVerified: raw.documentsVerified ?? false,
    });
  }
}
