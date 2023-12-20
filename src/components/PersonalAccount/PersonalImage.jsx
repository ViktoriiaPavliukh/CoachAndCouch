import { PropTypes } from "prop-types";
import mainImage from "@assets/templates/profile_1.png";
import { CardMedia } from "@mui/material";

export function PersonalImage({ src, advertImagePath }) {
  return (
    <CardMedia
      component="img"
      src={advertImagePath || mainImage}
      alt="Teacher's profile"
      sx={{
        display: "flex",
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        // alignSelf: "stretch",
      }}
    />
  );
}
PersonalImage.propTypes = {
  src: PropTypes.string,
  advertImagePath: PropTypes.string,
};
