import { Link, Typography } from "@mui/material";
import { siteDomain, siteName } from "@/defaults";

export function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      style={{ marginTop: "20px" }}
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
