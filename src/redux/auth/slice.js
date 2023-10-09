import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, refreshUser, registerUser } from "./operations";
import { toast } from "react-toastify";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoading: true,
    isLoggedIn: false,
    token: null,
    refreshtoken: null,
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
  state.user = { name: "User", ...payload.user };
  state.token = payload.tokens.accessToken;
  state.refreshtoken = payload.tokens.refreshToken;
  state.isLoggedIn = true;
  state.isLoading = false;
}

function handleRegisterFulfilled(state, { payload }) {
  state.user = { name: "User", ...payload.user };
  state.token = payload.tokens.accessToken;
  state.refreshtoken = payload.tokens.refreshToken;
  state.isLoggedIn = true;
  state.isLoading = false;
}

function handleRefreshFulfilled(state, { payload }) {
  state.user = { name: "User", ...payload.user };
  state.refreshtoken = payload.tokens.refreshToken;
  state.token = payload.tokens.accessToken;
  state.isLoggedIn = true;
  state.isLoading = false;
}

function handleLogoutFulfilled(state) {
  state.user = {};
  state.token = null;
  state.isLoggedIn = false;
  state.isLoading = false;
}

function handleRejected(state, { error }) {
  state.isLoading = false;
  state.isLoggedIn = false;
  toast.error(error.message);
}

export const authReducer = authSlice.reducer;
