import * as React from "react";
import { Box } from "@mui/material";
import { VerticalTabs } from "./VerticalTabs";

export const AdminPanelPage = () => {
  return (
    <Box
      component="div"
      sx={{
        justifyContent: "center",
        width: "100%",
      }}
    >
      <VerticalTabs />
    </Box>
  );
};
