// languageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  currentLanguage: "uk", // or 'en', depending on your default language
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

// Create a language persist config
const languagePersistConfig = {
  key: "language",
  storage,
};

// Wrap the languageSlice.reducer with the persist configuration
export const persistedLanguageReducer = persistReducer(
  languagePersistConfig,
  languageSlice.reducer
);

export default languageSlice.reducer; // Export the original reducer for non-persisted usage
