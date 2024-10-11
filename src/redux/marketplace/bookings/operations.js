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

export const fetchStudentBookings = createAsyncThunk(
  "bookings/fetchStudenBookings",
  async (studentId, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;
      const { data } = await privateAPI.get(`/booking/${studentId}`);
      console.log(data);
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

export const markBookingInactive = createAsyncThunk(
  "bookings/markBookingInactive",
  async (bookingId, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;
      const { data } = await privateAPI.patch(`/booking/${bookingId}`, {
        isActive: false,
      });

      return data;
    } catch (error) {
      console.error(
        "Error marking booking as inactive:",
        error.response ? error.response.data : error.message
      );
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async ({ bookingId, reason }, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      privateAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${persistToken}`;
      console.log(persistToken);
      const requestBody = { reason };

      const { data } = await privateAPI.post(
        `booking/delete/${bookingId}`,
        requestBody
      );

      return data;
    } catch (error) {
      console.error(
        "Error deleting booking:",
        error.response ? error.response.data : error.message
      );
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
