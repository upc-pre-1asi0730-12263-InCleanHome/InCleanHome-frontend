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
            <div class="map-marker" style="top: 30%; left: 45%" title="Catalina Lopez">📍</div>
            <div class="map-marker" style="top: 50%; left: 52%" title="Maria Garcia">📍</div>
            
            <iframe
              width="100%"
              height="100%"
              style="border:0"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15602.57147472488!2d-77.01243174999999!3d-12.1023908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c86699368021%3A0x6b1478148b321853!2sSan%20Borja!5e0!3m2!1ses-419!2spe!4v1715525000000!5m2!1ses-419!2spe"
            >
            </iframe>
          </div>
          <div class="map-info">
            <p>Se encontraron 25 trabajadoras en distritos cercanos a {{ selectedDistrict }}.</p>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <header class="welcome-banner worker-theme">
        <p>🔔 ¡Bienvenida {{ userName }}, Revisa tus solicitudes de trabajo!</p>
      </header>

      <section class="worker-dashboard">
        <div class="dashboard-intro">
          <h2>¿Cómo te está yendo este mes?</h2>
          <span class="date-range">Del 1 de Abril hasta el día de hoy</span>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Ingresos</span>
            <div class="stat-value text-success">S/ 550</div>
            <small>En 14 transacciones</small>
          </div>
          <div class="stat-card">
            <span class="stat-label">Ganancias</span>
            <div class="stat-value">S/ 495</div>
          </div>
          <div class="stat-card">
            <span class="stat-label">Servicios Realizados</span>
            <div class="stat-value">4</div>
          </div>
          <div class="stat-card">
            <span class="stat-label">Comisión mensual a pagar</span>
            <div class="stat-value text-warning">S/ 55</div>
            <small>Basado en 10% del total</small>
          </div>
        </div>

        <div class="news-section">
          <h3>NOVEDADES:</h3>
          <div class="news-card">
            <div class="news-dot"></div>
            <p>¡Somos más de 500 usuarios!</p>
          </div>
        </div>

        <div class="charts-grid">
          <div class="chart-container">
            <h3>Distritos con más solicitudes</h3>
            <div class="bar-chart">
              <div class="bar" style="height: 80%" data-label="Breña"><span>40</span></div>
              <div class="bar" style="height: 65%" data-label="Cercado"><span>32</span></div>
              <div class="bar" style="height: 50%" data-label="S. Isidro"><span>25</span></div>
              <div class="bar" style="height: 35%" data-label="Surco"><span>18</span></div>
            </div>
          </div>

          <div class="chart-container">
            <h3>Servicios más solicitados</h3>
            <div class="doughnut-content">
              <div class="doughnut-chart"></div>
              <ul class="chart-legend">
                <li><span class="dot" style="background: #00c896"></span> Limpieza (60%)</li>
                <li><span class="dot" style="background: #2563eb"></span> Cocina (15%)</li>
                <li><span class="dot" style="background: #f59e0b"></span> Niños (10%)</li>
                <li><span class="dot" style="background: #94a3b8"></span> Otros (15%)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Lógica de tipo de usuario: 'client' o 'worker'
const userType = ref('client'); 
const userName = ref('Valeria');
const selectedDistrict = ref('San Borja');

// Datos de muestra para el catálogo de trabajadoras
const sampleWorkers = ref([
  { id: 1, name: 'Catalina Lopez', district: 'San Isidro', rating: 4.9, reviews: 500, price: 150.00 },
  { id: 2, name: 'Maria Garcia', district: 'Miraflores', rating: 4.8, reviews: 320, price: 120.00 }
]);
</script>

<!--

<script setup>
import { ref, computed } from 'vue';
// 1. Importa tu store de autenticación (Asegúrate de que el archivo exista en esa ruta)
import { useAuthStore } from '@/User-Management/application/auth-store'; 

const authStore = useAuthStore();

// 2. Convierte userType en una propiedad computada
// Esto hará que la vista cambie automáticamente cuando el usuario inicie sesión
const userType = computed(() => authStore.currentUser?.role || 'client'); 

const userName = computed(() => authStore.currentUser?.name || 'Invitado');
const selectedDistrict = ref('San Borja');

const sampleWorkers = ref([
  { id: 1, name: 'Catalina Lopez', district: 'San Isidro', rating: 4.9, reviews: 500, price: 150.00 },
  { id: 2, name: 'Maria Garcia', district: 'Miraflores', rating: 4.8, reviews: 320, price: 120.00 }
]);
</script>

-->