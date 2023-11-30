import { Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader() {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
      <CircularProgress />
    </Box>
  );
}
