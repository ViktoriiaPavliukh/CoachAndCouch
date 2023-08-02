import axios from "axios";
import { token } from "./privateAPI";

const baseURL = "https://couchandcoach.onrender.com";

const publicAPI = axios.create({ baseURL });

export const register = async (credentials) => {
  const { data } = await publicAPI.post("/auth/signup", credentials);
  token.set(data.tokens.accesToken);
  return data;
};

export const login = async (credentials) => {
  const { data } = await publicAPI.post("/auth/signin", credentials);
  token.set(data.tokens.accesToken);
  return data;
};
