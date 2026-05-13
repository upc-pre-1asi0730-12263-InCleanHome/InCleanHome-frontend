import { defineStore } from 'pinia'
import { BookingApiService } from '../infrastructure/booking-api'
import { BookingResource } from '../infrastructure/booking-resource'

const apiService = new BookingApiService()

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: [],
    loading: false,
    error: null
  }),
  getters: {
    pendingBookings: state => state.bookings.filter(b => b.status === 'Pending'),
    confirmedBookings: state => state.bookings.filter(b => b.status === 'Confirmed'),
  },
  actions: {
    async fetchBookings() {
      this.loading = true
      try {
        const response = await apiService.getAllBookings()
        this.bookings = BookingResource.toEntityList(response.data)
      } catch (err) {
        this.error = 'Error al cargar las reservas'
      } finally {
        this.loading = false
      }
    },

    async addBooking(bookingData) {
      this.loading = true
      try {
        const response = await apiService.createBooking(bookingData)
        const newEntity = BookingResource.toEntity(response.data)
        this.bookings.push(newEntity)
        return true
      } catch (err) {
        this.error = 'Error al crear la reserva'
        return false
      } finally {
        this.loading = false
      }
    },

    async cancelBooking(id) {
      try {
        await apiService.updateBookingStatus(id, 'Cancelled')
        const booking = this.bookings.find(b => b.id === id)
        if (booking) booking.status = 'Cancelled'
        return true
      } catch (err) {
        this.error = 'Error al cancelar la reserva'
        return false
      }
    }
  }
})
