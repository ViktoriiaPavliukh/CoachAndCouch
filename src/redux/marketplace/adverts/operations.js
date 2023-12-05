import { privateAPI, token } from "@/services/privateAPI";
import { publicAPI } from "@/services/publicAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAdverts = createAsyncThunk("adverts/getAdverts", async (_, thunkAPI) => {
  try {
    const { data } = await publicAPI.get(`/adverts`);
    // console.log(data);
    if (thunkAPI.status === 201) {
      toast.success("You add the advert", {
        icon: "🚀",
      });
    }
    if (thunkAPI.status === 404) {
      toast.error("You entered incorrect data", {
        icon: false,
      });
    }

    return data;
  } catch (error) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getAdvertsById = async (id) => {
  const { data } = await publicAPI.get(`/adverts/${id}`);
  // console.log(data);
  return data;
};

export const deleteAdvertsById = createAsyncThunk("adverts/deleteAdvertsById", async (id, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.accessToken;
    token.set(userToken);
    // console.log(userToken);
    const { data } = await privateAPI.put(`/adverts/${id}`);
    console.log(`adverts id = ${id} was deleted`);
    return data;
  } catch (error) {
    // console.log(error.message);
    //  services.Notify.failure("Sorry. We have some problem with a server. Please, reload the page");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const postAdvert = createAsyncThunk("adverts/postAdvert", async (advertData, thunkAPI) => {
  try {
    // console.log(thunkAPI.getState());
    const userToken = thunkAPI.getState().auth.accessToken;
    // console.log(userToken);
    token.set(userToken);
    const { data } = await privateAPI.post("/adverts", advertData);
    // console.log("Advertisement created:", data);
    return data;
  } catch (error) {
    // console.error("Error creating advertisement:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
