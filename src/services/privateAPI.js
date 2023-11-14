import axios from "axios";

const baseURL = "https://couchandcoach.onrender.com";

export const privateAPI = axios.create({ baseURL });

export const token = {
  set(token) {
    privateAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    privateAPI.defaults.headers.common.Authorization = "";
  },
};

export const refresh = async (authorization) => {
  token.set(authorization);
  const { data } = await privateAPI.post("/auth/refresh", { headers: { Authorization: `Bearer ${authorization}` } });
  // token.set(data.tokens.accessToken);
  token.set(data.tokens.refreshToken);
  return data;
};
