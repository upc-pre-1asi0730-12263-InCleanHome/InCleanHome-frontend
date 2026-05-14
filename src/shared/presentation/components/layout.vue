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
        <router-link to="/review-list" class="nav-item">
          <i class="icon">⭐</i> Calificaciones
        </router-link>
        <router-link to="/payments" class="nav-item">
          <i class="icon">📊</i> Panel (Pagos)
        </router-link>
      </nav>

      <div class="user-footer">
        <div class="user-card">
          <router-link to="/edit-profile" class="nav-item">
            <i class="icon">👤</i> USUARIO
          </router-link>
        </div>
        <div class="language-selector" style="padding: 1rem;">
          <button @click="Salir" class="btn-lang">Cerrar Sesión</button>
        </div>
      </div>

      <div class="language-selector" style="padding: 1rem;">
         <button @click="$i18n.locale = 'es'" class="btn-lang">ESP</button>
         <button @click="$i18n.locale = 'en'" class="btn-lang">ENG</button>
      </div>

    </aside>

    <main class="main-viewport">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
  .app-layout {
    display: flex; /* Para que la sidebar y el contenido estén uno al lado del otro */
    height: 100vh;
  }

  .main-viewport {
    flex: 1; /* Para que ocupe todo el espacio restante a la derecha */
    overflow-y: auto;
    padding: 20px;
    background-color: #f9fafb;
  }
</style>

<script setup>
import { useRouter } from 'vue-router';
// Si estás usando Pinia/auth-store, impórtalo aquí
// import { useAuthStore } from '@/User-Management/application/auth-store';

const router = useRouter();
// const authStore = useAuthStore();

const Salir = () => {
  // 1. Limpiar datos de sesión (ajusta según lo que uses)
  localStorage.removeItem('user'); // O localStorage.clear();
  
  // 2. Si usas Pinia, resetear el estado
  // authStore.logout(); 

  // 3. Redirigir al Login (asegúrate de que el nombre sea 'login' en tu router.js)
  router.push('/login');
};
</script>