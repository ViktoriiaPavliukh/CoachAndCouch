import { Box, CircularProgress } from "@mui/material";
import { palette } from "@mui/system";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
