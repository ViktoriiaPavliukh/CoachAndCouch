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
      const { data } = await privateAPI.get("/booking");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async ({ timeslots }, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      const requestBody = {
        timeslots: timeslots,
      };
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;
      const { data } = await privateAPI.post("/booking", requestBody);
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

export const fetchTeacherSlots = createAsyncThunk(
  "teacherSlots/fetchTeacherSlots",
  async (id, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;
      const { data } = await privateAPI.get(`/adverts/${id}/timeslots/`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const acceptBooking = createAsyncThunk(
  "bookings/acceptBooking",
  async ({ bookingId, languageId, info }, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      console.log(persistToken);
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;

      const requestBody = {
        bookingId,
        languageId,
        info,
      };

      // Make the POST request to /booking/accept
      const { data } = await privateAPI.post("/booking/accept", requestBody);

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
