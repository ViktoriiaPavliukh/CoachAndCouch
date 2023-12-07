import { createSlice } from "@reduxjs/toolkit";
import { addFeedback, getUserById, deleteUserAsUser } from "./operations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    feedbacks: [],
    isLoading: true,
    isLoggedIn: false,
    refreshToken: null,
    accessToken: null,
    users: [],
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
        state.feedbacks.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteUserAsUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = state.users.map((el) => {
          if (el.id === action.payload) {
            return { ...el, isDeleted: !el.isDeleted };
          }
          return el;
        });
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
