import { Box, Typography } from "@mui/material";
import { MyCalendar } from "../MyCalendar/MyCalendar";

export const Schedule = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography>My Schedule</Typography>
      <MyCalendar />
    </Box>
  );
};
