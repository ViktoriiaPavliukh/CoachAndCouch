export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.accessToken;
export const selectRefreshUser = (state) => state.auth.refresh;
export const selectRefreshToken = (state) => state.auth.refreshToken;
