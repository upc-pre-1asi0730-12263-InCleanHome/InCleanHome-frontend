<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo">InCleanHome</div>
      <img class="logo2" alt="InCleanHome Logo" import from './assets/logo-InCleanHome.png'/>
      <nav>
        <router-link to="/panel" class="nav-item">Panel</router-link>
        <router-link to="/booking" class="nav-item">Reservas</router-link>
        <router-link to="/payments" class="nav-item">Pagos</router-link>
        <router-link to="/profile" class="nav-item">Perfil</router-link>
      </nav>
      <div class="user-footer">
        <div class="avatar">👤</div>
        <span>USUARIO</span>
      </div>
    </aside>

    <main class="main-viewport">
      <router-view />
    </main>
  </div>
</template>

<style>
/* Reset básico */
body { margin: 0; background-color: #f8fafc; }

.app-layout {
  display: grid;
  grid-template-columns: 250px 1fr; /* Sidebar de 250px fijo */
  min-height: 100vh;
}

.sidebar {
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.main-viewport {
  padding: 2.5rem;
}

.nav-item {
  display: block;
  padding: 0.8rem;
  color: #64748b;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.nav-item.router-link-active {
  background-color: #eff6ff;
  color: #2563eb;
  font-weight: 600;
}
</style>