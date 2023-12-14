import React from "react";
import { Typography } from "@mui/material";

const PhoneNumber = ({ phoneNumber }) => {
  return (
    <Typography
      component="a"
      href={`tel:${phoneNumber}`}
      sx={{ textDecoration: "none", color: "inherit", "&:hover": {
                        color: (theme) => theme.palette.primary.accent,
      }}}
    >
      {phoneNumber}
    </Typography>
  );
};

export default PhoneNumber;
