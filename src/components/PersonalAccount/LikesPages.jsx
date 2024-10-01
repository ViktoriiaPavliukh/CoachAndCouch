import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box, Grid, Typography } from "@mui/material";
import { getCurrentUser } from "@/redux/users/operations";
import { fetchLikedAdverts } from "@/redux/marketplace/adverts/operations";
import {
  advertsSelector,
} from "@/redux/marketplace/adverts/advertsSelector";
import {
  selectCurrentUser,
} from "@/redux/users/selectors";
import { TeacherCard } from "../Teachers/TeacherCard";

export function LikesPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const adverts = useSelector(advertsSelector) || [];
  const currentUser = useSelector(selectCurrentUser);
  const [likedAdvertIds, setLikedAdvertIds] = useState([]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (
      currentUser &&
      Array.isArray(currentUser.likes) &&
      currentUser.likes.length > 0
    ) {
      const ids = currentUser.likes.map((like) => like.advert.id);
      setLikedAdvertIds(ids);
    } else {
      setLikedAdvertIds([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (likedAdvertIds.length > 0) {
      dispatch(fetchLikedAdverts(likedAdvertIds));
    }
  }, [dispatch, likedAdvertIds]);

  if (currentUser.likes.length > 0 && !Array.isArray(adverts)) {
    return null;
  }

  const handleClick = () => {
    // e.preventDefault();

    navigate(`/teachers/${teacher.id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {likedAdvertIds.length === 0 ? (
        <Typography
          sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {intl.formatMessage({ id: "noFavorites" })}
        </Typography>
      ) : (
        <Grid
          container
          sx={{
            flexDirection: { sm: "column", md: "row" },
            columnGap: { md: "28px", lg: "60px" },
            rowGap: { xs: "28px", lg: "40px" },
            justifyContent: {
              xs: "center",
              md: "flex-start",
            },
            alignItems: "center",
            py: "38px",
            px: { xs: "16px", md: "60px", lg: "46px" },
          }}
        >
          {adverts.map((advert) => (
            <Grid item key={advert.id}>
              <TeacherCard teacher={advert} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
