import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAdvertsById,
  getAdverts,
  getCountries,
  getLanguages,
  getSpecializations,
  postAdvert,
} from "./operations";

const advertsSlice = createSlice({
  name: "adverts",
  initialState: {
    languages: [],
    specializations: [],
    countries: [],
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpecializations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.specializations = action.payload;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.languages = action.payload;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.countries = action.payload;
      })
      .addCase(getAdverts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(postAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.accessToken = action.payload.token;
        console.log("postAdvert/fulfilled", action);
        state.items.push(action.payload);
      })
      .addCase(deleteAdvertsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex((advert) => advert.id === action.payload.id);
        state.items.splice(index, 1);
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

export const advertsReducer = advertsSlice.reducer;
