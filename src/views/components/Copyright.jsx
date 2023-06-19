import React from "react";
import { Link, Typography } from "@mui/material";

import { siteName, siteDomain } from "../index";

export function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      style={{ marginTop: '20px' }}
    >
      {"Copyright © "}
      <Link color="inherit" href={siteDomain}>
        {siteName}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
