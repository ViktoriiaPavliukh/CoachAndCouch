import { PropTypes } from "prop-types";
import { List, ListItem, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export function CategoryList({ elements }) {
  return (
    <Box>
      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
          my: "12px",
          gap: "10px",
          p: 0,
          flexWrap: "nowrap",
          overflow: "auto",
          whiteSpace: "nowrap",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {elements?.map((e) => (
          <ListItem
            key={uuidv4()}
            sx={{
              padding: "6px 14px",
              backgroundColor: (theme) => theme.palette.background.languageBg,
              borderRadius: "16px",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "calc(16 / 12)",
              width: "auto",
              color: (theme) => theme.palette.textColor.listColor,
            }}
          >
            {Object.values(e)}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
CategoryList.propTypes = {
  elements: PropTypes.any,
};
