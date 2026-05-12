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
            <img src="https://images.squarespace-cdn.com/content/v1/54905286e4b01066986e927e/1585093766723-R0R686K8N7M4339P5E7G/Google+Maps+Satellite.jpg" alt="Mapa de Lima" />
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