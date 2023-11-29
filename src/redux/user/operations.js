import { privateAPI } from "@/services/privateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../services/privateAPI";

export const getUserById = createAsyncThunk("admin/getUsersAsAdmin", async (id, thunkAPI) => {
  try {
    const persistToken = thunkAPI.getState().auth.accessToken;
    token.set(persistToken);
    console.log(persistToken);
    const { data } = await privateAPI.get(`/users/${id}`, { headers: { Authorization: `Bearer ${persistToken}` } });

    return data;
  } catch (error) {
    console.log(error.message);
    //  services.Notify.failure("Sorry. We have some problem with a server. Please, reload the page");
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
