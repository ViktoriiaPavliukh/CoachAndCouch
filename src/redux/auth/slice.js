import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, refreshUser, registerUser } from "./operations";
import { toast } from "react-toastify";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoading: true,
    isLoggedIn: false,
    refreshToken: null,
    accessToken: null,
    en: "uk",
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(loginUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleRegisterFulfilled)
      .addCase(loginUser.fulfilled, handleLoginFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(refreshUser.fulfilled, handleRefreshFulfilled)
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, handleLogoutFulfilled)
      .addCase(logoutUser.rejected, handleRejected),
});

function handlePending(state) {
  state.isLoading = true;
}

function handleLoginFulfilled(state, { payload }) {
  state.user = { ...payload.user };
  state.accessToken = payload.tokens.accessToken;
  state.refreshToken = payload.tokens.refreshToken;
  state.isLoggedIn = true;
  state.isLoading = false;
  state.en = JSON.parse(localStorage.getItem("persist:language"));
  if ([...Object.values(state.en)[0]].splice(1, 2).join("") === "en")
    toast.success(`Welcome ${state.user.firstName} to Coach&Coach`, {
      icon: false,
    });
  else {
    toast.success(`Вітаємо ${state.user.firstName} у Coach&Coach`, {
      icon: false,
    });
  }
}

function handleRegisterFulfilled(state, { payload }) {
  state.user = { ...payload.user };
  state.accessToken = payload.tokens.accessToken;
  state.refreshToken = payload.tokens.refreshToken;
  state.isLoggedIn = true;
  state.isLoading = false;
  state.en = JSON.parse(localStorage.getItem("persist:language"));
  if ([...Object.values(state.en)[0]].splice(1, 2).join("") === "en")
    toast.success(`Welcome ${state.user.firstName} to Coach&Coach`, {
      icon: false,
    });
  else {
    toast.success(`Вітаємо ${state.user.firstName} у Coach&Coach`, {
      icon: false,
    });
  }
}

function handleRefreshFulfilled(state, { payload }) {
  state.user = { ...payload.user };
  state.refreshToken = payload.tokens.refreshToken;
  state.accessToken = payload.tokens.accessToken;
  state.isLoggedIn = true;
  state.isLoading = false;
}

function handleLogoutFulfilled(state) {
  state.user = {};
  state.accessToken = null;
  state.refreshToken = null;
  state.isLoggedIn = false;
  state.isLoading = false;
  state.en = JSON.parse(localStorage.getItem("persist:language"));
  const lang = [...Object.values(state.en)[0]].splice(1, 2).join("");
  if (lang === "en") {
    toast.warn("You are logged out of your acount");
  } else {
    toast.warn("Ви вийшли зі свого акаунту");
  }
}

function handleRejected(state, { payload: { type, message }, error }) {
  console.log("handleRejected", state, type, message, error);
  state.isLoading = false;
  state.isLoggedIn = false;
  state.en = JSON.parse(localStorage.getItem("persist:language"));
  const lang = [...Object.values(state.en)[0]].splice(1, 2).join("");
  if (type === "network") {
    if (lang === "en") toast.error("No internet connection", { icon: false });
    else toast.error("Відсутнє інтернет-з'єднання", { icon: false });
  }
  if (
    message === "Request failed with status code 403" ||
    message === "Request failed with status code 400"
  ) {
    if (lang === "en")
      toast.error("Invalid email or password", { icon: false });
    else toast.error("Невірна електронна пошта чи пароль ", { icon: false });
    return;
  } else {
    if (lang === "en") toast.error("Server error", { icon: false });
    else toast.error("Помилка сервера", { icon: false });
  }
}

export const authReducer = authSlice.reducer;
