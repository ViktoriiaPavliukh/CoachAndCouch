import { createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "@/services/publicAPI";
import { privateAPI, refresh, token } from "@/services/privateAPI";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "https://coachandcouch.onrender.com";

export const publicAPI = axios.create({ baseURL });

export const loginUser = createAsyncThunk("/users/login", async (credentials, thunkAPI) => {
  try {
    const { data } = await publicAPI.post("/auth/signin", credentials);
    token.set(data.tokens.accessToken);
    if (thunkAPI.status === 200) {
      toast.success("Welcome");
    }
    if (thunkAPI.status === 400) {
      toast.error("Incorrect login or password");
    }
    return data;
  } catch (error) {
    toast.error("Sorry. We have some problem with a server. Please, reload the page");
    // return thunkAPI.rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk("/users/register", register);

export const refreshUser = createAsyncThunk("/users/refresh", refresh);

export const logoutUser = createAsyncThunk("/users/logout", async (_, thunkAPI) => {
  try {
    const persistToken = thunkAPI.getState().auth.refreshToken;
    token.set(persistToken);
    console.log(persistToken);
    const { data } = await privateAPI.post("/auth/logout");
    console.log(data);
    token.unset();
    console.log("exit");
    localStorage.removeItem("persist:auth");

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
