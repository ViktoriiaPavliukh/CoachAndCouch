import { createSlice } from "@reduxjs/toolkit";
import { fetchTeacherSlots } from "./operations";

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
      });
  },
});

export const teacherBookingReducer = teacherBookingSlice.reducer;
