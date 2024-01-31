import { selectCurrentUser, selectuserIsLoading } from "@/redux/users/selectors";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getCurrentUser } from "@/redux/users/operations";
import { PersonalAdvertForm } from "./PersonalAdvertForm";
import { getCountries, getLanguages, getSpecializations } from "@/redux/admin/operations";
import { countriesSelector, languagesSelector, specializationsSelector } from "@/redux/admin/adminSelector";

export function Advertisements() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  const isLoading = useSelector(selectuserIsLoading);
  const advertId = currentUser.advert ? currentUser.advert.id : null;
  console.log(advertId);
  const countriesList = useSelector(countriesSelector);
  console.log(countriesList);
  const languages = useSelector(languagesSelector);
  const specializations = useSelector(specializationsSelector);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCountries());
    dispatch(getLanguages());
    dispatch(getSpecializations());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : advertId && currentUser ? (
    <PersonalAdvertForm
      currentUser={currentUser}
      advertId={advertId}
      countriesList={countriesList}
      languages={languages}
      specializations={specializations}
    />
  ) : (
    <div>Ви ще не маєте оголошення</div>
  );
}
