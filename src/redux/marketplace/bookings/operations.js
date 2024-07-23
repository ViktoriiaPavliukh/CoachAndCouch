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

export const fetchTeacherBookings = createAsyncThunk(
  "bookings/fetchTeacherBookings",
  async (_, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;
      console.log(persistToken);
      const { data } = await privateAPI.get("/booking");
      console.log(data);
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
      const persistToken = thunkAPI.getState().auth.accessToken;

      console.log(timeslots);
      const requestBody = {
        timeslots: timeslots,
      };
      console.log(requestBody);
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;
      const { data } = await privateAPI.post("/booking", requestBody);
      console.log("Response data:", data);
      return data;
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchStudentBookings",
  async (userId, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;
      const { data } = await privateAPI.get(`/booking/${userId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
