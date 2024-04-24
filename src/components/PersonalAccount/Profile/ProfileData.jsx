import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/redux/users/operations";
import {
  selectCurrentUser,
  selectUserIsLoading,
} from "@/redux/users/selectors";
import { countriesSelector } from "@/redux/admin/adminSelector";
import { Profile } from "../Profile";
import Loader from "../../Loader/Loader";

export function ProfileData() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectUserIsLoading);
  const countriesList = useSelector(countriesSelector);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : currentUser ? (
    <Profile currentUser={currentUser} countriesList={countriesList} />
  ) : (
    <Typography>No Data</Typography>
  );
}
