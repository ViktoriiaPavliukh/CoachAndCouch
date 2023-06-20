import { createSlice } from '@reduxjs/toolkit';
// import { changeTheme } from './operations';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value:
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  },
  reducers: {
    changeTheme: state => {
      state.value = !state.value;
    },
  },
});

export const themeReducer = themeSlice.reducer;

export const { changeTheme } = themeSlice.actions;
