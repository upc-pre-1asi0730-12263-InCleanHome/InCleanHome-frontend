<script setup>

import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem('user-locale', lang); // Opcional: guardar preferencia
};

</script>


<template>
  <div class="layout-container">
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

        <div class="language-selector-container">
          <button 
            :class="{ active: locale === 'es' }" 
            @click="changeLanguage('es')"
            class="btn-lang"
          >
            ESP
          </button>
          <button 
            :class="{ active: locale === 'en' }" 
            @click="changeLanguage('en')"
            class="btn-lang"
          >
            ENG
          </button>
        </div>

        <div class="user-footer">
          <div class="user-card">
            <router-link to="/users" class="nav-item">
              <i class="icon">👤</i> USUARIO
            </router-link>
          </div>
        </div>
      </aside>

      <main class="main-viewport">
        <slot></slot> 
      </main>
    </div>

  </div>

</template>

<style scoped>
</style>