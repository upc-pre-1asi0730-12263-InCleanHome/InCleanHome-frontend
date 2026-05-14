<template>
  <div class="auth-container">
    <div class="auth-card auth-card-large">
      <div class="auth-header">
        <img src="/src/assets/logo-InCleanHome.png" alt="InCleanHome" class="auth-logo" />
        <h1 class="auth-title">InCleanHome</h1>
        <p class="auth-subtitle">Registro de Trabajador</p>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <form @submit.prevent="register" class="auth-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Nombre</label>
            <input
              v-model="firstName"
              type="text"
              placeholder="Tu nombre"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Apellido</label>
            <input
              v-model="lastName"
              type="text"
              placeholder="Tu apellido"
              class="form-input"
              required
            />
          </div>
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

        <div class="form-group">
          <label class="form-label">Distrito</label>

          <select v-model="district" class="form-input" required>
            <option disabled value="">Selecciona un distrito</option>

            <option v-for="item in limaDistricts" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Descripción Profesional</label>
          <textarea
            v-model="description"
            placeholder="Cuéntanos sobre tu experiencia..."
            class="form-textarea"
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Servicios Disponibles:</label>
          <div class="services-grid-compact">
            <div class="service-checkbox">
              <input type="checkbox" id="CLEANING" value="Cleaning" v-model="selectedServices" class="checkbox-input" />
              <label for="CLEANING" class="checkbox-label">🧹 Limpieza</label>
            </div>
            <div class="service-checkbox">
              <input type="checkbox" id="COOKING" value="Cooking" v-model="selectedServices" class="checkbox-input" />
              <label for="COOKING" class="checkbox-label">👨‍🍳 Cocina</label>
            </div>
            <div class="service-checkbox">
              <input type="checkbox" id="LAUNDRY" value="Laundry" v-model="selectedServices" class="checkbox-input" />
              <label for="LAUNDRY" class="checkbox-label">👚 Lavandería</label>
            </div>
            <div class="service-checkbox">
              <input type="checkbox" id="CHILDCARE" value="Childcare" v-model="selectedServices" class="checkbox-input" />
              <label for="CHILDCARE" class="checkbox-label">👶 Cuidado de niños</label>
            </div>
            <div class="service-checkbox">
              <input type="checkbox" id="ELDERCARE" value="Eldercare" v-model="selectedServices" class="checkbox-input" />
              <label for="ELDERCARE" class="checkbox-label">👴 Cuidado de mayores</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">📄 Antecedentes Penales (PDF)</label>
          <input
            type="file"
            @change="handleCriminalRecordChange"
            accept=".pdf"
            class="file-input"
            required
          />
          <span v-if="criminalRecordPdf" class="file-name">✓ {{ criminalRecordPdf.name }}</span>
        </div>

        <div class="form-group">
          <label class="form-label">📄 Experiencia (PDF)</label>
          <input
            type="file"
            @change="handleExperienceChange"
            accept=".pdf"
            class="file-input"
            required
          />
          <span v-if="experiencePdf" class="file-name">✓ {{ experiencePdf.name }}</span>
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
import { useRouter } from 'vue-router';
import { ApiUserRepository } from '../../infrastructure/persistence/api-user-repository.js';
import { UserRole } from '../../domain/model/enums/user-role.js';


const router = useRouter();
const repository = new ApiUserRepository();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const limaDistricts = [
  'Ancón',
  'Ate',
  'Barranco',
  'Breña',
  'Carabayllo',
  'Chaclacayo',
  'Chorrillos',
  'Cieneguilla',
  'Comas',
  'El Agustino',
  'Independencia',
  'Jesús María',
  'La Molina',
  'La Victoria',
  'Lima',
  'Lince',
  'Los Olivos',
  'Lurigancho',
  'Lurín',
  'Magdalena del Mar',
  'Miraflores',
  'Pachacámac',
  'Pucusana',
  'Pueblo Libre',
  'Puente Piedra',
  'Punta Hermosa',
  'Punta Negra',
  'Rímac',
  'San Bartolo',
  'San Borja',
  'San Isidro',
  'San Juan de Lurigancho',
  'San Juan de Miraflores',
  'San Luis',
  'San Martín de Porres',
  'San Miguel',
  'Santa Anita',
  'Santa María del Mar',
  'Santa Rosa',
  'Santiago de Surco',
  'Surquillo',
  'Villa El Salvador',
  'Villa María del Triunfo'
];const description = ref('');
const selectedServices = ref([]);
const criminalRecordPdf = ref(null);
const experiencePdf = ref(null);
const error = ref('');
const isLoading = ref(false);

const handleCriminalRecordChange = (e) => {
  criminalRecordPdf.value = e.target.files?.[0] || null;
};

const handleExperienceChange = (e) => {
  experiencePdf.value = e.target.files?.[0] || null;
};

const register = async () => {
  try {
    error.value = '';

    // Validaciones
    if (!firstName.value || !lastName.value || !email.value || !password.value) {
      error.value = 'Por favor completa todos los campos requeridos';
      return;
    }

    if (!district.value) {
      error.value = 'Por favor completa la zona/distrito';
      return;
    }

    if (!criminalRecordPdf.value || !experiencePdf.value) {
      error.value = 'Por favor carga ambos documentos PDF requeridos';
      return;
    }

    if (selectedServices.value.length === 0) {
      error.value = 'Por favor selecciona al menos un servicio';
      return;
    }

    isLoading.value = true;

    // Verificar si el email ya existe
    const exists = await repository.findByEmail(email.value);
    if (exists) {
      error.value = 'Este email ya está registrado';
      return;
    }

    // Registrar trabajador
    await repository.registerWorker({
      role: UserRole.WORKER,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      district: district.value,
      description: description.value,
      services: selectedServices.value,
      criminalRecordPdf: criminalRecordPdf.value,
      experiencePdf: experiencePdf.value,
    });

    // Redirigir a home
    router.push('/home');
  } catch (err) {
    error.value = 'Error al registrarse. Por favor intenta de nuevo.';
    console.error('Registration error:', err);
  } finally {
    isLoading.value = false;
  }
};

</script>