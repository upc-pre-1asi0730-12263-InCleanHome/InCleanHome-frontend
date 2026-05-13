<template>
  <div class="container">
    <div class="card">
      <h1>Client Registration</h1>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="form-group">
        <input v-model="name" type="text" placeholder="Full Name" class="form-input" />
      </div>

      <div class="form-group">
        <input v-model="email" type="email" placeholder="Email" class="form-input" />
      </div>

      <div class="form-group">
        <input v-model="password" type="password" placeholder="Password" class="form-input" />
      </div>

      <div class="form-actions">
        <button @click="register" class="btn btn-primary">Register</button>
        <router-link to="/register"><button type="button" class="btn btn-secondary">Back</button></router-link>
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

const register = async () => {

  const exists =
      await repository.findByEmail(
          email.value
      );

  if (exists) {

    error.value =
        'Email already exists';

    return;
  }

  await repository.registerClient({

    role: UserRole.CLIENT,

    name: name.value,

    email: email.value,

    password: password.value,
  });

  router.push('/');
};

</script>