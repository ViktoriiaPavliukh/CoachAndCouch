import { createSlice } from "@reduxjs/toolkit";

const initSlice = createSlice({
  name: "init",
  initialState: {
    initialized: false,
  },
  reducers: {
    setInitialized: (state, actions) => {
      state.initialized = actions.payload;
    },
  },
});
export const { setInitialized } = initSlice.actions;
export const initReducer = initSlice.reducer;

export const selectInitialized = (state) => state.init.initialized;
