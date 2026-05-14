
export class SearchEntity {
  constructor({
    id = null,
    firstName = '',
    lastName = '',
    profilePicture = '',
    serviceTypes = [],   // ['cleaning', 'cooking', 'garden', 'caregiving']
    location = '',
    district = '',
    rating = 0,
    reviewCounts = 0,
    hourlyRate = 0,
    availability = [],   // días disponibles: ['monday','tuesday',...]
    languages = [],      // ['es','en']
    isVerified = false,
    bio = '',
    yearsExperience = 0,
    skills = [],
  } = {}) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.profilePicture = profilePicture
    this.serviceTypes = serviceTypes
    this.location = location
    this.district = district
    this.rating = rating
    this.reviewCount = reviewCount
    this.hourlyRate = hourlyRate
    this.availability = availability
    this.languages = languages
    this.isVerified = isVerified
    this.bio = bio
    this.yearsExperience = yearsExperience
    this.skills = skills
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim()
  }

  get ratingDisplay() {
    return Number(this.rating).toFixed(1)
  }

  get primaryService() {
    return this.serviceTypes[0] ?? null
  }

  hasServiceType(type) {
    return this.serviceTypes.includes(type)
  }

  isAvailableOn(day) {
    return this.availability.includes(day)
  }

  matchesFilters({ serviceType, location, minRating, language, availability }) {
    if (serviceType && !this.hasServiceType(serviceType)) return false
    if (location && this.district.toLowerCase() !== location.toLowerCase()) return false
    if (minRating && this.rating < minRating) return false
    if (language && !this.languages.includes(language)) return false
    if (availability && !this.isAvailableOn(availability)) return false
    return true
  }
}
