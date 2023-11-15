import { createSlice } from "@reduxjs/toolkit";
import { getUserById } from "./operations";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isLoading: true,
    isLoggedIn: false,
    refreshToken: null,
    accessToken: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserById.pending, handlePending)
      .addCase(getUserById.fulfilled, handleGetUserByIdFulfilled)
      .addCase(getUserById.rejected, handleRejected),
});

function handlePending(state) {
  state.isLoading = true;
}

function handleGetUserByIdFulfilled(state, { payload }) {
  state.user = payload;
  console.log(payload);
  // state.accessToken = payload.tokens.accessToken;
  // state.refreshToken = payload.tokens.refreshToken;
  state.isLoggedIn = true;
  state.isLoading = false;
}

function handleRejected(state, { error }) {
  state.isLoading = false;
  state.isLoggedIn = false;
  toast.error(error.message);
}

export const userReducer = userSlice.reducer;
