import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, refreshUser, registerUser } from "./operations";
import { toast } from "react-toastify";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoading: true,
    isLoggedIn: false,
    refreshToken: null,
    accessToken: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(loginUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleRegisterFulfilled)
      .addCase(loginUser.fulfilled, handleLoginFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(refreshUser.fulfilled, handleRefreshFulfilled)
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, handleLogoutFulfilled)
      .addCase(logoutUser.rejected, handleRejected),
});

function handlePending(state) {
  state.isLoading = true;
}

function handleLoginFulfilled(state, { payload }) {
  state.user = { ...payload.user };
  state.accessToken = payload.tokens.accessToken;
  state.refreshToken = payload.tokens.refreshToken;
  state.isLoggedIn = true;
  state.isLoading = false;
}

function handleRegisterFulfilled(state, { payload }) {
  state.user = { ...payload.user };
  state.accessToken = payload.tokens.accessToken;
  state.refreshToken = payload.tokens.refreshToken;
  state.isLoggedIn = true;
  state.isLoading = false;
}

function handleRefreshFulfilled(state, { payload }) {
  state.user = { ...payload.user };
  state.refreshToken = payload.tokens.refreshToken;
  state.accessToken = payload.tokens.accessToken;
  state.isLoggedIn = true;
  state.isLoading = false;
}

function handleLogoutFulfilled(state) {
  state.user = {};
  state.accessToken = null;
  // state.refreshToken = null;
  state.isLoggedIn = false;
  state.isLoading = false;
}

function handleRejected(state, { error }) {
  state.isLoading = false;
  state.isLoggedIn = false;
  toast.error(error.message);
}

export const authReducer = authSlice.reducer;
