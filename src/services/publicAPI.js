import axios from 'axios';

const baseURL = 'http://localhost:3000';

const publicAPI = axios.create({ baseURL });

export const register = async credentials => {
  const res = await publicAPI.post('/users/signup', credentials);
  console.log(res);
  return res;
};
