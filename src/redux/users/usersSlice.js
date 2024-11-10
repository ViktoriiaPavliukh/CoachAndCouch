import { createSlice } from "@reduxjs/toolkit";
import {
  addFeedback,
  deleteUserAsUser,
  sendMessageFromUser,
  getUserMessages,
  getCurrentUser,
  editUser,
  updateUserPhoto,
  getLikedAdverts,
  fetchUsersById
} from "./operations";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    users: [],
    currentUser: {},
    feedbacks: [],
    isLoading: true,
    isLoggedIn: false,
    refreshToken: null,
    accessToken: null,
    users: [],
    messages: [],
    likedAdverts: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUsersById.pending, (state) => {
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(fetchUsersById.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUsersById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.feedbacks.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteUserAsUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = state.users.map((el) => {
          if (el.id === action.payload) {
            return { ...el, isDeleted: !el.isDeleted };
          }
          return el;
        });
      })
      .addCase(sendMessageFromUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.messages = action.payload;
      })
      .addCase(sendMessageFromUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(sendMessageFromUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.messages = action.payload;
      })
      .addCase(getUserMessages.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getLikedAdverts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLikedAdverts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likedAdverts = action.payload;
      })
      .addCase(getLikedAdverts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
          state.isLoggedIn = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      );
  },
});

export const usersReducer = usersSlice.reducer;
