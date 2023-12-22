import { privateAPI } from "@/services/privateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../services/privateAPI";

export const getUserById = createAsyncThunk("users/getUserById", async (id, thunkAPI) => {
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
});

export const getCurrentUser = createAsyncThunk("users/getCurrentUser", async (_, thunkAPI) => {
  try {
    const persistToken = thunkAPI.getState().auth.accessToken;
    token.set(persistToken);
    // console.log(persistToken);
    const { data } = await privateAPI.get(`/users`, {
      headers: { Authorization: `Bearer ${persistToken}` },
    });

    return data;
  } catch (error) {
    console.log(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addFeedback = createAsyncThunk("user/addFeedback", async (dataFeedback, thunkAPI) => {
  const { id, feedback } = dataFeedback;
  try {
    const userToken = thunkAPI.getState().auth.accessToken;
    token.set(userToken);
    const { data } = await privateAPI.post(`/users/${id}/feedback`, feedback);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const getAllFeedbacks = createAsyncThunk("user/getAllFeedbacks", async (id, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.accessToken;

    token.set(userToken);
    const { data } = await privateAPI.get(`/users/${id}/feedback`);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteUserAsUser = createAsyncThunk("user/deleteUser", async (_, thunkAPI) => {
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
});

export const sendMessageFromUser = createAsyncThunk("user/sendMessage", async ({ id, message }, thunkAPI) => {
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
});

export const getUserMessages = createAsyncThunk("user/getUserMessages", async (_, thunkAPI) => {
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
});
