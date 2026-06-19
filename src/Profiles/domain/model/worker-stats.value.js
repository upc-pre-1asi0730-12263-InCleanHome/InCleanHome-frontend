/**
 * Value Object WorkerStats — estadísticas del dashboard de la trabajadora.
 * Capa: Profiles / domain / model
 */
export class WorkerStats {
  constructor({ netEarnings=0, platformFeeDeducted=0, completedServices=0,
    averageRating=0, monthlyEarnings=[] }) {
    this.netEarnings         = netEarnings;
    this.platformFeeDeducted = platformFeeDeducted;
    this.completedServices   = completedServices;
    this.averageRating       = averageRating;
    this.monthlyEarnings     = monthlyEarnings;
  }

  static fromApi(raw) {
    return new WorkerStats({ ...raw });
  }

  static empty() { return new WorkerStats({}); }
}
