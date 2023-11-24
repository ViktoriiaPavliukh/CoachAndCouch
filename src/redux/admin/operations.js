import { privateAPI } from "@/services/privateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../services/privateAPI";

export const getUsersAsAdmin = createAsyncThunk("admin/getUsersAsAdmin", async (_, thunkAPI) => {
  try {
    const persistToken = thunkAPI.getState().auth.accessToken;
    token.set(persistToken);
    // console.log(persistToken);
    const { data } = await privateAPI.get("/admin/users", { headers: { Authorization: `Bearer ${persistToken}` } });

    return data;
  } catch (error) {
    console.log(error.message);
    //  services.Notify.failure("Sorry. We have some problem with a server. Please, reload the page");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getAdvertsAsAdmin = createAsyncThunk("admin/getAdvertsAsAdmin", async (_, thunkAPI) => {
  try {
    const persistToken = thunkAPI.getState().auth.accessToken;
    token.set(persistToken);
    // console.log(persistToken);
    const { data } = await privateAPI.get("/admin/adverts", { headers: { Authorization: `Bearer ${persistToken}` } });

    return data;
  } catch (error) {
    console.log(error.message);
    //  services.Notify.failure("Sorry. We have some problem with a server. Please, reload the page");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteAdvertsAsAdmin = createAsyncThunk("admin/deleteAdvertsAsAdmin", async (id, thunkAPI) => {
  try {
    const persistToken = thunkAPI.getState().auth.accessToken;
    token.set(persistToken);
    // console.log(persistToken);
    await privateAPI.put(`/admin/adverts/${id}`, {
      headers: { Authorization: `Bearer ${persistToken}` },
    });
    return id;
  } catch (error) {
    console.log(error.message);
    //  services.Notify.failure("Sorry. We have some problem with a server. Please, reload the page");
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const deleteUserAsAdmin = createAsyncThunk("admin/deleteUserAsAdmin", async (id, thunkAPI) => {
  try {
    const persistToken = thunkAPI.getState().auth.accessToken;
    token.set(persistToken);
    // console.log(persistToken);
    await privateAPI.put(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${persistToken}` },
    });
    return id;
  } catch (error) {
    console.log(error.message);
    //  services.Notify.failure("Sorry. We have some problem with a server. Please, reload the page");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addCountryAsAdmin = createAsyncThunk("admin/updateCountryAsAdmin", async (countryData, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.accessToken;

    token.set(userToken);
    const { data } = await privateAPI.post("/admin/countries", countryData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getCountriesAsAdmin = createAsyncThunk("admin/getCountriesAsAdmin", async (_, thunkAPI) => {
  {
    try {
      const { data } = await privateAPI.get("/admin/countries");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const addLanguagesAsAdmin = createAsyncThunk("admin/addLanguagesAsAdmin", async (languagesData, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.accessToken;
    token.set(userToken);
    const { data } = await privateAPI.post("/admin/languages", languagesData);
    console.log(languagesData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
