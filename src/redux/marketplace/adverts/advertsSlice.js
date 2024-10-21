import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAdvertsById,
  favoriteAdvert,
  getAdvertById,
  getAdverts,
  postAdvert,
  filterAdverts,
  editAdvert,
  editAdvertImage,
  fetchAdverts,
  fetchLikedAdverts,
} from "./operations";
import { getCurrentUser } from "../../users/operations";

const advertsSlice = createSlice({
  name: "adverts",
  initialState: {
    adverts: {},
    advert: {},
    isLoading: false,
    error: null,
    favoriteAdverts: {},
    likes: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.likes = action.payload.likes || [];
      })
      .addCase(favoriteAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.favoriteAdverts = action.payload;
      })
      .addCase(getAdvertById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.advert = action.payload;
      })
      .addCase(getAdvertById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdvertById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
      .addCase(editAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editAdvert.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editAdvertImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editAdvertImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdverts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adverts = action.payload;
      })
      .addCase(fetchAdverts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchLikedAdverts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLikedAdverts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.adverts = action.payload;
        } else {
          console.error("Expected an array but got:", action.payload);
        }
      })
      .addCase(fetchLikedAdverts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
