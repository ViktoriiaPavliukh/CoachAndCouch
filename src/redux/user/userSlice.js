import { createSlice } from "@reduxjs/toolkit";
import { addFeedback, getUserById } from "./operations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    feedbacks: [],
    isLoading: true,
    isLoggedIn: false,
    refreshToken: null,
    accessToken: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
          state.isLoggedIn = false;
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

export const userReducer = userSlice.reducer;
