<template>
  <div class="dashboard-container">
    <header class="panel-header">
      <div class="welcome-section">
        <h1>Historial de Pagos</h1>
        <p>Panel de cliente</p>
      </div>
      <button class="btn-action">
        <span class="icon">🔍</span> Nuevo Pago
      </button>
    </header>

    <section class="stats-grid">
      <div class="stat-card">
        <span class="stat-label">Total pagos</span>
        <div class="stat-value">0</div>
      </div>
      <div class="stat-card">
        <span class="stat-label">Exitosos</span>
        <div class="stat-value">0</div>
      </div>
      <div class="stat-card">
        <span class="stat-label">Pendientes</span>
        <div class="stat-value">0</div>
      </div>
      <div class="stat-card highlight">
        <span class="stat-label">Total gastado</span>
        <div class="stat-value">S/ 0.00</div>
      </div>
    </section>

    <section class="main-content-card">
      <h3>Transacciones recientes</h3>
      <div class="empty-state">
        <div class="empty-icon">💳</div>
        <p>Aún no tienes pagos registrados.</p>
        <a href="#" class="empty-link">Realizar tu primer pago</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard-container {
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

/* Header */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.panel-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.panel-header p {
  color: #64748b;
  margin: 0;
}

.btn-action {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* Grid de tarjetas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.stat-label {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.highlight .stat-value {
  color: #0f172a;
}

/* Tarjeta Blanca Grande */
.main-content-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 2rem;
  min-height: 300px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  color: #94a3b8;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
}
</style>