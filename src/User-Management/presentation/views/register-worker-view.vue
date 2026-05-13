<template>
  <div class="container">
    <div class="card register-form">
      <h1>Worker Registration - Test</h1>
      <p style="text-align: center; color: var(--color-primary); font-weight: bold;">Component is loaded!</p>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="form-group">
        <input v-model="firstName" type="text" placeholder="First Name" class="form-input" />
      </div>

      <div class="form-group">
        <input v-model="lastName" type="text" placeholder="Last Name" class="form-input" />
      </div>

      <div class="form-group">
        <input v-model="email" type="email" placeholder="Email" class="form-input" />
      </div>

      <div class="form-group">
        <input v-model="password" type="password" placeholder="Password" class="form-input" />
      </div>

      <div class="form-group">
        <input v-model="district" type="text" placeholder="District" class="form-input" />
      </div>

      <div class="form-group">
        <textarea v-model="description" placeholder="Description" class="form-textarea"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Available Services:</label>
        <div class="services-grid">
          <div class="service-checkbox">
            <input type="checkbox" id="CLEANING" value="Cleaning" v-model="selectedServices" class="checkbox-input" />
            <label for="CLEANING" class="checkbox-label">Cleaning</label>
          </div>
          <div class="service-checkbox">
            <input type="checkbox" id="COOKING" value="Cooking" v-model="selectedServices" class="checkbox-input" />
            <label for="COOKING" class="checkbox-label">Cooking</label>
          </div>
          <div class="service-checkbox">
            <input type="checkbox" id="LAUNDRY" value="Laundry" v-model="selectedServices" class="checkbox-input" />
            <label for="LAUNDRY" class="checkbox-label">Laundry</label>
          </div>
          <div class="service-checkbox">
            <input type="checkbox" id="CHILDCARE" value="Childcare" v-model="selectedServices" class="checkbox-input" />
            <label for="CHILDCARE" class="checkbox-label">Childcare</label>
          </div>
          <div class="service-checkbox">
            <input type="checkbox" id="ELDERCARE" value="Eldercare" v-model="selectedServices" class="checkbox-input" />
            <label for="ELDERCARE" class="checkbox-label">Eldercare</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Criminal Record PDF:</label>
        <input type="file" @change="e => criminalRecordPdf = e.target.files?.[0] || null" accept=".pdf" class="file-input" />
        <span v-if="criminalRecordPdf" class="file-name">{{ criminalRecordPdf.name }}</span>
      </div>

      <div class="form-group">
        <label class="form-label">Experience PDF:</label>
        <input type="file" @change="e => experiencePdf = e.target.files?.[0] || null" accept=".pdf" class="file-input" />
        <span v-if="experiencePdf" class="file-name">{{ experiencePdf.name }}</span>
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
import { useRouter } from 'vue-router';

const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const district = ref('');
const description = ref('');
const selectedServices = ref([]);
let criminalRecordPdf = null;
let experiencePdf = null;
const error = ref('');

const register = () => {
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    error.value = 'Please fill all required fields';
    return;
  }

  if (!criminalRecordPdf || !experiencePdf) {
    error.value = 'Upload required PDFs';
    return;
  }

  if (selectedServices.value.length === 0) {
    error.value = 'Select at least one service';
    return;
  }

  error.value = '';
  alert('Registration successful!');
  router.push('/');
};

</script>