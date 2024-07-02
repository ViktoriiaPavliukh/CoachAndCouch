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
  const adverts = useSelector(advertsSelector) || [];
  console.log("adverts", adverts);
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  const isLoadingUser = useSelector(selectUserIsLoading);
  const isLoadingAdverts = useSelector(selectAdvertsIsLoading);
  const likedAdverts = useSelector(likesSelector);
  console.log("114", likedAdverts);
  const [likedAdvertIds, setLikedAdvertIds] = useState([]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    console.log("Current User:", currentUser);
    if (currentUser && currentUser.likes && currentUser.likes.length > 0) {
      const ids = currentUser.likes.map((like) => like.advert.id);
      console.log("Liked Advert IDs:", ids);
      setLikedAdvertIds(ids);
    } else {
      // Handle case where likes are not available or empty
      setLikedAdvertIds([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (likedAdvertIds.length > 0) {
      dispatch(fetchLikedAdverts(likedAdvertIds));
    }
  }, [dispatch, likedAdvertIds]);
  console.log(133, likedAdvertIds);

  const isLoading = isLoadingUser || isLoadingAdverts;

  return (
    <>
      <Grid
        container
        sx={{
          flexDirection: { sm: "column", md: "row" },
          columnGap: { md: "28px" },
          rowGap: { xs: "28px", lg: "40px" },
          justifyContent: "left",
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
    </>
  );
}
