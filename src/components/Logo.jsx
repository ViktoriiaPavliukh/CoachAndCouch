import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "@assets/icons/logo.svg";

export default function Logo({ width = "100%" }) {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          width: width,
        }}
      />
    </Box>
  );
}
