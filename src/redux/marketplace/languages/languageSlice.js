// languageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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


const languagePersistConfig = {
  key: "language",
  storage,
};

export const persistedLanguageReducer = persistReducer(
  languagePersistConfig,
  languageSlice.reducer
);

export default languageSlice.reducer; // Export the original reducer for non-persisted usage
