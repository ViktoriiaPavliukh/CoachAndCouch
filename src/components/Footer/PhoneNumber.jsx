import React from "react";
import { Typography } from "@mui/material";

const PhoneNumber = ({ phoneNumber }) => {
  return (
    <Typography
      component="a"
      href={`tel:${phoneNumber}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {phoneNumber}
    </Typography>
  );
};

export default PhoneNumber;
