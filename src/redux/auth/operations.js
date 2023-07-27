import { createAsyncThunk } from "@reduxjs/toolkit";
import { register, login } from "@/services/publicAPI";

export const loginUser = createAsyncThunk("/users/login", login);

export const registerUser = createAsyncThunk("/users/register", register);
