import { publicAPI } from "@/services/publicAPI";
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
getAdvertsById(1);
