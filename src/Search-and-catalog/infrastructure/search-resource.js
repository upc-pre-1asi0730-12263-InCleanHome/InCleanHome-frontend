export class SearchResource {
  constructor({
    id,
    first_name,
    last_name,
    profile_picture,
    service_types,
    location,
    district,
    rating,
    review_count,
    hourly_rate,
    availability,
    languages,
    is_verified,
    bio,
    years_experience,
    skills,
  } = {}) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.profile_picture = profile_picture
    this.service_types = service_types
    this.location = location
    this.district = district
    this.rating = rating
    this.review_count = review_count
    this.hourly_rate = hourly_rate
    this.availability = availability
    this.languages = languages
    this.is_verified = is_verified
    this.bio = bio
    this.years_experience = years_experience
    this.skills = skills
  }
}
