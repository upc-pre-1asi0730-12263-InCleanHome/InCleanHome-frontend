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

const loginUseCase =
    new LoginUseCase(
        new ApiUserRepository()
    );

const login = async () => {

  const user =
      await loginUseCase.execute(
          email.value,
          password.value
      );

  if (!user) {

    error.value =
        'Invalid credentials';

    return;
  }

  if (user.role === 'CLIENT') {

    router.push('/client');
  }

  if (user.role === 'WORKER') {

    router.push('/worker');
  }
};

</script>

<template>
  <div class="container">
    <div class="card">
      <h1>Clean Home</h1>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="form-group">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="form-input"
        />
      </div>

      <button @click="login" class="btn btn-primary">Login</button>


      <div style="margin-top: 1rem; text-align: center;">
        <p style="color: var(--color-gray-600); margin-bottom: 0.5rem;">Don't have an account?</p>
        <router-link to="/register">
          <button type="button" class="btn btn-secondary">Create Account</button>
        </router-link>
      </div>
    </div>
  </div>

</template>