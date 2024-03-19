// import {
//   selectCurrentUser,
//   selectUserIsLoading,
// } from "@/redux/users/selectors";
// import { useEffect, useState } from "react";
// import { useIntl } from "react-intl";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../../Loader/Loader";
// import { getCurrentUser } from "@/redux/users/operations";
// import {
//   getCountries,
//   getLanguages,
//   getSpecializations,
// } from "@/redux/admin/operations";
// import { getAdvertById } from "@/redux/marketplace/adverts/operations";
// // import {
// //   countriesSelector,
// //   languagesSelector,
// //   specializationsSelector,
// // } from "@/redux/admin/adminSelector";
// import { Typography } from "@mui/material";
// import { PersonalProfile } from "./PersonalProfile";

// export function Profile() {
//   const dispatch = useDispatch();
//   const intl = useIntl();
//   const currentUser = useSelector(selectCurrentUser);
//   const isLoading = useSelector(selectUserIsLoading);
//   // const countriesList = useSelector(countriesSelector);
//   // const languages = useSelector(languagesSelector);
//   // const specializations = useSelector(specializationsSelector);
//   const [teacher, setTeacher] = useState(null);
//   const [dataChanged, setDataChanged] = useState(false);

//   useEffect(() => {
//     dispatch(getCurrentUser());
//     // dispatch(getCountries());
//     // dispatch(getLanguages());
//     // dispatch(getSpecializations());
//   }, [dispatch]);

//   // useEffect(() => {
//   //   if (advertId) {
//   //     dispatch(getAdvertById(advertId))
//   //       .then((data) => {
//   //         setTeacher(data.payload);
//   //       })
//   //       .catch((error) =>
//   //         console.error("Error fetching teacher data: ", error)
//   //       );
//   //   }
//   // }, [dispatch, advertId]);

//   return isLoading ? (
//     <Loader />
//   ) : currentUser ? (
//     <PersonalProfile
//       // teacher={teacher || {}}
//       currentUser={currentUser}
//       // advertId={advertId}
//       // countriesList={countriesList}
//       // languages={languages}
//       // specializations={specializations}
//       // dataChanged={dataChanged}
//     />
//   ) : (
//     <Typography>{intl.formatMessage({ id: "noAdvertisement" })}</Typography>
//   );
// }
