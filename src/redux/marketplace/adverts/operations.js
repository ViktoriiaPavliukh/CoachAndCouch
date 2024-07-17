import { privateAPI, token } from "@/services/privateAPI";
import { publicAPI } from "@/services/publicAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAdverts = createAsyncThunk(
  "adverts/getAdverts",
  async (currentPage, thunkAPI) => {
    try {
      const page = currentPage || 1;
      const { data } = await publicAPI.get(`/adverts?page=${page}`);
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAdverts = createAsyncThunk(
  "adverts/fetchAdverts",
  async (_, thunkAPI) => {
    try {
      const { data } = await publicAPI.get("/adverts");
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLikedAdverts = createAsyncThunk(
  "adverts/fetchLikedAdverts",
  async (likedAdvertIds, thunkAPI) => {
    try {
      const { data } = await publicAPI.get("/adverts");
      const likedAdverts = data.adverts.filter((advert) =>
        likedAdvertIds.includes(advert.id)
      );
      return likedAdverts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAdvertById = createAsyncThunk(
  "adverts/getAdvertById",
  async (id, thunkAPI) => {
    try {
      const { data } = await publicAPI.get(`/adverts/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAdvertsById = createAsyncThunk(
  "adverts/deleteAdvertsById",
  async (id, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.put(`/adverts/${id}`);
      console.log(`adverts id = ${id} was deleted`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postAdvert = createAsyncThunk(
  "adverts/postAdvert",
  async (advertData, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      console.log(advertData);
      const { data } = await privateAPI.post("/adverts", advertData);
      // if (thunkAPI.status === 201) {
      //   toast.success("You add the advert", {
      //     icon: "🚀",
      //   });
      // }
      // if (thunkAPI.status === 404) {
      //   toast.error("You entered incorrect data", {
      //     icon: false,
      //   });
      // }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const favoriteAdvert = createAsyncThunk(
  "adverts/favoriteAdverts",
  async (advertId, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      token.set(persistToken);
      const response = await privateAPI.put(
        `/adverts/${advertId}/favorite`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error("Error response:", error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const filterAdverts = createAsyncThunk(
  "adverts/filterAdverts",
  async (filters, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.language) {
        queryParams.append("language", filters.language);
      }
      if (filters.country) {
        queryParams.append("country", filters.country);
      }
      if (filters.specialization) {
        queryParams.append("specialization", filters.specialization);
      }
      const queryString = queryParams.toString();
      const { data } = await publicAPI.get(`adverts?${queryString}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editAdvert = createAsyncThunk(
  "adverts/editAdvert",
  async ({ advertId, formData }, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      const jsonData = JSON.stringify(Object.fromEntries(formData));
      const headers = {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };
      const { data } = await privateAPI.patch(
        `/adverts/${advertId}`,
        jsonData,
        { headers }
      );
      console.log("Advertisement edited successfully:", data);
      return data;
    } catch (error) {
      console.error("Failed to edit advertisement:", error);
      toast.error("Failed to edit advertisement");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editAdvertImage = createAsyncThunk(
  "adverts/editAdvertImage",
  async ({ advertId, imageFile }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const userToken = thunkAPI.getState().auth.accessToken;
      console.log("User Token:", userToken);

      const headers = { Authorization: `Bearer ${userToken}` };
      const { data } = await privateAPI.patch(
        `/adverts/${advertId}/image`,
        formData,
        { headers }
      );

      console.log("Advertisement image edited successfully:", data);
      return data;
    } catch (error) {
      console.error("Failed to edit advertisement image:", error);
      toast.error("Failed to edit advertisement image");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
