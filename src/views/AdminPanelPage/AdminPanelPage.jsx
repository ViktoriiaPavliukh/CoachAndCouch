import * as React from "react";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { Box, SvgIcon } from "@mui/material";
import { Link } from "react-router-dom";
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
      <Link
        className="custom-link"
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          marginTop: "20px",
          "&:hover": {
            color: (theme) => theme.palette.textColor.menuHover,
          },
        }}
      >
        <Box component="span" style={{ marginBottom: "20px" }}>
          <SvgIcon
            component={KeyboardBackspaceSharpIcon}
            height="18px"
            style={{ verticalAlign: "middle" }}
          />
          Back to the Home page
        </Box>
      </Link>
      <VerticalTabs />
    </Box>
  );
};
