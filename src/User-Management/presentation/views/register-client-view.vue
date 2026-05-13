<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <img src="/src/assets/logo-InCleanHome.png" alt="InCleanHome" class="auth-logo" />
        <h1 class="auth-title">InCleanHome</h1>
        <p class="auth-subtitle">Registro de Cliente</p>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <form @submit.prevent="register" class="auth-form">
        <div class="form-group">
          <label class="form-label">Nombre Completo</label>
          <input
            v-model="name"
            type="text"
            placeholder="Tu nombre"
            class="form-input"
            required
          />
        </div>

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
          {{ isLoading ? 'Registrando...' : 'Registrarse' }}
        </button>
      </form>

      <div class="auth-footer">
        <router-link to="/register" class="auth-back">← Atrás</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';

import { useRouter }
  from 'vue-router';

import { ApiUserRepository }
  from '../../infrastructure/persistence/api-user-repository.js';

import { UserRole }
  from '../../domain/model/enums/user-role.js';

const router = useRouter();

const repository =
    new ApiUserRepository();

const name = ref('');

const email = ref('');

const password = ref('');

const error = ref('');

const isLoading = ref(false);

const register = async () => {
  try {
    error.value = '';

    if (!name.value || !email.value || !password.value) {
      error.value = 'Por favor completa todos los campos';
      return;
    }

    isLoading.value = true;

    const exists =
        await repository.findByEmail(
            email.value
        );

    if (exists) {

      error.value =
          'Este email ya está registrado';

      return;
    }

    await repository.registerClient({

      role: UserRole.CLIENT,

      name: name.value,

      email: email.value,

      password: password.value,
    });

    router.push('/home');
  } catch (err) {
    error.value = 'Error al registrarse. Por favor intenta de nuevo.';
    console.error('Registration error:', err);
  } finally {
    isLoading.value = false;
  }
};

</script>