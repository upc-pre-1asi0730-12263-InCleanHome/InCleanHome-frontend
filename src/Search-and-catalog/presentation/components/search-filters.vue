<script setup>
import { computed } from 'vue'
import { useSearchStore } from '../../application/search-store.js'

const store = useSearchStore()

const serviceTypes = [
  { value: '',          label: 'Todos los servicios' },
  { value: 'cleaning',   label: '🧹 Limpieza' },
  { value: 'cooking',    label: '🍳 Cocina' },
  { value: 'garden',     label: '🌿 Jardín' },
  { value: 'caregiving', label: '🤝 Cuidados' },
]

const districts = [
  { value: '', label: 'Todos los distritos' },
  { value: 'Miraflores',      label: 'Miraflores' },
  { value: 'San Isidro',      label: 'San Isidro' },
  { value: 'Surco',           label: 'Surco' },
  { value: 'La Molina',       label: 'La Molina' },
  { value: 'San Borja',       label: 'San Borja' },
  { value: 'Jesús María',     label: 'Jesús María' },
  { value: 'Lince',           label: 'Lince' },
  { value: 'Pueblo Libre',    label: 'Pueblo Libre' },
  { value: 'Magdalena',       label: 'Magdalena' },
  { value: 'San Miguel',      label: 'San Miguel' },
  { value: 'Barranco',        label: 'Barranco' },
  { value: 'Chorrillos',      label: 'Chorrillos' },
  { value: 'San Juan de Lurigancho', label: 'SJL' },
]

const ratings = [
  { value: '',    label: 'Cualquier calificación' },
  { value: '4.5', label: '⭐ 4.5+ estrellas' },
  { value: '4',   label: '⭐ 4+ estrellas' },
  { value: '3',   label: '⭐ 3+ estrellas' },
]

const languages = [
  { value: '',   label: 'Cualquier idioma' },
  { value: 'es', label: '🇵🇪 Español' },
  { value: 'en', label: '🇺🇸 Inglés' },
]

const availabilityDays = [
  { value: '',          label: 'Cualquier día' },
  { value: 'monday',    label: 'Lunes' },
  { value: 'tuesday',   label: 'Martes' },
  { value: 'wednesday', label: 'Miércoles' },
  { value: 'thursday',  label: 'Jueves' },
  { value: 'friday',    label: 'Viernes' },
  { value: 'saturday',  label: 'Sábado' },
  { value: 'sunday',    label: 'Domingo' },
]

const sortOptions = [
  { value: 'rating',      label: '⭐ Mejor calificadas' },
  { value: 'reviewCount', label: '💬 Más reseñas' },
  { value: 'hourlyRate',  label: '💰 Menor tarifa' },
]

const activeFilterCount = computed(() => {
  const f = store.filters
  return [f.serviceType, f.district, f.minRating, f.language, f.availability]
    .filter(Boolean).length
})
</script>

<template>
  <aside class="filter-panel">
    <div class="filter-header">
      <h2 class="filter-title">
        <i class="pi pi-sliders-h" />
        Filtros
      </h2>
      <button
        v-if="activeFilterCount > 0"
        class="clear-btn"
        @click="store.clearFilters()"
      >
        Limpiar ({{ activeFilterCount }})
      </button>
    </div>

    <!-- Search query -->
    <div class="filter-group">
      <label class="filter-label">Buscar por nombre</label>
      <div class="search-input-wrapper">
        <i class="pi pi-search input-icon" />
        <input
          v-model="store.filters.query"
          type="text"
          class="filter-input"
          placeholder="Ej: María González"
        />
      </div>
    </div>

    <!-- Service type -->
    <div class="filter-group">
      <label class="filter-label">Tipo de servicio</label>
      <select v-model="store.filters.serviceType" class="filter-select">
        <option v-for="opt in serviceTypes" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <!-- District -->
    <div class="filter-group">
      <label class="filter-label">Distrito</label>
      <select v-model="store.filters.district" class="filter-select">
        <option v-for="opt in districts" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <!-- Rating -->
    <div class="filter-group">
      <label class="filter-label">Calificación mínima</label>
      <select v-model="store.filters.minRating" class="filter-select">
        <option v-for="opt in ratings" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <!-- Language -->
    <div class="filter-group">
      <label class="filter-label">Idioma</label>
      <select v-model="store.filters.language" class="filter-select">
        <option v-for="opt in languages" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <!-- Availability -->
    <div class="filter-group">
      <label class="filter-label">Disponibilidad</label>
      <select v-model="store.filters.availability" class="filter-select">
        <option v-for="opt in availabilityDays" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <div class="divider" />

    <!-- Sort by -->
    <div class="filter-group">
      <label class="filter-label">Ordenar por</label>
      <div class="sort-options">
        <label
          v-for="opt in sortOptions"
          :key="opt.value"
          class="sort-radio"
          :class="{ active: store.filters.sortBy === opt.value }"
        >
          <input type="radio" v-model="store.filters.sortBy" :value="opt.value" hidden />
          {{ opt.label }}
        </label>
      </div>
    </div>

    <button class="apply-btn" @click="store.search()">
      <i class="pi pi-search" />
      Buscar profesionales
    </button>
  </aside>
</template>

<style scoped>
.filter-panel {
  background: #ffffff;
  border: 1.5px solid #e2edf5;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: fit-content;
  position: sticky;
  top: 24px;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-title {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #1a2e4a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-title .pi {
  color: #00b272;
}

.clear-btn {
  background: none;
  border: 1px solid #e2edf5;
  color: #7a8fa6;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  border-color: #00b272;
  color: #00b272;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 11px;
  font-weight: 700;
  color: #7a8fa6;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.search-input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #7a8fa6;
  font-size: 13px;
}

.filter-input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  background: #f7fafc;
  border: 1.5px solid #e2edf5;
  border-radius: 8px;
  font-size: 14px;
  color: #1a2e4a;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;
  box-sizing: border-box;
}

.filter-input:focus {
  border-color: #00b272;
  background: #ffffff;
}

.filter-select {
  width: 100%;
  padding: 10px 12px;
  background: #f7fafc;
  border: 1.5px solid #e2edf5;
  border-radius: 8px;
  font-size: 14px;
  color: #1a2e4a;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a8fa6' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

.filter-select:focus {
  border-color: #00b272;
}

.divider {
  height: 1px;
  background: #e2edf5;
  margin: -4px 0;
}

/* Sort radio buttons */
.sort-options {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sort-radio {
  padding: 9px 14px;
  border-radius: 8px;
  border: 1.5px solid #e2edf5;
  font-size: 13px;
  font-weight: 600;
  color: #3a4a5c;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-radio:hover {
  border-color: #00b272;
  color: #00b272;
}

.sort-radio.active {
  background: #e6f9f2;
  border-color: #00b272;
  color: #009960;
}

/* Apply button */
.apply-btn {
  width: 100%;
  padding: 13px;
  background: #1a2e4a;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s ease, transform 0.15s ease;
  margin-top: -4px;
}

.apply-btn:hover {
  background: #3a4a5c;
  transform: translateY(-1px);
}
</style>
