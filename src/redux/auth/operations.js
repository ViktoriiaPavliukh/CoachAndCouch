import { createAsyncThunk } from "@reduxjs/toolkit";
import { register, login } from "@/services/publicAPI";
import { privateAPI, refresh, token } from "@/services/privateAPI";

export const loginUser = createAsyncThunk("/users/login", login);

export const registerUser = createAsyncThunk("/users/register", register);

export const refreshUser = createAsyncThunk("/users/refresh", refresh);

export const logoutUser = createAsyncThunk("/users/logout", async (_, thunkAPI) => {
  const persistToken = thunkAPI.getState().auth.token;
  token.set(persistToken);
  const { data } = await privateAPI.post("/auth/logout");
  console.log("exit");
  localStorage.removeItem("persist:auth");
  token.unset();
  return data;
});
