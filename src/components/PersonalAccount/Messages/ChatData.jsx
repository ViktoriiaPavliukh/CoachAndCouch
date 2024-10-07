import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserMessages,
  getUserById,
} from "@/redux/users/operations";
import {
  selectCurrentUser,
  selectUserIsLoading,
  selectMessages,
  selectUserById,
} from "@/redux/users/selectors";
import { Messages } from "./Messages";
import Loader from "../../Loader/Loader";
import { Typography } from "@mui/material";

export function ChatData() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const correspondenceData = useSelector(selectUserById);
  const isLoading = useSelector(selectUserIsLoading);

  useEffect(() => {
    if (!currentUser) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserMessages());
      dispatch(getUserById());
    }
  }, [dispatch, currentUser]);

  const fetchMessages = useSelector(selectMessages);
  console.log(fetchMessages);
  return isLoading ? (
    <Loader />
  ) : !currentUser ? (
    <Typography>No Data</Typography>
  ) : (
    <Messages currentUser={currentUser} fetchMessages={fetchMessages} />
  );
}
