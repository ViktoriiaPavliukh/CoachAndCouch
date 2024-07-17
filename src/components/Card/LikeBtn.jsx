import React from "react";
import { IconButton } from "@mui/material";
import { FavoriteBorderOutlined as Icon } from "@mui/icons-material";

export function LikeBtn({ isLiked, onClick }) {
  return (
    <IconButton
      color="inherit"
      sx={{
        width: 32,
        height: 32,
        boxShadow:
          "0px 1px 1px 0px rgba(9, 10, 13, 0.08), 1px 0px 4px 0px rgba(9, 10, 13, 0.12)",
      }}
      onClick={onClick}
    >
      <Icon
        sx={{
          color: isLiked
            ? (theme) => theme.palette.textColor.red
            : (theme) => theme.palette.textColor.fontColor,
          width: 16,
          height: 16,
        }}
      />
    </IconButton>
  );
}
