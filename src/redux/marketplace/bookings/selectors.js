export const selectBookings = (state) => state.bookings.bookings;
export const selectBookingLoading = (state) => state.bookings.loading;
export const selectBookingError = (state) => state.bookings.error;

export const selectTeacherBookings = (state) => state.teacherSlots.userBookings;
export const selectTeacherBookingsLoading = (state) =>
  state.teacherSlots.loading;
export const selectTeacherBookingsError = (state) => state.teacherSlots.error;
export const selectTeacherSlots = (state) => state.teacherSlots.slots;
export const selectTeacherSlotsLoading = (state) => state.teacherSlots.loading;
export const selectTeacherSlotsError = (state) => state.teacherSlots.error;
