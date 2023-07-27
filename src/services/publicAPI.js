import axios from "axios";

const baseURL = "https://couchandcoach.onrender.com";

const publicAPI = axios.create({ baseURL });

export const register = async (credentials) => {
  const { data } = await publicAPI.post("/users/signup", credentials);
  return data;
};

export const login = async (credentials) => {
  const { data } = await publicAPI.post("/users/signin", credentials);
  return data;
};
