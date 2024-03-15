import { PropTypes } from "prop-types";
import mainImage from "@assets/icons/noPhoto.png";
import { CardMedia } from "@mui/material";

export function PersonalImage({
  src,
  advertImagePath,
  userImage,
  borderRadius,
  width,
  height,
}) {
  return (
    <CardMedia
      component="img"
      src={userImage || advertImagePath || mainImage}
      alt="Teacher's profile"
      sx={{
        display: "flex",
        width: width || "150px",
        height: height || "150px", 
        borderRadius: borderRadius || "50%", 
      }}
    />
  );
}

PersonalImage.propTypes = {
  src: PropTypes.string,
  advertImagePath: PropTypes.string,
  userImagePath: PropTypes.string,
  borderRadius: PropTypes.string, 
  width: PropTypes.string, 
  height: PropTypes.string, 
};
