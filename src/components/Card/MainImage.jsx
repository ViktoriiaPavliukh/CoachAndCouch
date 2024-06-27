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
        width: { xl: "570px", lg: "473px", xs: "343px", md: "385px" },
        height: { xl: "421px", lg: "362px", xs: "263px", md: "483px" },
        borderRadius: "8px",
        maxWidth: "100%",
      }}
    />
  );
}
MainImage.propTypes = {
  src: PropTypes.string,
};
// https://an-talla.co.uk/wp-content/uploads/2022/09/Santa-social-Edited.png
