import "react-calendar/dist/Calendar.css";

import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

import { Sidebar } from "./Sidebar";

export function PersonalAccount() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "center", lg: "flex-start" },
        justifyContent: "flex-start",
        flexDirection: { xs: "column", lg: "row" },
        width: "100%",
        height: "100%",
      }}
    >
      <Sidebar />
      <Outlet />
    </Box>
  );
}
