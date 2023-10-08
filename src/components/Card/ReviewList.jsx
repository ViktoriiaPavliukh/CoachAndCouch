import { PropTypes } from "prop-types";
import { Box, List, ListItem, Typography } from "@mui/material";

export function ReviewList({ elements }) {
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      {elements.map((e) => (
        <ListItem key={e.id} sx={{ display: "flex", gap: "24px" }}>
          <img src={e.image} alt={e.name} style={{ width: "85px", height: "85px", borderRadius: "50%" }} />
          <Box>
            <Typography component="p" variant="posterCategory" color="primary.main" sx={{ mb: "8px" }}>
              {e.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                lineHeight: "calc(20 / 14)",
                color: "grey.600",
              }}
            >
              {e.text}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

ReviewList.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      text: PropTypes.string,
      image: PropTypes.string,
    })
  ),
};
