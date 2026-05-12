<script setup>
import Layout from './shared/presentation/components/layout.vue';
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<style>
/* Estilos globales (fuentes, resets) */
body { margin: 0; font-family: 'Inter', sans-serif; }
</style>