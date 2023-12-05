import axios from "axios";
import { token } from "./privateAPI";

const baseURL = "https://coachandcouch.onrender.com";

export const publicAPI = axios.create({ baseURL });

export const register = async (credentials, thunkAPI) => {
  if (!navigator.onLine) return thunkAPI.rejectWithValue({ type: "network" });

  const { data } = await publicAPI.post("/auth/signup", credentials);
  token.set(data.tokens.accessToken);
  return data;
};
