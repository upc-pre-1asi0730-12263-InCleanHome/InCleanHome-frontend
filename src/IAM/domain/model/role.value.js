/**
 * Value Object Role — rol del usuario en el sistema.
 * Capa: IAM / domain / model
 */
export const Role = Object.freeze({
  CLIENT: "client",
  WORKER: "worker",
});

export const ALL_ROLES = [Role.CLIENT, Role.WORKER];

export function isValidRole(role) {
  return ALL_ROLES.includes(role);
}
