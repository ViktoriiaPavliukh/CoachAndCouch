import {
  selectCurrentUser,
  selectuserIsLoading,
} from "@/redux/users/selectors";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getCurrentUser } from "@/redux/users/operations";
import { PersonalAdvertForm } from "./PersonalAdvertForm";
import {
  getCountries,
  getLanguages,
  getSpecializations,
} from "@/redux/admin/operations";
import { getAdvertById } from "@/redux/marketplace/adverts/operations";
import {
  countriesSelector,
  languagesSelector,
  specializationsSelector,
} from "@/redux/admin/adminSelector";

export function Advertisements() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  const isLoading = useSelector(selectuserIsLoading);
  const advertId = currentUser.advert ? currentUser.advert.id : null;
  const countriesList = useSelector(countriesSelector);
  console.log(countriesList);
  const languages = useSelector(languagesSelector);
  const specializations = useSelector(specializationsSelector);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCountries());
    dispatch(getLanguages());
    dispatch(getSpecializations());
  }, [dispatch]);

  useEffect(() => {
    if (advertId) {
      dispatch(getAdvertById(advertId))
        .then((data) => setTeacher(data.payload))
        .catch((error) =>
          console.error("Error fetching teacher data: ", error)
        );
    }
  }, [dispatch, advertId]);

  return isLoading ? (
    <Loader />
  ) : advertId && currentUser ? (
    <PersonalAdvertForm
      teacher={teacher || {}}
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
