import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUserMessages } from "@/redux/users/operations";
import {
  selectCurrentUser,
  selectUserIsLoading,
  selectMessages,
} from "@/redux/users/selectors";
import { Messages } from "./Messages";
import Loader from "../../Loader/Loader";
import { Typography } from "@mui/material";

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export function ChatData() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectUserIsLoading);

   useEffect(() => {
     if (!currentUser || isEmptyObject(currentUser)) {
       dispatch(getCurrentUser());
     }
   }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserMessages());
    }
  }, [dispatch, currentUser]);

  const fetchMessages = useSelector(selectMessages);

  return isLoading ? (
    <Loader />
  ) : !currentUser ? (
    <Typography>{intl.formatMessage({ id: "noData" })}</Typography>
  ) : (
    <Messages
      currentUser={currentUser}
      fetchMessages={Array.isArray(fetchMessages) ? fetchMessages : []}
    />
  );
}
