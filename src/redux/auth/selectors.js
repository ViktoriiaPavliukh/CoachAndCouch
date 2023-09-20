export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectRefreshToken = (state) => state.auth.refreshtoken;
