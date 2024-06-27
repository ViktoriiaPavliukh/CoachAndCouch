import { PropTypes } from "prop-types";
import { List, ListItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export function CategoryList({ elements }) {
  return (
    <List
      sx={{
        display: "flex",
        flexWrap: "wrap",
        mb: "18px",
        mt: "8px",
        gap: "5px",
        p: 0,
      }}
    >
      {elements?.map((e) => (
        <ListItem
          key={uuidv4()}
          sx={{
            padding: "6px 14px",
            backgroundColor: (theme) => theme.palette.background.messagesDate,
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
  );
}
CategoryList.propTypes = {
  elements: PropTypes.any,
};
