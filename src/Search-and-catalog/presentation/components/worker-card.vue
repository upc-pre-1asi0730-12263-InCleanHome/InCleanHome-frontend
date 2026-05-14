<script setup>
import { computed } from 'vue'

const props = defineProps({
  worker: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['view-profile'])

const serviceLabels = {
  cleaning:   'Limpieza',
  cooking:    'Cocina',
  garden:     'Jardín',
  caregiving: 'Cuidados',
}

const serviceIcons = {
  cleaning:   'pi-sparkles',
  cooking:    'pi-star',
  garden:     'pi-verified',
  caregiving: 'pi-heart',
}

const ratingStars = computed(() => {
  const full  = Math.floor(props.worker.rating)
  const half  = props.worker.rating - full >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return { full, half, empty }
})

const fallbackAvatar = computed(() =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(props.worker.fullName)}&background=00B272&color=fff&size=128`
)
</script>

<template>
  <article class="worker-card" @click="emit('view-profile', worker.id)" tabindex="0" role="button" :aria-label="`Ver perfil de ${worker.fullName}`">
    <!-- Verified badge -->
    <div v-if="worker.isVerified" class="verified-badge">
      <i class="pi pi-verified" />
      Verificada
    </div>

    <!-- Avatar -->
    <div class="card-avatar-wrapper">
      <img
        :src="worker.profilePicture || fallbackAvatar"
        :alt="`Foto de ${worker.fullName}`"
        class="card-avatar"
        @error="(e) => (e.target.src = fallbackAvatar)"
      />
    </div>

    <!-- Info -->
    <div class="card-body">
      <h3 class="worker-name">{{ worker.fullName }}</h3>
      <p class="worker-location">
        <i class="pi pi-map-marker" />
        {{ worker.district || worker.location }}
      </p>

      <!-- Rating -->
      <div class="rating-row">
        <span class="stars">
          <i v-for="n in ratingStars.full"  :key="`f-${n}`" class="pi pi-star-fill" />
          <i v-for="n in ratingStars.half"  :key="`h-${n}`" class="pi pi-star-half-fill" />
          <i v-for="n in ratingStars.empty" :key="`e-${n}`" class="pi pi-star" />
        </span>
        <span class="rating-value">{{ worker.ratingDisplay }}</span>
        <span class="review-count">({{ worker.reviewCount }} reseñas)</span>
      </div>

      <!-- Service chips -->
      <div class="service-chips">
        <span
          v-for="svc in worker.serviceTypes"
          :key="svc"
          class="chip"
        >
          <i :class="`pi ${serviceIcons[svc] || 'pi-tag'}`" />
          {{ serviceLabels[svc] || svc }}
        </span>
      </div>

      <!-- Footer -->
      <div class="card-footer">
        <span class="hourly-rate">S/ {{ worker.hourlyRate }}<small>/hr</small></span>
        <button class="btn-view" @click.stop="emit('view-profile', worker.id)">
          Ver perfil
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.worker-card {
  position: relative;
  background: #ffffff;
  border: 1.5px solid #e2edf5;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.25s ease;
  display: flex;
  flex-direction: column;
}

.worker-card:hover,
.worker-card:focus {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(26, 46, 74, 0.14);
  border-color: #00b272;
  outline: none;
}

/* Verified badge */
.verified-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  background: #e6f9f2;
  color: #009960;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  letter-spacing: 0.3px;
}

/* Avatar */
.card-avatar-wrapper {
  width: 100%;
  height: 160px;
  background: linear-gradient(135deg, #e6f9f2 0%, #f7fafc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1.5px solid #e2edf5;
}

.card-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffffff;
  box-shadow: 0 4px 16px rgba(0, 178, 114, 0.25);
}

/* Body */
.card-body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.worker-name {
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  font-weight: 800;
  color: #1a2e4a;
  margin: 0;
  line-height: 1.3;
}

.worker-location {
  font-size: 13px;
  color: #7a8fa6;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.worker-location .pi {
  color: #00b272;
  font-size: 12px;
}

/* Rating */
.rating-row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars .pi {
  color: #f59e0b;
  font-size: 13px;
}

.rating-value {
  font-weight: 700;
  color: #1a2e4a;
  font-size: 14px;
}

.review-count {
  font-size: 12px;
  color: #7a8fa6;
}

/* Service chips */
.service-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
}

.chip {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #e6f9f2;
  color: #009960;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.2px;
}

.chip .pi {
  font-size: 11px;
}

/* Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #e2edf5;
}

.hourly-rate {
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  font-weight: 900;
  color: #1a2e4a;
}

.hourly-rate small {
  font-size: 13px;
  font-weight: 500;
  color: #7a8fa6;
}

.btn-view {
  background: #00b272;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.btn-view:hover {
  background: #009960;
  transform: translateY(-1px);
}
</style>
