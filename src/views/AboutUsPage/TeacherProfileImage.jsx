import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import teacherProfileImageLight from "@assets/images/teacherProfile_light.webp";
import teacherProfileImageDark from "@assets/images/teacherProfile_dark.webp";

export function TeacherProfileImage() {
  const theme = useTheme();
  const teacherProfileImage =
    theme.palette.mode === "dark"
      ? teacherProfileImageDark
      : teacherProfileImageLight;

  return (
    <Box
      component="img"
      src={teacherProfileImage}
      loading="lazy"
      alt="teacher profile"
      sx={{
        width: "100%",
        pt: { xs: "18px", md: "23px", xl: "38px" },
      }}
    />
  );
}
