import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
      <CircularProgress />
    </Box>
  );
}
