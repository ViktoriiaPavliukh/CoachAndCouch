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
import { advertsReducer } from "./marketplace/adverts/advertsSlice";
import { initReducer } from "./init/initSlice";
import { adminReducer } from "./admin/adminSlice";
import { usersReducer } from "./users/usersSlice";
import { bookingReducer } from "./marketplace/bookings/bookingSlice";
import { languageReducer } from "./marketplace/languages/languageSlice";
import { teacherBookingReducer } from "./marketplace/bookings/teacherBookingsSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken"],
};

const themePersistConfig = {
  key: "theme",
  storage,
};
const languagePersistConfig = {
  key: "language",
  storage,
};

const persistedLanguageReducer = persistReducer(
  languagePersistConfig,
  languageReducer
);
const persistedTheme = persistReducer(themePersistConfig, themeReducer);
const persistedAuth = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    theme: persistedTheme,
    auth: persistedAuth,
    adverts: advertsReducer,
    admin: adminReducer,
    init: initReducer,
    users: usersReducer,
    language: persistedLanguageReducer,
    bookings: bookingReducer,
    teacherSlots: teacherBookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        thunk: true,
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
