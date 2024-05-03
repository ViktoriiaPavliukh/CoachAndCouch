import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import logoImageUp from "@assets/icons/c.svg";
import logoImageDown from "@assets/icons/cdown.svg";

export function LargeLogoUp() {
  return (
    <Box
      component="img"
      src={logoImageUp}
      alt="big logo"
      sx={{
        justifySelf: "end",
        alignSelf: "end",
        maxWidth: { xs: "241px", md: "307px", xl: "389px" },
      }}
    />
  );
}

export function LargeLogoDown() {
  return (
    <Box
      component="img"
      src={logoImageDown}
      alt="big logo"
      sx={{
        alignSelf: "start",
        maxWidth: { xs: "258px", md: "318px", xl: "389px" },
      }}
    />
  );
}
