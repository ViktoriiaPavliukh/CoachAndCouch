import { createAsyncThunk } from "@reduxjs/toolkit";
import { register, login } from "@/services/publicAPI";
import { logout, refresh } from "@/services/privateAPI";

export const loginUser = createAsyncThunk("/users/login", login);

export const registerUser = createAsyncThunk("/users/register", register);

export const refreshUser = createAsyncThunk("/users/refresh", refresh);

export const logoutUser = createAsyncThunk("/users/logout", logout);
