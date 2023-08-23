import mainImage from "@assets/templates/profile_1.png";
import { CardMedia } from "@mui/material";
export function TeacherImage({ src }) {
  return (
    <CardMedia
      component="img"
      src={src || mainImage}
      alt="Teacher's profile"
      sx={{
        display: "flex",
        width: "373px",
        height: "264px",
        borderRadius: "0px",
        alignSelf: "stretch",
      }}
    />
  );
}
