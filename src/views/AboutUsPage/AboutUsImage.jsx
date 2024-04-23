import { useTheme } from "@mui/material/styles";
import aboutUsImageLight from "@assets/images/aboutLight.png";
import aboutUsImageDark from "@assets/images/aboutDark.png";

export function AboutUsImage() {
  const theme = useTheme();
  const aboutImage =
    theme.palette.mode === "dark" ? aboutUsImageDark : aboutUsImageLight;

  return (
    <img
      src={aboutImage}
      alt="happy child"
      style={{
        width: "50%",
      }}
    />
  );
}
