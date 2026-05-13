<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo-container" @click="$router.push('/home')" style="cursor: pointer;">
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
          <i class="icon">👤</i> Perfiles
        </router-link>
        <router-link to="/payments" class="nav-item">
          <i class="icon">📊</i> Panel (Pagos)
        </router-link>
      </nav>

      <div class="user-footer">
        <div class="user-card">
          <router-link to="/users" class="nav-item">
            <i class="icon">👤</i> USUARIO
          </router-link>
        </div>
      </div>
    </aside>

    <main class="main-viewport">
      <slot></slot> </main>
  </div>
</template>

<style scoped>
</style>