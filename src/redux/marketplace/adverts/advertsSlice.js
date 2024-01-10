import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAdvertsById,
  favoriteAdvert,
  getAdvertById,
  getAdverts,
  postAdvert,
  filterAdverts,
} from "./operations";

const advertsSlice = createSlice({
  name: "adverts",
  initialState: {
    adverts: {},
    advert: {},
    isLoading: false,
    error: null,
    favoriteAdverts: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(favoriteAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.favoriteAdverts = action.payload;
      })
      .addCase(getAdvertById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.adverts.advert = action.payload;
      })
      .addCase(getAdverts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.adverts = action.payload;
      })
      .addCase(postAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.accessToken = action.payload.accessToken;
        console.log("postAdvert/fulfilled", action);
        state.adverts.adverts.push(action.payload);
      })
      .addCase(deleteAdvertsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (advert) => advert.id === action.payload.id
        );
        state.adverts.adverts.splice(index, 1);
      })
      .addCase(filterAdverts.fulfilled, (state, action) => {
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

export const advertsReducer = advertsSlice.reducer;
