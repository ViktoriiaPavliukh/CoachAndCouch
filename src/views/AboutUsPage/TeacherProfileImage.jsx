import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import teacherProfileImageLight from "@assets/images/teacherProfile_light.png";
import teacherProfileImageDark from "@assets/images/teacherProfile_dark.png";

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
      alt="teacher profile"
      sx={{
        width: "100%",
        pt: { xs: "18px", md: "23px", xl: "38px" },
      }}
    />
  );
}
