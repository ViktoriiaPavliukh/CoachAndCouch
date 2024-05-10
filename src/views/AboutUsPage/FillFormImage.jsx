import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import formLight from "@assets/images/laptopLight.svg";
import formDark from "@assets/images/laptopDark.svg";

export function FillFormImage() {
  const theme = useTheme();
  const formImage = theme.palette.mode === "dark" ? formDark : formLight;

  return (
    <Box
      component="img"
      src={formImage}
      alt="form fill"
      sx={{
        pt: { xs: "50px", lg: "0" },
        maxWidth: { xs: "343px", md: "648px", xl: "782px" },
      }}
    />
  );
}
