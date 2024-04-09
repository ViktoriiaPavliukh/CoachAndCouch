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
    // <Container
    //   component="div"
    //   sx={
    //     {
    //   pt: 11,
    //   maxWidth: { lg: "1200px", md: "834px", sm: "375px" },
    //   pl: { lg: "30px", md: "20px", sm: "15px" },
    //   pr: { lg: "30px", md: "20px", sm: "15px" },
    //   display: "flex",
    //   justifyContent: "flex-start",
    //   gap: "122px",
    //   height: "100%",
    //   pb: "79px",
    //     }
    //   }
    // >
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
