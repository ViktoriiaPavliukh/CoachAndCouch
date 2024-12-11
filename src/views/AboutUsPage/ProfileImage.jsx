import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import profileImageLight from "@assets/images/profile_light.webp";
import profileImageDark from "@assets/images/profile_dark.webp";

export function ProfileImage() {
  const theme = useTheme();
  const profileImage =
    theme.palette.mode === "dark" ? profileImageDark : profileImageLight;

  return (
    <Box
      component="img"
      loading="lazy"
      src={profileImage}
      alt="user profile"
      sx={{
        width: "100%",
        pt: { xs: "18px", md: "23px", xl: "38px" },
      }}
    />
  );
}
