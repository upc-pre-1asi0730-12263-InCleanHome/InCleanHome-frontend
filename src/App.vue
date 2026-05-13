
<script setup>
import Layout from './shared/presentation/components/layout.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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
