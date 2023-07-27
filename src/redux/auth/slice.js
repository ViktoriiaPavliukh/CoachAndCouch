import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./operations";
import { toast } from "react-toastify";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoading: false,
    isLoggedIn: false,
    token: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(loginUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleRegisterFulfilled)
      .addCase(loginUser.fulfilled, handleLoginFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.rejected, handleRejected),
});

function handlePending(state) {
  state.isLoading = true;
}

function handleLoginFulfilled(state, { payload }) {
  state.user = { name: "User", ...payload };
  state.isLoggedIn = true;
  state.isLoading = false;
}

function handleRegisterFulfilled(state, { payload }) {
  state.user = { name: "User", ...payload };
  state.isLoggedIn = true;
  state.isLoading = false;
}

function handleRejected(state, { error }) {
  state.isLoading = false;
  toast.error(error.message);
}

export const authReducer = authSlice.reducer;
