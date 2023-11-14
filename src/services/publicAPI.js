import axios from "axios";
import { token } from "./privateAPI";

const baseURL = "https://couchandcoach.onrender.com";

export const publicAPI = axios.create({ baseURL });

export const register = async (credentials) => {
  const { data } = await publicAPI.post("/auth/signup", credentials);
  token.set(data.tokens.accessToken);
  return data;
};

export const login = async (credentials) => {
  const { data } = await publicAPI.post("/auth/signin", credentials);
  token.set(data.tokens.accessToken);
  return data;
};
