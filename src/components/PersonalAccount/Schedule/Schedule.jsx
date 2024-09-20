import { Box } from "@mui/material";
import { MyCalendar } from "./MyCalendar";

export const Schedule = () => {
  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: "24px 20px", md: "24px 60px", lg: "40px 48px" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MyCalendar />
    </Box>
  );
};
