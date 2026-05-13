import axios from 'axios'
import { SearchAssembler } from './search-assembler.js'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const http = axios.create({
  baseURL: `${BASE_URL}/workers`,
  headers: { 'Content-Type': 'application/json' },
})


export const SearchApi = {
  /**
   * Obtiene todos los trabajadores del catálogo.
   * @returns {Promise<SearchEntity[]>}
   */
  async getAll() {
    const { data } = await http.get('/')
    return SearchAssembler.toEntityList(data)
  },

  /**
   * Obtiene un trabajador por su ID.
   * @param {number|string} id
   * @returns {Promise<SearchEntity>}
   */
  async getById(id) {
    const { data } = await http.get(`/${id}`)
    return SearchAssembler.toEntity(data)
  },

  /**
   * Busca trabajadores aplicando filtros desde el servidor.
   * @param {Object} filters
   * @param {string} [filters.serviceType]
   * @param {string} [filters.district]
   * @param {number} [filters.minRating]
   * @param {string} [filters.language]
   * @param {string} [filters.availability]
   * @param {string} [filters.sortBy]  - 'rating' | 'hourlyRate' | 'reviewCount'
   * @returns {Promise<SearchEntity[]>}
   */
  async search(filters = {}) {
    const params = {}
    if (filters.serviceType) params.serviceType = filters.serviceType
    if (filters.district)    params.district = filters.district
    if (filters.minRating)   params.minRating = filters.minRating
    if (filters.language)    params.language = filters.language
    if (filters.availability) params.availability = filters.availability
    if (filters.sortBy)      params.sortBy = filters.sortBy

    const { data } = await http.get('/', { params })
    return SearchAssembler.toEntityList(data)
  },

  /**
   * Obtiene los trabajadores destacados (rating >= 4.5).
   * @returns {Promise<SearchEntity[]>}
   */
  async getFeatured() {
    const { data } = await http.get('/', { params: { minRating: 4.5, _limit: 6 } })
    return SearchAssembler.toEntityList(data)
  },
}
