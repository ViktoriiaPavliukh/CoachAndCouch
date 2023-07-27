import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./theme/slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";

const persistConfig = {
  key: "theme",
  storage,
  // whitelist: ["filter"],
};
const persistedTheme = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
  reducer: { theme: persistedTheme, auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
