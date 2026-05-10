<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

function toggleLanguage() {
  locale.value = locale.value === 'es' ? 'en' : 'es';
}
</script>

<template>
  <div class="language-switcher">
    <button
      class="language-btn"
      :class="{ active: locale === 'es' }"
      @click="locale = 'es'"
    >
      ES
    </button>
    <span class="separator">|</span>
    <button
      class="language-btn"
      :class="{ active: locale === 'en' }"
      @click="locale = 'en'"
    >
      EN
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  transition: all 0.3s ease;
  opacity: 0.7;
  border-bottom: 2px solid transparent;
}

.language-btn.active {
  opacity: 1;
  border-bottom: 2px solid white;
}

.language-btn:hover {
  opacity: 1;
}

.separator {
  color: white;
  opacity: 0.5;
  font-weight: 600;
}
</style>