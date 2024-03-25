import { Box } from "@mui/material";
import { MyCalendar } from "./MyCalendar";

export const Schedule = () => {
  return (
    <Box
      sx={{
        paddingTop: { xs: "32px", md: "24px", lg: "46px" },
        paddingLeft: { md: "60px", lg: "41px" },

        width: { xs: "100%", md: "648px", lg: "991px" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MyCalendar />
    </Box>
  );
};
