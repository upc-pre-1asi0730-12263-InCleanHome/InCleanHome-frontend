<script setup>

import { ref } from 'vue';

import { useRouter }
  from 'vue-router';

import { LoginUseCase }
  from '../../application/use-cases/login-use-case.js';

import { ApiUserRepository }
  from '../../infrastructure/persistence/api-user-repository.js';

const router = useRouter();

const email = ref('');

const password = ref('');

const error = ref('');

const isLoading = ref(false);

const loginUseCase =
    new LoginUseCase(
        new ApiUserRepository()
    );

const login = async () => {
  try {
    error.value = '';

    if (!email.value || !password.value) {
      error.value = 'Por favor completa todos los campos';
      return;
    }

    isLoading.value = true;

    const user =
        await loginUseCase.execute(
            email.value,
            password.value
        );

    if (!user) {

      error.value =
          'Email o contraseña incorrectos';

      return;
    }

    // Redirigir a home independientemente del rol
    router.push('/home');
  } catch (err) {
    error.value = 'Error al iniciar sesión. Por favor intenta de nuevo.';
    console.error('Login error:', err);
  } finally {
    isLoading.value = false;
  }
};

</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <img src="/src/assets/logo-InCleanHome.png" alt="InCleanHome" class="auth-logo" />
        <h1 class="auth-title">InCleanHome</h1>
        <p class="auth-subtitle">Bienvenido de vuelta</p>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <form @submit.prevent="login" class="auth-form">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="correo@ejemplo.com"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="form-input"
            required
          />
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>
      </form>

      <div class="auth-footer">
        <p>¿No tienes cuenta?</p>
        <router-link to="/register" class="auth-link">Crear una ahora</router-link>
      </div>
    </div>
  </div>

</template>