import { Box } from "@mui/material";
import { MyCalendar } from "./MyCalendar";

export const Schedule = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "708px", lg: "1032px", xl: "1510px" },
        paddingTop: { xs: "32px", md: "24px", lg: "46px" },
        paddingLeft: { md: "60px", lg: "41px", xl: "48px" },

        display: "flex",
        flexDirection: "column",
      }}
    >
      <MyCalendar />
    </Box>
  );
};
