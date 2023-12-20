import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Box, Button } from "@mui/material";
import {
  toggleLanguage,
  selectCurrentLanguage,
} from "@/redux/marketplace/languages/languageSlice.js";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectCurrentLanguage);
  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "0",
        "&:hover": {
          color: (theme) => theme.palette.primary.accent,
        },
      }}
    >
      <IconButton
        onClick={handleToggleLanguage}
        color="inherit"
        sx={{
          padding: 0,
        }}
      ></IconButton>
      <Button
        onClick={handleToggleLanguage}
        color="inherit"
        sx={{
          padding: 0,
          fontSize: "16px",
        }}
      >
        <span
          style={{
            fontWeight: currentLanguage === "uk" ? 700 : 400,
            color: currentLanguage === "uk" ? "#FFF" : "#9CA3AF",
          }}
        >
          УК
        </span>{" "}
        &nbsp;|&nbsp;{" "}
        <span
          style={{
            fontWeight: currentLanguage === "en" ? 700 : 400,
            color: currentLanguage === "en" ? "#FFF" : "#9CA3AF",
          }}
        >
          EN
        </span>
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
