<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <img src="/src/assets/logo-InCleanHome.png" class="auth-logo" />
        <h1 class="auth-title">Editar Perfil</h1>
        <p class="auth-subtitle">
          Actualiza tu información personal
        </p>
      </div>

      <div v-if="success" class="success-message">
        Perfil actualizado correctamente
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="updateProfile" class="auth-form">

        <!-- FOTO -->
        <div class="profile-image-container">

          <img
              :src="previewImage || defaultAvatar"
              class="profile-image"
              alt="Foto perfil"
          />

          <input
              type="file"
              accept="image/*"
              @change="handleImageChange"
              class="file-input"
          />
        </div>

        <!-- NOMBRE -->
        <!-- CLIENTE -->
        <div v-if="!isWorker" class="form-group">

          <label class="form-label">Nombre</label>

          <input
              v-model="name"
              type="text"
              class="form-input"
              required
          />
        </div>

        <!-- TRABAJADOR -->
        <div v-else class="form-row">

          <div class="form-group">
            <label class="form-label">Nombre</label>

            <input
                v-model="firstName"
                type="text"
                class="form-input"
                required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Apellido</label>

            <input
                v-model="lastName"
                type="text"
                class="form-input"
                required
            />
          </div>

        </div>

        <!-- EMAIL -->
        <div class="form-group">
          <label class="form-label">Correo</label>

          <input
              v-model="email"
              type="email"
              class="form-input"
              required
          />
        </div>

        <!-- PASSWORD -->
        <div class="form-group">
          <label class="form-label">Nueva contraseña</label>

          <input
              v-model="password"
              type="password"
              placeholder="********"
              class="form-input"
          />
        </div>

        <button type="submit" class="btn-login">
          Guardar cambios
        </button>

      </form>

      <div class="auth-footer">
        <router-link to="/home" class="auth-back">
          ← Volver
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const name = ref('');
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const previewImage = ref('');
const profileImage = ref(null);

const success = ref(false);
const error = ref('');

const isWorker = ref(false);

const defaultAvatar =
    'https://cdn-icons-png.flaticon.com/512/149/149071.png';

onMounted(() => {

  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {

    // Detectar si es trabajador
    if (user.firstName) {
      isWorker.value = true;

      firstName.value = user.firstName || '';
      lastName.value = user.lastName || '';

    } else {
      // Cliente
      name.value = user.name || '';
    }

    email.value = user.email || '';
    previewImage.value = user.photo || '';
  }
});

const handleImageChange = (event) => {

  const file = event.target.files[0];

  if (file) {
    profileImage.value = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const updateProfile = () => {

  try {

    success.value = false;
    error.value = '';

    const user = JSON.parse(localStorage.getItem('user'));

    const updatedUser = {

      ...user,

      // CLIENTE
      name: name.value,

      // WORKER
      firstName: firstName.value,
      lastName: lastName.value,

      email: email.value,

      password: password.value || user.password,

      photo: previewImage.value
    };

    localStorage.setItem(
        'user',
        JSON.stringify(updatedUser)
    );

    success.value = true;

  } catch (err) {

    error.value = 'Error al actualizar perfil';

    console.error(err);
  }
};
</script>

<style scoped>
.profile-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #00c896;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.file-input {
  width: 100%;
}

.success-message {
  background: #dcfce7;
  color: #166534;
  padding: 0.9rem;
  border-radius: 10px;
  font-size: 0.9rem;
  text-align: center;
}
</style>