import React from "react";
import { IconButton } from "@mui/material";
import { FavoriteBorderOutlined as Icon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  favoriteAdvert,
  getAdverts,
} from "@/redux/marketplace/adverts/operations";

export function LikeBtn({ advertId, onLikeClick }) {
  const dispatch = useDispatch();

  const handleLike = async (advertId) => {
    try {
      event.preventDefault();
      await dispatch(favoriteAdvert(String(advertId))).unwrap();
       dispatch(getAdverts);
      // window.location.reload();
    } catch (error) {
      console.error("Failed to mark as favorite:", error);
    }
  };

  return (
    <IconButton
      color="inherit"
      sx={{
        color: "text.primary",
        width: 32,
        height: 32,
        boxShadow:
          "0px 1px 1px 0px rgba(9, 10, 13, 0.08), 1px 0px 4px 0px rgba(9, 10, 13, 0.12)",
      }}
      onClick={() => handleLike(advertId)}
    >
      <Icon sx={{ width: 16, height: 16 }} />
    </IconButton>
  );
}
