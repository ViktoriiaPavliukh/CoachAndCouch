import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateAPI } from "@/services/privateAPI";
import { token } from "../../services/privateAPI";

export const getTeacherMessages = createAsyncThunk(
  "teacher/getMessages",
  async (_, thunkAPI) => {
    try {
      const teacherToken = thunkAPI.getState().auth.accessToken;
      // console.log(teacherToken);

      token.set(teacherToken);

      const { data } = await privateAPI.get("/users/mail", {
        headers: { Authorization: `Bearer ${teacherToken}` },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
