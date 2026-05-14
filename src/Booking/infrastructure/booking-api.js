export class BookingApiService {
  constructor() {
    const saved = localStorage.getItem('in_clean_home_bookings')
    this.mockBookings = saved ? JSON.parse(saved) : [
      {
        id: 1,
        client_id: 1,
        worker_id: 101,
        worker_name: 'María López',
        date: '2026-05-20',
        start_time: '09:00',
        end_time: '12:00',
        status: 'Confirmed',
        instructions: 'Limpiar cocina y baños con cuidado especial.',
        total_amount: 90.00
      },
      {
        id: 2,
        client_id: 1,
        worker_id: 102,
        worker_name: 'Ana Pérez',
        date: '2026-05-25',
        start_time: '14:00',
        end_time: '17:00',
        status: 'Pending',
        instructions: '',
        total_amount: 75.00
      }
    ]
  }

  _persist() {
    localStorage.setItem('in_clean_home_bookings', JSON.stringify(this.mockBookings))
  }

  async getAllBookings() {
    return new Promise(resolve => {
      setTimeout(() => resolve({ data: this.mockBookings }), 50)
    })
  }

  async createBooking(bookingData) {
    return new Promise(resolve => {
      setTimeout(() => {
        const nextId = this.mockBookings.length > 0
          ? Math.max(...this.mockBookings.map(b => b.id)) + 1
          : 1
        const newBooking = { ...bookingData, id: nextId }
        this.mockBookings.push(newBooking)
        this._persist()
        resolve({ data: newBooking })
      }, 50)
    })
  }

  async updateBookingStatus(id, status) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const booking = this.mockBookings.find(b => b.id === id)
        if (!booking) return reject(new Error('Booking not found'))
        booking.status = status
        this._persist()
        resolve({ data: booking })
      }, 50)
    })
  }
}
