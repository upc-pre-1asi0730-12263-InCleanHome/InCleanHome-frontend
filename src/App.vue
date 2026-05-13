<script setup>
import Layout from './shared/presentation/components/layout.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
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
</style>
