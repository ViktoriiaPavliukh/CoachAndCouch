import { privateAPI } from "@/services/privateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../services/privateAPI";

export const getUserById = createAsyncThunk(
  "admin/getUsersAsAdmin",
  async (id, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      token.set(persistToken);
      console.log(persistToken);
      const { data } = await privateAPI.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${persistToken}` },
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      //  services.Notify.failure("Sorry. We have some problem with a server. Please, reload the page");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFeedback = createAsyncThunk(
  "user/addFeedback",
  async (dataFeedback, thunkAPI) => {
    const { id, feedback } = dataFeedback;
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.post(`/users/${id}/feedback`, feedback);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getAllFeedbacks = createAsyncThunk(
  "user/getAllFeedbacks",
  async (id, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;

      token.set(userToken);
      const { data } = await privateAPI.get(`/users/${id}/feedback`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUserAsUser = createAsyncThunk(
  "user/deleteUser",
  async (_, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const userId = thunkAPI.getState().auth.user.id;
      await privateAPI.put(`/users`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const sendMessageFromUser = createAsyncThunk(
//   "user/sendMessage",
//   async ({ message }, thunkAPI) => {
//     try {
//       const userToken = thunkAPI.getState().auth.accessToken;
//       const userId = thunkAPI.getState().auth.user.id;
//       console.log(userId);
//       console.log(userToken);
//       token.set(userToken);
//       console.log(message);

//       // Send the message
//       await privateAPI.post(
//         `/users/30/conversation`,
//         { message },
//         {
//           headers: { Authorization: `Bearer ${userToken}` },
//         }
//       );

//       const response = await privateAPI.get(`/users/30/conversation`, {
//         headers: { Authorization: `Bearer ${userToken}` },
//       });

//       const messages = response.data;

//       console.log(messages);

//       return messages;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
export const sendMessageFromUser = createAsyncThunk(
  "user/sendMessage",
  async ({ id, message }, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      const userId = thunkAPI.getState().auth.user.id;
      token.set(userToken);

      // Send the message
      await privateAPI.post(
        `/users/${id}/conversation`,
        { message },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // Fetch updated conversation/messages after sending the message
      // const response = await privateAPI.get(
      //   `/users/${id}/conversation`,
      //   {
      //     headers: { Authorization: `Bearer ${userToken}` },
      //   }
      // );

      // const messages = response.data;
      // console.log(messages);
      // return messages;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const sendMessageFromUser = createAsyncThunk(
//   "user/sendMessage",
//   async (dataMessage, thunkAPI) => {
//     const { id, message } = dataMessage;
//     try {
//       const userToken = thunkAPI.getState().auth.accessToken;
//       token.set(userToken);
//       const { data } = await privateAPI.post(
//         `/users/${id}/conversation`,
//         message, {
//           headers: { Authorization: `Bearer ${userToken}` },
//         }
//       );
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const getAllMessages = createAsyncThunk(
  "user/getAllMessages",
  async (id, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      const userId = thunkAPI.getState().auth.user.id;
      console.log(userId.id);
      token.set(userToken);
      const { data } = await privateAPI.get(`/users/${userId}/conversation`);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
