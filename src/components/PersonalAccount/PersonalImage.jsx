import { PropTypes } from "prop-types";
import mainImage from "@assets/templates/profile_1.png";
import { CardMedia } from "@mui/material";

export function PersonalImage({ src }) {
  return (
    <CardMedia
      component="img"
      src={src || mainImage}
      alt="Teacher's profile"
      sx={{
        display: "flex",
        width: "275px",
        height: "214px",
        borderRadius: "0px",
        alignSelf: "stretch",
      }}
    />
  );
}
PersonalImage.propTypes = {
  src: PropTypes.string,
};
