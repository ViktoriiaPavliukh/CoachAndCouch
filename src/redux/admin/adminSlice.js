import { createSlice } from "@reduxjs/toolkit";

import { deleteAdvertsAsAdmin, deleteUserAsAdmin, getAdvertsAsAdmin, getUsersAsAdmin } from "./operations";

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
      .addCase(deleteAdvertsAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.adverts.map((el) => {
          if (el.id === action.payload) {
            el.isDeleted = !el.isDeleted;
          }
        });
      })
      .addCase(deleteUserAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users.map((el) => {
          if (el.id === action.payload) {
            el.isDeleted = !el.isDeleted;
          }
        });
      })
      .addCase(getUsersAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(getAdvertsAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.adverts = action.payload;
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
