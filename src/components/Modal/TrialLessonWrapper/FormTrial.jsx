import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/users/selectors";
import {
  languagesSelector,
  countriesSelector,
  specializationsSelector,
} from "@/redux/admin/adminSelector";
import {
  getCountries,
  getLanguages,
  getSpecializations,
} from "@/redux/admin/operations";
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
  Stack,
  MenuItem,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { languageProficiencyLevels } from "@/defaults";
import useFormattedDate from "@/hooks/useFormattedDate";
import countries from "../../../defaults/countries/countries.json";
import countriesCase from "@/helpers/countriesCase";
import { acceptBooking } from "@/redux/marketplace/bookings/operations";

export default function FormTrial({
  selected,
  onClose,
  bookingDetails,
  isFirstTimeBooking,
}) {
  const intl = useIntl();
  console.log(isFirstTimeBooking);
  const en = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();
  const { id: teacherId } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const languages = useSelector(languagesSelector);
  const countriesList = useSelector(countriesSelector);
  const specializations = useSelector(specializationsSelector);
  const teacher = useSelector(advertByIdSelector);
  const formattedDateTime = useFormattedDate(selected);

  const [choosenLanguages, setChoosenLanguages] = useState([]);
  const [nativeLanguages, setNativeLanguages] = useState([]);
  const [teachingLevel, setTeachingLevel] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    currentUser?.country?.alpha2 || ""
  );

  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  // useEffect(() => {
  //   dispatch(getLanguages());
  //   dispatch(getSpecializations());
  //   dispatch(getCountries());
  // }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedLanguageObj = languages.find(
      (lang) => lang.id === choosenLanguages[0].id
    );
    const selectedNativeObj = languages.find(
      (lang) => lang.id === nativeLanguages[0].id
    );
    const selectedCountryObj = countries.find(
      (country) => country.alpha2 === selectedCountry
    );
    const selectedLevelObj = proficiencyLevels.find(
      (level) => level.value === teachingLevel
    );

    const info = {
      level: selectedLevelObj ? selectedLevelObj.label : "",
      from: selectedCountryObj
        ? en === "en"
          ? selectedCountryObj.nameEng
          : countriesCase(selectedCountryObj.nameShort)
        : "",
      motherTongue: selectedNativeObj
        ? en === "en"
          ? selectedNativeObj.languageEn
          : selectedNativeObj.languageUa
        : "",
    };

    const dataToPost = {
      bookingId: bookingDetails.id,
      languageId: choosenLanguages[0].id,
      info,
    };

    dispatch(acceptBooking(dataToPost))
      .unwrap()
      .then((response) => {
        console.log("Booking successful:", response);
        // onClose();
      })
      .catch((error) => {
        console.error("Booking failed:", error);
      });
  };

  const handleChoosenLanguagesChange = (event) => {
    setChoosenLanguages(event.target.value);
  };

  const handleTeachingLevelChange = (event) => {
    setTeachingLevel(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleNativeLanguagesChange = (event) => {
    setNativeLanguages(event.target.value);
  };

  const handleSpecializationClick = (specialization) => {
    setSelectedSpecializations((prev) =>
      prev.includes(specialization)
        ? prev.filter((s) => s !== specialization)
        : [...prev, specialization]
    );
  };

  const proficiencyLevels =
    languageProficiencyLevels[en] || languageProficiencyLevels.ua;

  return (
    <Box
      sx={{
        width: { xs: "91%", md: "84%", lg: "1208px" },
        height: "100%",
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        paddingX: { xs: "8px", md: "48px" },
        paddingTop: { lg: "30%" },
        pb: { xs: "24px", md: "48px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 1000,
        overflowY: "auto",
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ArrowBackIcon onClick={onClose} />
        <Typography
          sx={{
            display: { xs: "none", md: "flex" },
            fontSize: { xs: "24px", md: "30px" },
            textAlign: "center",
          }}
        >
          {intl.formatMessage({ id: "fillForm" })}
        </Typography>
        <CloseIcon onClick={onClose} />
      </Stack>
      <Typography
        sx={{
          textAlign: "center",
          width: "100%",
          pt: "12px",
          display: { xs: "block", md: "none" },
          margin: "0 auto",
          fontSize: { xs: "24px", md: "30px" },
        }}
      >
        {intl.formatMessage({ id: "fillForm" })}
      </Typography>
      <Divider sx={{ marginTop: "28px" }} />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Typography sx={{ mt: "24px" }}>
          {currentUser.firstName}
          {currentUser.lastName ? ` ${currentUser.lastName}` : ""}
          {intl.formatMessage({ id: "booking" })}:
        </Typography>
        <Typography>
          {intl.formatMessage({ id: "yourTeacher" })}:{" "}
          {teacher?.user?.firstName} {teacher?.user?.lastName}
        </Typography>
        <Typography>
          {intl.formatMessage({ id: "dateTime" })}: {formattedDateTime}
        </Typography>
        <Typography>
          {intl.formatMessage({ id: "priceSchedule" })}: {teacher?.price} USD
        </Typography>
        <Divider sx={{ marginTop: "4px", marginBottom: "8px" }} />
        {isFirstTimeBooking && (
          <>
            <Typography>{intl.formatMessage({ id: "formDetails" })}</Typography>
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
                {teacher?.teachingLanguages &&
                  teacher.teachingLanguages.map((language) => (
                    <MenuItem key={uuidv4()} value={language}>
                      {en === "en" ? language.languageEn : language.languageUa}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel>
                {intl.formatMessage({ id: "chooseLevel" })}
              </InputLabel>
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
            <Stack
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: { xs: "20px", lg: "64px" },
              }}
            >
              <FormControl fullWidth variant="outlined">
                <InputLabel>
                  {intl.formatMessage({ id: "whereFrom" })}
                </InputLabel>
                <Select
                  id="country"
                  name="country"
                  label="whereFrom"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  renderValue={(selected) => {
                    const selectedCountry = countries.find(
                      (el) => el.alpha2 === selected
                    );
                    return selectedCountry
                      ? en === "en"
                        ? selectedCountry.nameEng
                        : countriesCase(selectedCountry.nameShort)
                      : selected;
                  }}
                >
                  {countriesList &&
                    countriesList.map((country) => {
                      const fullCountry = countries.find(
                        (el) => el.alpha2 === country.alpha2
                      );
                      if (fullCountry) {
                        return (
                          <MenuItem key={country.alpha2} value={country.alpha2}>
                            {en === "en"
                              ? fullCountry.nameEng
                              : countriesCase(fullCountry.nameShort)}
                          </MenuItem>
                        );
                      } else {
                        return null;
                      }
                    })}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel>
                  {intl.formatMessage({ id: "nativeLanguage" })}
                </InputLabel>
                <Select
                  id="nativeLanguage"
                  name="nativeLanguage"
                  label={intl.formatMessage({ id: "nativeLanguage" })}
                  multiple
                  value={nativeLanguages}
                  onChange={handleNativeLanguagesChange}
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
                        {en === "en"
                          ? language.languageEn
                          : language.languageUa}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
            <Typography>
              {intl.formatMessage({ id: "learningGoal" })}
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                  flexWrap: "wrap",
                  gap: "18px 64px",
                },
              }}
            >
              {specializations &&
                specializations.map((specialization) => (
                  <Button
                    key={uuidv4()}
                    variant={
                      selectedSpecializations.includes(specialization)
                        ? "contained"
                        : "outlined"
                    }
                    sx={{ width: { lg: "47%" } }}
                    onClick={() => handleSpecializationClick(specialization)}
                  >
                    {en === "en"
                      ? specialization.specializationEn
                      : specialization.specializationUa}
                  </Button>
                ))}
            </Stack>
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "220px", margin: "0 auto" }}
        >
          {intl.formatMessage({ id: "bookLesson" })}
        </Button>
      </form>
    </Box>
  );
}
