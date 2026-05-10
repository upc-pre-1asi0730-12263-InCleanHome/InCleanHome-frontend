<script setup>
import LanguageSwitcher from './language-switcher.vue';
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <div class="layout__header-content">
        <h1>InCleanHome</h1>
        <LanguageSwitcher />
      </div>
    </header>
    <main class="layout__main">
      <slot />
    </main>
    <footer class="layout__footer">
      <p>&copy; 2024 InCleanHome. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__header {
  background: linear-gradient(135deg, #009960 0%, #00B272 100%);
  color: white;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 153, 96, 0.15);
}

.layout__header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layout__header h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.layout__main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.layout__footer {
  background: #1A2E4A;
  color: #7A8FA6;
  text-align: center;
  padding: 1.5rem;
  border-top: 2px solid #00B272;
}

.layout__footer p {
  margin: 0;
  font-size: 0.9rem;
}
</style>