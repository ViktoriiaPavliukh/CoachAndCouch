import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./theme/slice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import { advertsReducer } from "./marketplace/adverts/advertsSlice";

import { initReducer } from "./init/initSlice";
import { adminReducer } from "./admin/adminSlice";
import { userReducer } from "./user/userSlice";
import { languageReducer } from "./marketplace/languages/languageSlice";

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

const persistedLanguageReducer = persistReducer(languagePersistConfig, languageReducer);
const persistedTheme = persistReducer(themePersistConfig, themeReducer);
const persistedAuth = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    theme: persistedTheme,
    auth: persistedAuth,
    adverts: advertsReducer,
    admin: adminReducer,
    init: initReducer,
    user: userReducer,
    language: persistedLanguageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
