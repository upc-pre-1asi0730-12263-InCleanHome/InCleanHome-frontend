<template>
  <div class="home-container">
    <template v-if="userType === 'client'">
      <header class="welcome-banner">
        <p>👋 ¡Hola, {{ userName }}! Encuentra personal de limpieza confiable!</p>
      </header>

      <section class="services-section">
        <div class="section-header">
          <h2>Trabajadoras disponibles:</h2>
        </div>
        <div class="services-grid">
          <div v-for="worker in sampleWorkers" :key="worker.id" class="service-card">
            <div class="card-avatar">
              <span class="avatar-placeholder">👤</span>
            </div>
            <div class="card-content">
              <h3>{{ worker.name }} <span class="verified">✔</span></h3>
              <p class="role">Limpiadora en {{ worker.district }}</p>
              <div class="rating">⭐ {{ worker.rating }} ({{ worker.reviews }} reseñas)</div>
              <p class="price">S/ {{ worker.price.toFixed(2) }} x hora</p>
            </div>
            <div class="card-actions">
              <button class="btn-outline">Ver Perfil</button>
              <button class="btn-primary">Contratar</button>
            </div>
          </div>
        </div>
      </section>

      <section class="services-section">
        <div class="section-header">
          <h2>Trabajadoras cerca de {{ selectedDistrict }}:</h2>
        </div>
        <div class="map-container">
          <div class="map-placeholder">
            <div class="map-marker" style="top: 30%; left: 40%" title="Miraflores: 5 Trabajadoras">📍</div>
            <div class="map-marker" style="top: 50%; left: 60%" title="San Borja: 8 Trabajadoras">📍</div>
            <div class="map-marker" style="top: 20%; left: 70%" title="Surco: 12 Trabajadoras">📍</div>
            
            <iframe
              width="100%"
              height="100%"
              style="border:0"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15602.16453965578!2d-77.01235185!3d-12.10915635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c86686000001%3A0x6734c568f5c355c!2sSan%20Borja!5e0!3m2!1ses!2spe!4v1715525000000!5m2!1ses!2spe"
            >
            </iframe>
            
          </div>
          <div class="map-info">
            <p>Se encontraron 25 trabajadoras en distritos cercanos.</p>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <header class="welcome-banner worker-theme">
        <p>🚀 ¡Bienvenida de nuevo! Tienes 3 nuevas solicitudes de servicio.</p>
      </header>
      <section class="main-content-card">
        <h3>Tu Resumen de Hoy</h3>
        <p>Próximo servicio: San Isidro - 2:00 PM</p>
        </section>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Lógica de usuario (Esto luego vendrá de tu AuthStore)
const userType = ref('client'); // Cambia a 'worker' para ver la otra vista
const userName = ref('Valeria');
const selectedDistrict = ref('San Borja');

// Perfiles de muestra para la vista de Cliente
const sampleWorkers = ref([
  { id: 1, name: 'Catalina Lopez', district: 'San Isidro', rating: 4.9, reviews: 500, price: 150.00 },
  { id: 2, name: 'Maria Garcia', district: 'Miraflores', rating: 4.8, reviews: 320, price: 120.00 }
]);
</script>