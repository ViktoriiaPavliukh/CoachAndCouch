import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "@/redux/user/operations";
import { Box, Typography } from "@mui/material";

export const Messages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMessages);
  }, [dispatch]);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography> Messages</Typography>
    </Box>
  );
};
