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
  const { data } = await privateAPI.post("/auth/refresh");
  token.set(data.tokens.accesToken);
  return data;
};

export const logout = async () => {
  const { data } = await privateAPI.post("/auth/logout");
  token.unset();
  return data;
};
