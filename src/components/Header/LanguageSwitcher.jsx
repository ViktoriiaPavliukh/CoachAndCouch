import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IconButton, Box } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState("uk");

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "uk" ? "en" : "uk");
  };

  return (
    <Box sx={{display: "flex", gap: "0"}}>
      <IconButton onClick={toggleLanguage} color="inherit" sx={{padding: 0}}>
        <LanguageIcon sx={{padding: 0}}/>
      </IconButton>
      <Button onClick={toggleLanguage} color="inherit" sx={{padding: 0, minWidth:"34px"}}>
        {currentLanguage === "uk" ? "Укр" : "Eng"}
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
