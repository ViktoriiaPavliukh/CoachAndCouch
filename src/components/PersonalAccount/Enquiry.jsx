import { selectUser } from "@/redux/auth/selectors";
import { getUserById } from "@/redux/user/operations";
import { selectUserById } from "@/redux/user/selectors";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Enquiry = () => {
  const user = useSelector(selectUserById);

  const userId = useSelector(selectUser).id;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(getUserById(userId));
  }, [dispatch, userId]);
  console.log(user);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography>My Enquiry</Typography>
    </Box>
  );
};
