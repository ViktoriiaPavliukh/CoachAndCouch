import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Box, Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
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
      >
        <LanguageIcon sx={{ padding: 0 }} />
      </IconButton>
      <Button
        onClick={handleToggleLanguage}
        color="inherit"
        sx={{
          padding: 0,
          minWidth: "34px",
        }}
      >
        {currentLanguage === "uk" ? "Укр" : "Eng"}
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
