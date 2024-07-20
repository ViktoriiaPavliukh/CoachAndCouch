import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateAPI } from "../../../services/privateAPI";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async ({ startDate, endDate }, thunkAPI) => {
    try {
      const formattedStartDate = moment(startDate).toISOString();
      const formattedEndDate = moment(endDate).toISOString();

      const persistToken = thunkAPI.getState().auth.accessToken;
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;

      const { data } = await privateAPI.get(
        `/bookings?start=${formattedStartDate}&end=${formattedEndDate}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const createBooking = createAsyncThunk(
//   "bookings/createBooking",
//   async ({ bookingId, languageId }, thunkAPI) => {
//     try {
//       console.log(bookingId, languageId);
//       const persistToken = thunkAPI.getState().auth.accessToken;
//       privateAPI.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${persistToken}`;
//       const { data } = await privateAPI.post("/booking/accept", {
//         bookingId,
//         languageId,
//       });
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async ({ timeslots }, thunkAPI) => {
    try {
      console.log(timeslots);
      const persistToken = thunkAPI.getState().auth.accessToken;
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;
      const { data } = await privateAPI.post("/booking", { timeslots });
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
