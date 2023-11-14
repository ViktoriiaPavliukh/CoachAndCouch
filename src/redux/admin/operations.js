import { privateAPI } from "@/services/privateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../services/privateAPI";

export const getUsersAsAdmin = createAsyncThunk("admin/getUsersAsAdmin", async (_, thunkAPI) => {
  try {
    const persistToken = thunkAPI.getState().auth.accessToken;
    token.set(persistToken);
    console.log(persistToken);
    const { data } = await privateAPI.get("/admin/users", { headers: { Authorization: `Bearer ${persistToken}` } });

    return data;
  } catch (error) {
    console.log(error.message);
    //  services.Notify.failure("Sorry. We have some problem with a server. Please, reload the page");
    return thunkAPI.rejectWithValue(error.message);
  }
});
