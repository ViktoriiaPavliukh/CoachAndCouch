import { createSlice } from "@reduxjs/toolkit";
import { fetchTeacherSlots, markBookingInactive } from "./operations";

const teacherBookingSlice = createSlice({
  name: "teacherSlots",
  initialState: {
    userBookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherSlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeacherSlots.fulfilled, (state, action) => {
        state.userBookings = action.payload;
      })
      .addCase(fetchTeacherSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markBookingInactive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markBookingInactive.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userBookings.findIndex(
          (booking) => booking.id === action.meta.arg
        );
        if (index !== -1) {
          state.userBookings[index].isActive = false;
        }
      })
      .addCase(markBookingInactive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const teacherBookingReducer = teacherBookingSlice.reducer;
