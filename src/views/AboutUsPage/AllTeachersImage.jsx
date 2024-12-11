import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import allTeachersLight from "@assets/images/allTeachers_light.webp";
import allTeachersDark from "@assets/images/allTeachers_dark.webp";

export function AllTeachersImage() {
  const theme = useTheme();
  const allTeachersImage =
    theme.palette.mode === "dark" ? allTeachersDark : allTeachersLight;

  return (
    <Box
      component="img"
      loading="lazy"
      src={allTeachersImage}
      alt="all teachers profile"
      sx={{
        width: "100%",
        pt: { xs: "18px", md: "23px", xl: "38px" },
      }}
    />
  );
}
