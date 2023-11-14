import { createSlice } from "@reduxjs/toolkit";

import { getUsersAsAdmin } from "./operations";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adverts: [],
    users: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      );
  },
});

export const adminReducer = adminSlice.reducer;
