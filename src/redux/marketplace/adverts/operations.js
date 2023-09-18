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

export const postAdvert = createAsyncThunk(
  "adverts/postAdvert",
  async (advertData, thunkAPI) => {
    try {
      const response = await publicAPI.post("/adverts", advertData);
      const data = response.data;
      console.log("Advertisement created:", data);
      return data;
    } catch (error) {
      console.error("Error creating advertisement:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
