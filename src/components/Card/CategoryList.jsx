import { PropTypes } from "prop-types";
import { List, ListItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export function CategoryList({ elements }) {
  return (
    <List
      sx={{
        display: "flex",
        flexWrap: "wrap",
        mb: 2.5,
        mt: 1,
        gap: 1,
        p: 0,
        color: "grey.400",
      }}
    >
      {elements?.map((e) => (
        <ListItem
          key={uuidv4()}
          sx={{
            padding: "4px 8px",
            border: "1px solid lightgrey",
            borderRadius: "16px",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "calc(16 / 12)",
            width: "auto",
            color: "text.primary",
          }}
        >
          {/* Додати пропс мови для перевірки на мову */}
          {Object.values(e.languageUa)}
        </ListItem>
      ))}
    </List>
  );
}
CategoryList.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape),
};
