import {
  selectCurrentUser,
  selectUserIsLoading,
} from "@/redux/users/selectors";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getCurrentUser } from "@/redux/users/operations";
import {
  advertsSelector,
  selectAdvertsIsLoading,
} from "@/redux/marketplace/adverts/advertsSelector";
import { getAdverts } from "@/redux/marketplace/adverts/operations";
import { Box, Typography } from "@mui/material";

export function LikesPages() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const currentUser = useSelector(selectCurrentUser);
  const isLoadingUser = useSelector(selectUserIsLoading);
  const isLoadingAdverts = useSelector(selectAdvertsIsLoading);
  const adverts = useSelector(advertsSelector); // Make sure this is an array
  const [likedAdverts, setLikedAdverts] = useState([]);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getAdverts());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.id && adverts) {
      // Ensure adverts is an array
      const advertsArray = adverts.adverts || []; // Adjust according to actual data structure

      // Filter adverts based on the current user's likes
      const likedAdverts = advertsArray.filter((advert) =>
        advert.likes.some((like) => like.id === currentUser.id)
      );
      setLikedAdverts(likedAdverts);
    }
  }, [currentUser, adverts]);

  const isLoading = isLoadingUser || isLoadingAdverts;

  return isLoading ? (
    <Loader />
  ) : likedAdverts.length > 0 ? (
    <Box>
      {likedAdverts.map((advert) => (
        <Box key={advert.id}>
          <Typography>{advert.description}</Typography>
          <img
            src={advert.imagePath}
            alt={advert.description}
            width="100"
            height="80"
          />
        </Box>
      ))}
    </Box>
  ) : (
    <Typography
      sx={{
        display: "flex",
        width: "100%",
        height: "50vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {intl.formatMessage({ id: "noAdvertisement" })}
    </Typography>
  );
}
