import { createSlice } from "@reduxjs/toolkit";

import {
  addCountryAsAdmin,
  addLanguagesAsAdmin,
  deleteAdvertsAsAdmin,
  deleteUserAsAdmin,
  getAdvertsAsAdmin,
  getCountriesAsAdmin,
  getUsersAsAdmin,
} from "./operations";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adverts: [],
    users: [],
    countries: [],
    languages: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLanguagesAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.languages.push(action.payload);
      })
      .addCase(getCountriesAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.countries = action.payload;
      })
      .addCase(addCountryAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.countries.push(action.payload);
      })
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
