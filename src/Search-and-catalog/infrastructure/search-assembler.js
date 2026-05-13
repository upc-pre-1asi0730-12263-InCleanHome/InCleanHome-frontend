import { SearchEntity } from '../domain/model/search-entity.js'
import { SearchResource } from './search-resource.js'


export class SearchAssembler {
  /**
   * Convierte un objeto crudo de la API en una SearchEntity.
   * @param {Object} raw - Dato crudo de la API
   * @returns {SearchEntity}
   */
  static toEntity(raw) {
    return new SearchEntity({
      id: raw.id,
      firstName: raw.first_name ?? raw.firstName ?? '',
      lastName: raw.last_name ?? raw.lastName ?? '',
      profilePicture: raw.profile_picture ?? raw.profilePicture ?? '',
      serviceTypes: raw.service_types ?? raw.serviceTypes ?? [],
      location: raw.location ?? '',
      district: raw.district ?? '',
      rating: raw.rating ?? 0,
      reviewCount: raw.review_count ?? raw.reviewCount ?? 0,
      hourlyRate: raw.hourly_rate ?? raw.hourlyRate ?? 0,
      availability: raw.availability ?? [],
      languages: raw.languages ?? [],
      isVerified: raw.is_verified ?? raw.isVerified ?? false,
      bio: raw.bio ?? '',
      yearsExperience: raw.years_experience ?? raw.yearsExperience ?? 0,
      skills: raw.skills ?? [],
    })
  }

  /**
   * Convierte una lista de objetos crudos en una lista de SearchEntity.
   * @param {Array} rawList
   * @returns {SearchEntity[]}
   */
  static toEntityList(rawList = []) {
    return rawList.map((raw) => SearchAssembler.toEntity(raw))
  }

  /**
   * Convierte una SearchEntity a SearchResource (para enviar a la API).
   * @param {SearchEntity} entity
   * @returns {SearchResource}
   */
  static toResource(entity) {
    return new SearchResource({
      id: entity.id,
      first_name: entity.firstName,
      last_name: entity.lastName,
      profile_picture: entity.profilePicture,
      service_types: entity.serviceTypes,
      location: entity.location,
      district: entity.district,
      rating: entity.rating,
      review_count: entity.reviewCount,
      hourly_rate: entity.hourlyRate,
      availability: entity.availability,
      languages: entity.languages,
      is_verified: entity.isVerified,
      bio: entity.bio,
      years_experience: entity.yearsExperience,
      skills: entity.skills,
    })
  }
}
