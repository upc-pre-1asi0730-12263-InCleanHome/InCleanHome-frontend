<script setup>
import { computed } from 'vue'

const props = defineProps({
  worker: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['back', 'book'])

const serviceLabels = {
  cleaning:   'Limpieza',
  cooking:    'Cocina',
  garden:     'Jardín',
  caregiving: 'Cuidados',
}

const dayLabels = {
  monday:    'Lun',
  tuesday:   'Mar',
  wednesday: 'Mié',
  thursday:  'Jue',
  friday:    'Vie',
  saturday:  'Sáb',
  sunday:    'Dom',
}

const allDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const languageLabels = { es: '🇵🇪 Español', en: '🇺🇸 Inglés' }

const fallbackAvatar = computed(() =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(props.worker.fullName)}&background=00B272&color=fff&size=256`
)
</script>

<template>
  <div class="profile-detail">
    <!-- Back button -->
    <button class="back-btn" @click="emit('back')">
      <i class="pi pi-arrow-left" />
      Volver al catálogo
    </button>

    <div class="profile-grid">
      <!-- Left column: avatar + quick info -->
      <aside class="profile-sidebar">
        <div class="avatar-container">
          <img
            :src="worker.profilePicture || fallbackAvatar"
            :alt="`Foto de ${worker.fullName}`"
            class="profile-avatar"
            @error="(e) => (e.target.src = fallbackAvatar)"
          />
          <div v-if="worker.isVerified" class="verified-pill">
            <i class="pi pi-verified" /> Verificada
          </div>
        </div>

        <div class="quick-stats">
          <div class="stat">
            <span class="stat-value">{{ worker.ratingDisplay }}</span>
            <span class="stat-label">Calificación</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ worker.reviewCount }}</span>
            <span class="stat-label">Reseñas</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ worker.yearsExperience }}</span>
            <span class="stat-label">Años exp.</span>
          </div>
        </div>

        <div class="price-box">
          <span class="price-label">Tarifa por hora</span>
          <span class="price-value">S/ {{ worker.hourlyRate }}</span>
        </div>

        <button class="book-btn" @click="emit('book', worker)">
          <i class="pi pi-calendar-plus" />
          Contratar ahora
        </button>
      </aside>

      <!-- Right column: details -->
      <main class="profile-main">
        <div class="name-section">
          <h1 class="profile-name">{{ worker.fullName }}</h1>
          <p class="profile-location">
            <i class="pi pi-map-marker" />
            {{ worker.district || worker.location }}
          </p>
        </div>

        <!-- Bio -->
        <section class="profile-section" v-if="worker.bio">
          <h2 class="section-title">Acerca de mí</h2>
          <p class="bio-text">{{ worker.bio }}</p>
        </section>

        <!-- Services -->
        <section class="profile-section">
          <h2 class="section-title">Servicios ofrecidos</h2>
          <div class="services-grid">
            <div
              v-for="svc in worker.serviceTypes"
              :key="svc"
              class="service-card"
            >
              <span class="service-name">{{ serviceLabels[svc] || svc }}</span>
            </div>
          </div>
        </section>

        <!-- Skills -->
        <section class="profile-section" v-if="worker.skills?.length">
          <h2 class="section-title">Habilidades</h2>
          <div class="skills-list">
            <span v-for="skill in worker.skills" :key="skill" class="skill-chip">
              <i class="pi pi-check" />{{ skill }}
            </span>
          </div>
        </section>

        <!-- Availability -->
        <section class="profile-section">
          <h2 class="section-title">Disponibilidad semanal</h2>
          <div class="availability-grid">
            <div
              v-for="day in allDays"
              :key="day"
              class="day-chip"
              :class="{ available: worker.isAvailableOn(day) }"
            >
              {{ dayLabels[day] }}
            </div>
          </div>
        </section>

        <!-- Languages -->
        <section class="profile-section" v-if="worker.languages?.length">
          <h2 class="section-title">Idiomas</h2>
          <div class="skills-list">
            <span v-for="lang in worker.languages" :key="lang" class="skill-chip">
              {{ languageLabels[lang] || lang }}
            </span>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.profile-detail {
  animation: fadeInUp 0.35s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1.5px solid #e2edf5;
  color: #3a4a5c;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 24px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  border-color: #00b272;
  color: #00b272;
}

.profile-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 28px;
  align-items: start;
}

/* Sidebar */
.profile-sidebar {
  background: #ffffff;
  border: 1.5px solid #e2edf5;
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 24px;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e6f9f2;
  box-shadow: 0 6px 24px rgba(0, 178, 114, 0.2);
}

.verified-pill {
  background: #e6f9f2;
  color: #009960;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  text-align: center;
  padding: 16px 0;
  border-top: 1px solid #e2edf5;
  border-bottom: 1px solid #e2edf5;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.stat-value {
  font-family: 'Nunito', sans-serif;
  font-size: 22px;
  font-weight: 900;
  color: #1a2e4a;
}

.stat-label {
  font-size: 11px;
  color: #7a8fa6;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.price-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7fafc;
  border: 1.5px solid #e2edf5;
  border-radius: 12px;
  padding: 14px;
  gap: 4px;
}

.price-label {
  font-size: 11px;
  color: #7a8fa6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
}

.price-value {
  font-family: 'Nunito', sans-serif;
  font-size: 28px;
  font-weight: 900;
  color: #009960;
}

.book-btn {
  width: 100%;
  padding: 14px;
  background: #00b272;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
}

.book-btn:hover {
  background: #009960;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 178, 114, 0.3);
}

/* Main */
.profile-main {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.name-section {
  border-bottom: 2px solid #e2edf5;
  padding-bottom: 20px;
}

.profile-name {
  font-family: 'Nunito', sans-serif;
  font-size: 32px;
  font-weight: 900;
  color: #1a2e4a;
  margin: 0 0 8px;
}

.profile-location {
  font-size: 15px;
  color: #7a8fa6;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.profile-location .pi {
  color: #00b272;
}

.profile-section {
  background: #ffffff;
  border: 1.5px solid #e2edf5;
  border-radius: 16px;
  padding: 22px 24px;
}

.section-title {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #1a2e4a;
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 18px;
  background: #00b272;
  border-radius: 2px;
  display: inline-block;
}

.bio-text {
  font-size: 15px;
  color: #3a4a5c;
  line-height: 1.7;
  margin: 0;
}

.services-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.service-card {
  background: #e6f9f2;
  border: 1.5px solid #00b272;
  border-radius: 10px;
  padding: 10px 18px;
}

.service-name {
  font-weight: 700;
  font-size: 14px;
  color: #009960;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f7fafc;
  border: 1px solid #e2edf5;
  color: #3a4a5c;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
}

.skill-chip .pi {
  color: #00b272;
  font-size: 11px;
}

.availability-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.day-chip {
  text-align: center;
  padding: 10px 6px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  background: #f7fafc;
  color: #7a8fa6;
  border: 1.5px solid #e2edf5;
  transition: all 0.2s ease;
}

.day-chip.available {
  background: #e6f9f2;
  color: #009960;
  border-color: #00b272;
}

@media (max-width: 768px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }

  .profile-sidebar {
    position: static;
  }

  .availability-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
