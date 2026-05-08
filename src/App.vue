<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo-container">
        <img src="/src/assets/logo-InCleanHome.png" alt="InCleanHome Logo" class="app-logo"/>
        <span class="brand-name">InCleanHome</span>
      </div>

      <nav class="nav-menu">
        <router-link to="/search" class="nav-item">
          <i class="icon">🔍</i> Buscar
        </router-link>
        <router-link to="/booking" class="nav-item">
          <i class="icon">📅</i> Reservas
        </router-link>
        <router-link to="/messages" class="nav-item">
          <i class="icon">💬</i> Mensajes
        </router-link>
        <router-link to="/profile" class="nav-item">
          <i class="icon">👤</i> Perfil
        </router-link>
        <router-link to="/payments" class="nav-item">
          <i class="icon">📊</i> Panel (Pagos)
        </router-link>
      </nav>

      <div class="user-footer">
        <div class="user-card">
          <div class="user-avatar-bg">
            <span class="avatar-icon">👤</span>
          </div>
          <div class="user-info">
            <span class="username">USUARIO</span>
          </div>
        </div>
      </div>
    </aside>

    <main class="main-viewport">
      <router-view />
    </main>
  </div>
</template>

<style>

</style>