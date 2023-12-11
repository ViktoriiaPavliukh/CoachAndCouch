// teacher/teachersSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { getTeacherMessages } from "./operations";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    messages: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
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

export const teacherReducer = teacherSlice.reducer;
