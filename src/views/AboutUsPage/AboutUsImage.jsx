import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import aboutUsImageLight from "@assets/images/aboutLight.webp";
import aboutUsImageDark from "@assets/images/aboutDark.webp";

export function AboutUsImage() {
  const theme = useTheme();
  const aboutImage =
    theme.palette.mode === "dark" ? aboutUsImageDark : aboutUsImageLight;

  return (
    <Box
      component="img"
      loading="lazy"
      src={aboutImage}
      alt="happy child"
      sx={{
        maxWidth: { xs: "343px", md: "506px", lg: "563px", xl: "780px" },
        pt: { xs: "54px", md: "30px", lg: "0" },
      }}
    />
  );
}
