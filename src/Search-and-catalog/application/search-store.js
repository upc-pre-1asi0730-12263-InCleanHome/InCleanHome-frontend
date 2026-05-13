import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { SearchApi } from '../infrastructure/search-api.js'


export const useSearchStore = defineStore('search', () => {
  // ── State ─────────────────────────────────────────────────────────────────
  const workers       = ref([])
  const selectedWorker = ref(null)
  const isLoading     = ref(false)
  const error         = ref(null)

  const filters = ref({
    serviceType:  '',
    district:     '',
    minRating:    '',
    language:     '',
    availability: '',
    sortBy:       'rating',
    query:        '',        // búsqueda textual por nombre
  })

  // ── Getters ───────────────────────────────────────────────────────────────
  const filteredWorkers = computed(() => {
    let result = [...workers.value]

    // Filtro textual por nombre
    if (filters.value.query.trim()) {
      const q = filters.value.query.toLowerCase()
      result = result.filter((w) =>
        w.fullName.toLowerCase().includes(q) ||
        w.bio.toLowerCase().includes(q) ||
        w.skills.some((s) => s.toLowerCase().includes(q))
      )
    }

    // Filtros adicionales vía método de entidad
    result = result.filter((w) =>
      w.matchesFilters({
        serviceType:  filters.value.serviceType || undefined,
        location:     filters.value.district || undefined,
        minRating:    filters.value.minRating ? Number(filters.value.minRating) : undefined,
        language:     filters.value.language || undefined,
        availability: filters.value.availability || undefined,
      })
    )

    // Ordenamiento
    if (filters.value.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (filters.value.sortBy === 'hourlyRate') {
      result.sort((a, b) => a.hourlyRate - b.hourlyRate)
    } else if (filters.value.sortBy === 'reviewCount') {
      result.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return result
  })

  const totalResults = computed(() => filteredWorkers.value.length)

  const hasResults = computed(() => totalResults.value > 0)

  // ── Actions ───────────────────────────────────────────────────────────────


  async function loadAll() {
    isLoading.value = true
    error.value = null
    try {
      workers.value = await SearchApi.getAll()
    } catch (err) {
      error.value = 'Error al cargar el catálogo. Intenta de nuevo.'
      console.error('[SearchStore] loadAll:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Busca trabajadores aplicando los filtros actuales contra el servidor.
   */
  async function search() {
    isLoading.value = true
    error.value = null
    try {
      workers.value = await SearchApi.search(filters.value)
    } catch (err) {
      error.value = 'Error al buscar. Intenta de nuevo.'
      console.error('[SearchStore] search:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Carga el perfil de una trabajadora específica.
   * @param {number|string} id
   */
  async function loadWorkerById(id) {
    isLoading.value = true
    error.value = null
    try {
      selectedWorker.value = await SearchApi.getById(id)
    } catch (err) {
      error.value = 'Perfil no encontrado.'
      console.error('[SearchStore] loadWorkerById:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Actualiza un filtro específico.
   * @param {string} key - Clave del filtro
   * @param {*} value - Nuevo valor
   */
  function setFilter(key, value) {
    if (key in filters.value) {
      filters.value[key] = value
    }
  }

  /**
   * Resetea todos los filtros a sus valores iniciales.
   */
  function clearFilters() {
    filters.value = {
      serviceType:  '',
      district:     '',
      minRating:    '',
      language:     '',
      availability: '',
      sortBy:       'rating',
      query:        '',
    }
  }

  /**
   * Limpia el trabajador seleccionado.
   */
  function clearSelectedWorker() {
    selectedWorker.value = null
  }

  return {
    // state
    workers,
    selectedWorker,
    isLoading,
    error,
    filters,
    // getters
    filteredWorkers,
    totalResults,
    hasResults,
    // actions
    loadAll,
    search,
    loadWorkerById,
    setFilter,
    clearFilters,
    clearSelectedWorker,
  }
})
