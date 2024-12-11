import { PropTypes } from "prop-types";
import mainImage from "@assets/templates/profile_1.webp";
import { CardMedia } from "@mui/material";

export function TeacherImage({ src }) {
  return (
    <CardMedia
      component="img"
      loading="lazy"
      src={src || mainImage}
      alt="Teacher's profile"
      sx={{
        display: "flex",
        position: "relative",
        height: "264px",
        borderRadius: "20px",
        alignSelf: "stretch",
        padding: "12px",
      }}
    />
  );
}

TeacherImage.propTypes = {
  src: PropTypes.string,
};
