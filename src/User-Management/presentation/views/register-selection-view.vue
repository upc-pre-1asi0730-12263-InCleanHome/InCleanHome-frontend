<script setup>
</script>
<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <img src="/src/assets/logo-InCleanHome.png" alt="InCleanHome" class="auth-logo" />
        <h1 class="auth-title">InCleanHome</h1>
        <p class="auth-subtitle">¿Qué tipo de cuenta deseas?</p>
      </div>

      <div class="register-options">
        <router-link to="/register-client" class="register-option">
          <div class="option-icon">👤</div>
          <h3>Soy Cliente</h3>
          <p>Busca y contrata servicios de limpieza</p>
        </router-link>

        <router-link to="/register-worker" class="register-option">
          <div class="option-icon">🧹</div>
          <h3>Soy Trabajador</h3>
          <p>Ofrece tus servicios de limpieza</p>
        </router-link>
      </div>

      <div class="auth-footer">
        <router-link to="/" class="auth-back">← Volver al inicio</router-link>
      </div>
    </div>
  </div>

</template>