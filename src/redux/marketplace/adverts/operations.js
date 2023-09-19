import { publicAPI } from "@/services/publicAPI";
import { privateAPI, token } from "@/services/privateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAdverts = createAsyncThunk("adverts/getAdverts", async (_, thunkAPI) => {
  try {
    const { data } = await publicAPI.get(`/adverts`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
    //  services.Notify.failure("Sorry. We have some problem with a server. Please, reload the page");
    return thunkAPI.rejectWithValue(error.messahe);
  }
});

export const getAdvertsById = async (id) => {
  const { data } = await publicAPI.get(`/adverts/${id}`);
  console.log(data);
  return data;
};

export const deleteAdvertsById = createAsyncThunk("adverts/deleteAdvertsById", async (id, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.token;
    token.set(userToken);
    console.log(userToken);
    const { data } = await privateAPI.delete(`/admin/adverts/${id}`);
    console.log(`adverts id = ${id} was deleted`);
    return data;
  } catch (error) {
    console.log(error.message);
    //  services.Notify.failure("Sorry. We have some problem with a server. Please, reload the page");
    return thunkAPI.rejectWithValue(error.message);
  }
});
// getAdvertsById(1);
// deleteAdvertsById(1);
