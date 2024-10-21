import {
  selectCurrentUser,
  selectUserIsLoading,
} from "@/redux/users/selectors";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
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
import { Typography } from "@mui/material";

export function Advertisements() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectUserIsLoading);
  const advertId = currentUser.advert ? currentUser.advert.id : null;
  const countriesList = useSelector(countriesSelector);
  const languages = useSelector(languagesSelector);
  const specializations = useSelector(specializationsSelector);
  const [teacher, setTeacher] = useState(null);
  const [isTeacherLoading, setIsTeacherLoading] = useState(true);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCountries());
    dispatch(getLanguages());
    dispatch(getSpecializations());
  }, [dispatch]);

  useEffect(() => {
    if (advertId) {
      setIsTeacherLoading(true);
      dispatch(getAdvertById(advertId))
        .then((data) => {
          setTeacher(data.payload);
        })
        .catch((error) => {
          console.error("Error fetching teacher data: ", error);
        })
        .finally(() => {
          setIsTeacherLoading(false);
        });
    }
  }, [dispatch, advertId]);

  return isLoading || isTeacherLoading ? (
    <Loader />
  ) : advertId && currentUser && teacher ? (
    <PersonalAdvertForm
      teacher={teacher || {}}
      currentUser={currentUser}
      advertId={advertId}
      countriesList={countriesList}
      languages={languages}
      specializations={specializations}
    />
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
