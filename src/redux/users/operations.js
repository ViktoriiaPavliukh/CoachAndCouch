import { privateAPI } from "@/services/privateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../services/privateAPI";

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      token.set(persistToken);
      console.log(persistToken);
      const { data } = await privateAPI.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${persistToken}` },
      });

      return data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      token.set(persistToken);
      console.log(persistToken);
      const { data } = await privateAPI.get(`/users`, {
        headers: { Authorization: `Bearer ${persistToken}` },
      });
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFeedback = createAsyncThunk(
  "users/addFeedback",
  async (dataFeedback, thunkAPI) => {
    const { id, feedback } = dataFeedback;
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.post(`/users/${id}/feedback`, feedback);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getAllFeedbacks = createAsyncThunk(
  "users/getAllFeedbacks",
  async (id, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;

      token.set(userToken);
      const { data } = await privateAPI.get(`/users/${id}/feedback`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUserAsUser = createAsyncThunk(
  "users/deleteUser",
  async (_, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const userId = thunkAPI.getState().auth.user.id;
      await privateAPI.put(`/users`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendMessageFromUser = createAsyncThunk(
  "users/sendMessage",
  async ({ id, message }, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;

      await privateAPI.post(
        `/users/${id}/conversation`,
        { message },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      const response = await privateAPI.get(`/users/${id}/conversation`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const messages = response.data;
      return messages;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserMessages = createAsyncThunk(
  "users/getUserMessages",
  async (_, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      const response = await privateAPI.get(`/users/conversations`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const messages = response.data;
      return messages;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (editedData, thunkAPI) => {
    try {
      console.log(editedData);
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      console.log(userToken);
      const userId = thunkAPI.getState().auth.user.id;
      const { data } = await privateAPI.patch(`/users`, editedData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserPhoto = createAsyncThunk(
  "users/updateUserPhoto",
  async (photo, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      console.log(userToken);
      token.set(userToken);
      const { data } = await privateAPI.patch(`/users/photo`, photo, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserEmail = createAsyncThunk(
  "users/updateUserEmail",
  async (email, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.patch(
        `/users/email`,
        { email },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
