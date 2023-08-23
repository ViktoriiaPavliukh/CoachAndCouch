import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './theme/slice';

export const store = configureStore({
  reducer: { theme: themeReducer },
});
