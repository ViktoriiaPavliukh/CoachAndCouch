import "react-calendar/dist/Calendar.css";

import {
  Container,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { useState } from "react";

import { Sidebar } from "./Sidebar";

export function PersonalAccount() {
  const [image, setImage] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <Container
      component="div"
      sx={{
        paddingY: "40px",
        paddingX: { xs: "0", md: "37px" },
        display: "flex",
        gap: "40px",
        height: "100%",
      }}
    >
      <Sidebar />

      <Outlet />
    </Container>
  );
}
