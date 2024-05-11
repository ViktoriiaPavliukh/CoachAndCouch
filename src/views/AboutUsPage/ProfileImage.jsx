import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import profileImageLight from "@assets/images/profile_light.png";
import profileImageDark from "@assets/images/profile_dark.png";

export function ProfileImage() {
  const theme = useTheme();
  const profileImage =
    theme.palette.mode === "dark" ? profileImageDark : profileImageLight;

  return (
    <Box
      component="img"
      src={profileImage}
      alt="user profile"
      sx={{
        width: "100%",
        pt: { xs: "18px", md: "23px", xl: "38px" },
      }}
    />
  );
}
