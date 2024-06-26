import { createSlice } from "@reduxjs/toolkit";

import {
  addCountryAsAdmin,
  addLanguagesAsAdmin,
  addSpecializationsAsAdmin,
  deleteAdvertsAsAdmin,
  deleteLanguageAsAdmin,
  deleteSpecializationAsAdmin,
  deleteUserAsAdmin,
  getAdvertsAsAdmin,
  getCountries,
  getCountriesAsAdmin,
  getLanguages,
  getSpecializations,
  getUsersAsAdmin,
  getFeedbacksAsAdmin,
} from "./operations";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adverts: [],
    users: [],
    countries: [],
    feedbacks: [],
    languages: [],
    specializations: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.countries = action.payload;
      })
      .addCase(getSpecializations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.specializations = action.payload;
      })
      .addCase(addSpecializationsAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.specializations.push(action.payload);
      })
      .addCase(deleteSpecializationAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (specialization) => specialization.id === action.payload.id
        );
        state.specializations.splice(index, 1);
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.languages = action.payload;
      })
      .addCase(deleteLanguageAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (language) => language.id === action.payload.id
        );
        state.languages.splice(index, 1);
      })
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
      .addCase(getFeedbacksAsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.feedbacks = action.payload;
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
