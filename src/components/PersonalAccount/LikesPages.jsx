import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import Loader from "../Loader/Loader";
import { getCurrentUser } from "@/redux/users/operations";
import { fetchLikedAdverts } from "@/redux/marketplace/adverts/operations";
import {
  likesSelector,
  selectAdvertsIsLoading,
  advertsSelector,
} from "@/redux/marketplace/adverts/advertsSelector";
import {
  selectCurrentUser,
  selectUserIsLoading,
} from "@/redux/users/selectors";
import { TeacherCard } from "../Teachers/TeacherCard";

export function LikesPages() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const adverts = useSelector(advertsSelector) || []; // Ensure adverts is an array
  console.log("Adverts:", adverts);

  const currentUser = useSelector(selectCurrentUser);
  console.log("Current User:", currentUser);

  const isLoadingUser = useSelector(selectUserIsLoading);
  const isLoadingAdverts = useSelector(selectAdvertsIsLoading);
  const likedAdverts = useSelector(likesSelector) || [];
  console.log("Liked Adverts:", likedAdverts);

  const [likedAdvertIds, setLikedAdvertIds] = useState([]);
  console.log(likedAdvertIds);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    console.log("Current User updated:", currentUser);
    if (
      currentUser &&
      Array.isArray(currentUser.likes) &&
      currentUser.likes.length > 0
    ) {
      const ids = currentUser.likes.map((like) => like.advert.id);
      console.log("Liked Advert IDs:", ids);
      setLikedAdvertIds(ids);
    } else {
      console.log("No likes found or currentUser structure is not correct.");
      setLikedAdvertIds([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (likedAdvertIds.length > 0) {
      console.log("Fetching liked adverts with IDs:", likedAdvertIds);
      dispatch(fetchLikedAdverts(likedAdvertIds));
    }
  }, [dispatch, likedAdvertIds]);

  console.log("Liked Advert IDs state:", likedAdvertIds);

  if (!Array.isArray(adverts)) {
    console.error("Adverts is not an array:", adverts);
    return null;
  }

  return (
    <Box>
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
            justifyContent: { xs: "center", lg: "left" },
            ml: { lg: "48px" },
            py: "38px",
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
