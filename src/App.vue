
<script setup>
import Layout from './shared/presentation/components/layout.vue';
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

// Rutas que no deben mostrar el layout (login y registro)
const authRoutes = ['/login', '/register', '/register-client', '/register-worker'];
const showLayout = computed(() => !authRoutes.includes(route.path));
</script>

<template>
  <Layout v-if="showLayout">
    <router-view />
  </Layout>
  <router-view v-else />
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  font-family: 'Inter', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f7fafc;
  color: #1a2e4a;
}

#app {
  width: 100%;
  min-height: 100vh;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  font-family: 'Inter', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f7fafc;
  color: #1a2e4a;
}

#app {
  width: 100%;
  min-height: 100vh;
}

body { margin: 0; font-family: 'Inter', sans-serif; }
</style>
