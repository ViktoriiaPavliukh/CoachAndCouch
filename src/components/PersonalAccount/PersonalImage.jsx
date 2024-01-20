import { PropTypes } from "prop-types";
import mainImage from "@assets/icons/noPhoto.png";
import { CardMedia } from "@mui/material";

export function PersonalImage({ src, advertImagePath, userImage }) {
  return (
    <CardMedia
      component="img"
      src={userImage || advertImagePath || mainImage}
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
  userImagePath: PropTypes.string,
};
