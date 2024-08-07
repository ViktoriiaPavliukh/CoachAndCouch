import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/users/selectors";
import { languagesSelector } from "@/redux/admin/adminSelector";
import { getLanguages } from "@/redux/admin/operations";
import {
  advertByIdSelector,
  selectAdvertsIsLoading,
} from "@/redux/marketplace/adverts/advertsSelector";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { languageProficiencyLevels } from "@/defaults";

export default function FormTrial({ selected, onClose }) {
  const intl = useIntl();
  const en = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();
  const { id: teacherId } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const languages = useSelector(languagesSelector);
  console.log(languages);
  const teacher = useSelector(advertByIdSelector);

  const [choosenLanguages, setChoosenLanguages] = useState([]);
  const [teachingLevel, setTeachingLevel] = useState("");

  // useEffect(() => {
  //   dispatch(getLanguages());
  // }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleChoosenLanguagesChange = (event) => {
    setChoosenLanguages(event.target.value);
  };

  const handleTeachingLanguagesChange = (event) => {
    setTeachingLanguages(event.target.value);
  };

  const handleTeachingLevelChange = (event) => {
    setTeachingLevel(event.target.value);
  };

  const proficiencyLevels =
    languageProficiencyLevels[en] || languageProficiencyLevels.ua;

  return (
    <Box
      sx={{
        width: { xs: "343px", md: "648px", lg: "1208px" },
        height: "auto",
        position: "fixed",
        top: "50%",
        left: "50%",
        backgroundColor: "white",
        transform: "translate(-50%,-50%)",
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Typography>Fill in the details</Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Typography>
          {currentUser.firstName} {currentUser.lastName}
        </Typography>
        <Typography>
          {teacher?.user?.firstName} {teacher?.user?.lastName}
        </Typography>
        <Typography>{selected ? selected.toString() : ""}</Typography>
        <Typography>{teacher?.price} USD</Typography>
        <Typography>Розкажіть викладачу про себе</Typography>
        <FormControl fullWidth variant="outlined">
          <InputLabel>
            {intl.formatMessage({ id: "chooseLanguage" })}
          </InputLabel>
          <Select
            id="choosenLanguages"
            name="choosenLanguages"
            label={intl.formatMessage({ id: "chooseLanguage" })}
            multiple
            value={choosenLanguages}
            onChange={handleChoosenLanguagesChange}
            renderValue={(selected) =>
              selected
                .map((language) =>
                  en === "en" ? language.languageEn : language.languageUa
                )
                .join(", ")
            }
          >
            {languages &&
              languages.map((language) => (
                <MenuItem key={uuidv4()} value={language}>
                  {en === "en" ? language.languageEn : language.languageUa}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel>{intl.formatMessage({ id: "chooseLevel" })}</InputLabel>
          <Select
            id="teachingLevel"
            name="teachingLevel"
            label={intl.formatMessage({ id: "chooseLevel" })}
            value={teachingLevel}
            onChange={handleTeachingLevelChange}
            renderValue={(selected) =>
              proficiencyLevels.find((item) => item.value === selected)
                ?.label || ""
            }
          >
            {proficiencyLevels.map((level) => (
              <MenuItem key={uuidv4()} value={level.value}>
                {level.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </form>
    </Box>
  );
}

// import React from "react";
// import { useIntl } from "react-intl";
// import { v4 as uuidv4 } from "uuid";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { selectCurrentUser } from "@/redux/users/selectors";
// import { languagesSelector } from "@/redux/admin/adminSelector";
// import {
//   advertByIdSelector,
//   selectAdvertsIsLoading,
// } from "@/redux/marketplace/adverts/advertsSelector";
// import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Stack,
//   Radio,
//   RadioGroup,
//   FormLabel,
//   FormControlLabel,
// } from "@mui/material";

// export default function FormTrial({ selected, onClose }) {
//   const intl = useIntl();
//   const en = useSelector(selectCurrentLanguage);
//   const dispatch = useDispatch();
//   const { id: teacherId } = useParams();
//   const currentUser = useSelector(selectCurrentUser);
//   const languages = useSelector(languagesSelector);
//   const teacher = useSelector(advertByIdSelector);
//   console.log(teacher);
//   const handleSubmit = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <Box
//       sx={{
//         width: { xs: "343px", md: "648px", lg: "1208px" },
//         height: "400px",
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         backgroundColor: "white",
//         transform: "translate(-50%,-50%)",
//         padding: "48px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "20px",
//         justifyContent: "center",
//         zIndex: 1000,
//       }}
//     >
//       <Typography>Fill in the details</Typography>
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "20px" }}
//       >
//         <Typography>
//           {currentUser.firstName} {currentUser.lastName}
//         </Typography>
//         <Typography>
//           {teacher.user.firstName} {teacher.user.lastName}
//         </Typography>
//         <Typography>{selected ? selected.toString() : ""}</Typography>
//         <Typography>{teacher.price} USD</Typography>
//         {/* <TextField label="Email" variant="outlined" type="email" required /> */}
//         <Typography>Розкажіть викладачу про себе</Typography>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel>
//             {intl.formatMessage({ id: "languagesSpoken" })}
//           </InputLabel>
//           <Select
//             id="spokenLanguages"
//             name="spokenLanguages"
//             multiple
//             label="languagesSpoken"
//             onChange={(event) => {
//               formik.setFieldValue("spokenLanguages", event.target.value);
//             }}
//             onBlur={formik.handleBlur}
//             error={
//               formik.touched.spokenLanguages &&
//               Boolean(formik.errors.spokenLanguages)
//             }
//             renderValue={(selected) =>
//               selected
//                 .map((language) =>
//                   en === "en" ? language.languageEn : language.languageUa
//                 )
//                 .join(", ")
//             }
//           >
//             {languages &&
//               languages.map((language) => (
//                 <MenuItem key={uuidv4()} value={language}>
//                   {en === "en" ? language.languageEn : language.languageUa}
//                 </MenuItem>
//               ))}
//           </Select>
//         </FormControl>
//         {/* <FormControl fullWidth variant="outlined">
//           <InputLabel>
//             {intl.formatMessage({ id: "languagesTeaching" })}
//           </InputLabel>
//           <Select
//             id="teachingLanguages"
//             name="teachingLanguages"
//             multiple
//             label="languagesTeaching"
//             onChange={(event) => {
//               formik.setFieldValue("teachingLanguages", event.target.value);
//             }}
//             onBlur={formik.handleBlur}
//             error={
//               formik.touched.teachingLanguages &&
//               Boolean(formik.errors.teachingLanguages)
//             }
//             renderValue={(selected) =>
//               selected
//                 .map((language) =>
//                   en === "en" ? language.languageEn : language.languageUa
//                 )
//                 .join(", ")
//             }
//           >
//             {languages &&
//               languages.map((language) => (
//                 <MenuItem key={uuidv4()} value={language}>
//                   {en === "en" ? language.languageEn : language.languageUa}
//                 </MenuItem>
//               ))}
//           </Select>
//         </FormControl> */}
//         <Button type="submit" variant="contained">
//           Submit
//         </Button>
//         <Button variant="outlined" onClick={onClose}>
//           Close
//         </Button>
//       </form>
//     </Box>
//   );
// }
