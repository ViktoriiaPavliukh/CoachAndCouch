import { CardMedia } from "@mui/material";
import mainImage from "@assets/templates/Frame 868.webp";
export function MainImage({ src, ...props }) {
  return (
    <CardMedia
      component="img"
      src={src || mainImage}
      alt="Teacher's profile"
      sx={{
        width: { lg: "473px", xs: "343px", md: "385px" },
        height: { lg: "362px", xs: "263px", md: "483px" },
        borderRadius: "16px",
        maxWidth: "100%",
      }}
    />
  );
}
