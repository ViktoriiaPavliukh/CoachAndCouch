import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/redux/users/operations";
import { getCountries } from "@/redux/admin/operations";
import {
  selectCurrentUser,
  selectUserIsLoading,
} from "@/redux/users/selectors";
import { countriesSelector } from "@/redux/admin/adminSelector";
import { Profile } from "../Profile";
import Loader from "../../Loader/Loader";
import { Typography } from "@mui/material";

export function ProfileData() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectUserIsLoading);
  const countriesList = useSelector(countriesSelector);

  useEffect(() => {
    dispatch(getCurrentUser());
    if (!countriesList.length) {
      dispatch(getCountries());
    }
  }, [dispatch, countriesList.length]);

  return isLoading ? (
    <Loader />
  ) : !currentUser || countriesList.length === 0 ? (
    <Typography>No Data</Typography>
  ) : (
    <Profile currentUser={currentUser} countriesList={countriesList} />
  );
}
