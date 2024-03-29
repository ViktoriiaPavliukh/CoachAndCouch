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
  async (id, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.put(`/adverts/${id}/favorite`);

      toast.success(`adverts id = ${id} was add/remove to your favorite`, {
        icon: false,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
      console.log("Editing advertisement...");
      console.log("Advert ID:", advertId);
      console.log("Form Data:", formData);
      for (const pair of formData.entries()) {
        const [key, value] = pair;
        console.log(`${key}: ${value}`);
      }

      const userToken = thunkAPI.getState().auth.accessToken;
      console.log("User Token:", userToken);

      // Set the authentication token in the headers
      const headers = { Authorization: `Bearer ${userToken}` };

      // Dispatch the API request
      const { data } = await privateAPI.patch(
        `/adverts/${advertId}`,
        formData,
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

// export const editAdvert = createAsyncThunk(
//   "adverts/editAdvert",
//   async ({ advertId, formData }, thunkAPI) => {
//     try {
//       console.log("hi");
//       console.log(advertId);
//       console.log(formData);

//       const userToken = thunkAPI.getState().auth.accessToken;
//       token.set(userToken);
//       console.log(userToken);
//       privateAPI.setToken(userToken);
//       const { data } = await privateAPI.patch(
//         `/adverts/${advertId}`,
//         formData,
//         {
//           headers: { Authorization: `Bearer ${userToken}` },
//         }
//       );
//       return data;
//     } catch (error) {
//       toast.error("Failed to edit advertisement");
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
