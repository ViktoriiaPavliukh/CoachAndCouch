// languageSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLanguage: "uk",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.currentLanguage = state.currentLanguage === "uk" ? "en" : "uk";
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export const selectCurrentLanguage = (state) => state.language.currentLanguage;

export const languageReducer = languageSlice.reducer; // Export the original reducer for non-persisted usage
