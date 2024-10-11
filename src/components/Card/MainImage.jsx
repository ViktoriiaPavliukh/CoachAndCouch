import { PropTypes } from "prop-types";

import { CardMedia } from "@mui/material";
import mainImage from "@assets/templates/Frame 868.webp";

export function MainImage({ src }) {
  return (
    <CardMedia
      component="img"
      src={src || mainImage}
      alt="Teacher's profile"
      sx={{
        display: "flex",
        alignSelf: "center",
        width: { xl: "570px", lg: "473px", xs: "100%", md: "385px" },
        // height: { xl: "421px", lg: "362px", xs: "263px", md: "483px" },
        borderRadius: "8px",
        maxWidth: "100%",
      }}
    />
  );
}
MainImage.propTypes = {
  src: PropTypes.string,
};

