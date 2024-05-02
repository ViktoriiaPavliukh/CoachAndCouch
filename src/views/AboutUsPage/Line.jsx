import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import greenLine from "@assets/icons/greenLine.svg";
import yellowLine from "@assets/icons/yellowLine.svg";

export function Line() {
  const theme = useTheme();
  const lineImage = theme.palette.mode === "dark" ? yellowLine : greenLine;

  return (
    <Box
      component="img"
      src={lineImage}
      alt="vertical line"
      sx={{
        display: "flex",
        width: { xs: "38px", xl: "45px" },
        height: { xs: "440px", md: "398px", lg: "422px", xl: "474px" },
      }}
    />
  );
}
