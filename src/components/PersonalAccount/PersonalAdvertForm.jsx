import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useIntl } from "react-intl";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  Input,
  Avatar,
} from "@mui/material";
import { PersonalImage } from "./PersonalImage";
import IconPlus from "../../assets/icons/IconPlus";
import countriesCase from "@/helpers/countriesCase";
import {
  editAdvert,
  editAdvertImage,
} from "@/redux/marketplace/adverts/operations";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import countries from "../../defaults/countries/countries.json";
import { format } from "date-fns";
import { teacherValidationSchema } from "@/defaults";

export const PersonalAdvertForm = ({
  currentUser,
  languages,
  specializations,
  advertId,
  teacher,
}) => {
  const intl = useIntl();
  const en = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleTeacherProfileSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const formik = useFormik({
    initialValues: {
      image: currentUser?.advert?.imagePath || "",
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      birthday: currentUser?.birthday
        ? format(new Date(currentUser.birthday), "yyyy-MM-dd")
        : "",
      sex: currentUser?.sex || "",
      country: countriesCase(
        en === "en"
          ? countries.find((el) => el.alpha2 === currentUser?.country?.alpha2)
              ?.nameEng || ""
          : countries.find((el) => el.alpha2 === currentUser?.country?.alpha2)
              ?.nameShort || ""
      ),
      registeredAt: currentUser?.registeredAt
        ? format(new Date(currentUser.registeredAt), "dd.MM.yyyy HH:mm")
        : "",
      description: currentUser?.advert?.description || "",
      price: currentUser?.advert?.price || "",
      specializations: teacher?.specializations || [],
      spokenLanguages: teacher?.spokenLanguages || [],
      teachingLanguages: teacher?.teachingLanguages || [],
    },
    teacherValidationSchema,
    onSubmit: handleTeacherProfileSubmit,
  });

  const handleSaveButtonClick = async () => {
    try {
      await formik.validateForm();

      if (Object.keys(formik.errors).length > 0) {
        console.error("Validation errors:", formik.errors);
        return;
      }

      if (formik.values.image !== currentUser?.advert?.imagePath) {
        await dispatch(
          editAdvertImage({ advertId, imageFile: formik.values.image })
        );
      }
      const formData = new FormData();
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append(
        "spokenLanguages",
        JSON.stringify(formik.values.spokenLanguages.map((lang) => lang.id))
      );
      formData.append(
        "teachingLanguages",
        JSON.stringify(formik.values.teachingLanguages.map((lang) => lang.id))
      );
      formData.append(
        "specializations",
        JSON.stringify(formik.values.specializations.map((spec) => spec.id))
      );
      console.log("Form Data before dispatch:", formData);
      await dispatch(editAdvert({ advertId, formData }));

      setEditMode(false);
    } catch (error) {
      console.error("Error editing advert:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "72%", xl: "80%" },
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          gap: "24px",
          alignItems: { xs: "center", md: "flex-start" },
          paddingLeft: { sm: "18px", md: "60px", lg: "14px", xl: "36px" },
          paddingRight: { sm: "18px", md: "60px", lg: "0" },
          paddingY: { xs: "66px", md: "40px" },
        }}
      >
        <Box
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "16px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <PersonalImage
            userImage={formik.values.image}
            width={"263px"}
            height={"205px"}
            borderRadius={"0"}
          />
        </Box>
        <Box>
          {editMode ? (
            <Stack
              direction="column"
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                alignItems: { xs: "center", md: "flex-start" },
                gap: "24px",
              }}
            >
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    formik.setFieldValue("image", event.target.files[0]);
                    setAvatar(URL.createObjectURL(event.target.files[0]));
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                />
                <InputLabel
                  htmlFor="image"
                  style={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "6px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "12px",
                    width: "263px",
                  }}
                >
                  <IconPlus />
                  {intl.formatMessage({ id: "newPhoto" })}
                </InputLabel>
                {avatar && (
                  <Avatar
                    src={avatar}
                    alt="Preview"
                    style={{
                      display: "flex",
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "50px",
                      justifySelf: "center",
                      alignSelf: "center",
                      maxWidth: "263px",
                    }}
                  />
                )}
              </Box>
              <Typography
                variant="posterItem"
                sx={{ color: (theme) => theme.palette.textColor.remarks }}
              >
                {intl.formatMessage({ id: "imgAdvise" })}
              </Typography>
              <Typography
                variant="posterItem"
                sx={{ color: (theme) => theme.palette.textColor.remarks }}
              >
                {intl.formatMessage({ id: "saveAdvise" })}
              </Typography>
            </Stack>
          ) : null}
        </Box>
        <FormControl fullWidth variant="outlined">
          <InputLabel>
            {intl.formatMessage({ id: "languagesSpoken" })}
          </InputLabel>
          <Select
            id="spokenLanguages"
            name="spokenLanguages"
            disabled={!editMode}
            multiple
            label={intl.formatMessage({ id: "languagesSpoken" })}
            value={formik.values.spokenLanguages}
            onChange={(event) => {
              const selectedLanguage =
                event.target.value[event.target.value.length - 1];
              if (
                !formik.values.spokenLanguages.some(
                  (lang) => lang.id === selectedLanguage.id
                )
              ) {
                formik.setFieldValue("spokenLanguages", [
                  ...formik.values.spokenLanguages,
                  selectedLanguage,
                ]);
              }
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.spokenLanguages &&
              Boolean(formik.errors.spokenLanguages)
            }
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
                <MenuItem
                  key={language.id}
                  value={language}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {en === "en" ? language.languageEn : language.languageUa}
                  {formik.values.spokenLanguages.some(
                    (selectedLanguage) => selectedLanguage.id === language.id
                  ) && (
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        const updatedLanguages =
                          formik.values.spokenLanguages.filter(
                            (selectedLanguage) =>
                              selectedLanguage.id !== language.id
                          );
                        formik.setFieldValue(
                          "spokenLanguages",
                          updatedLanguages
                        );
                      }}
                      sx={{
                        marginLeft: "10px",
                        color: (theme) => theme.palette.textColor.red,
                      }}
                    >
                      {intl.formatMessage({ id: "remove" })}
                    </Button>
                  )}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel>
            {intl.formatMessage({ id: "languagesTeaching" })}
          </InputLabel>
          <Select
            id="teachingLanguages"
            name="teachingLanguages"
            multiple
            multiline
            label={intl.formatMessage({ id: "languagesTeaching" })}
            disabled={!editMode}
            value={formik.values.teachingLanguages}
            onChange={(event) => {
              const selectedLanguage =
                event.target.value[event.target.value.length - 1];
              if (
                !formik.values.teachingLanguages.some(
                  (lang) => lang.id === selectedLanguage.id
                )
              ) {
                formik.setFieldValue("teachingLanguages", [
                  ...formik.values.teachingLanguages,
                  selectedLanguage,
                ]);
              }
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.teachingLanguages &&
              Boolean(formik.errors.teachingLanguages)
            }
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
                <MenuItem
                  key={language.id}
                  value={language}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>
                    {en === "en" ? language.languageEn : language.languageUa}
                  </Typography>
                  {formik.values.teachingLanguages.some(
                    (selectedLanguage) => selectedLanguage.id === language.id
                  ) && (
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        const updatedLanguages =
                          formik.values.teachingLanguages.filter(
                            (selectedLanguage) =>
                              selectedLanguage.id !== language.id
                          );
                        formik.setFieldValue(
                          "teachingLanguages",
                          updatedLanguages
                        );
                      }}
                      sx={{
                        marginLeft: "10px",
                        color: (theme) => theme.palette.textColor.red,
                      }}
                    >
                      {intl.formatMessage({ id: "remove" })}
                    </Button>
                  )}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          variant="outlined"
          error={
            formik.touched.specializations &&
            Boolean(formik.errors.specializations)
          }
        >
          <InputLabel>
            {intl.formatMessage({ id: "specialization" })}
          </InputLabel>
          <Select
            id="specializations"
            name="specializations"
            multiple
            label={intl.formatMessage({ id: "specialization" })}
            disabled={!editMode}
            value={formik.values.specializations}
            onChange={(event) => {
              const selected =
                event.target.value[event.target.value.length - 1];
              if (
                !formik.values.specializations.some(
                  (spec) => spec.id === selected.id
                )
              ) {
                console.log(selected);
                formik.setFieldValue("specializations", [
                  ...formik.values.specializations,
                  selected,
                ]);
              }
            }}
            onBlur={formik.handleBlur}
            renderValue={(selected) =>
              selected
                .map((specialization) =>
                  en === "en"
                    ? specialization.specializationEn
                    : specialization.specializationUa
                )
                .join(", ")
            }
          >
            {specializations.map((specialization) => (
              <MenuItem
                key={specialization.id}
                value={specialization}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {en === "en"
                    ? specialization.specializationEn
                    : specialization.specializationUa}
                </Typography>
                {formik.values.specializations.some(
                  (selectedSpecialization) =>
                    selectedSpecialization.id === specialization.id
                ) && (
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      const updatedSpecializations =
                        formik.values.specializations.filter(
                          (selectedSpecialization) =>
                            selectedSpecialization.id !== specialization.id
                        );
                      formik.setFieldValue(
                        "specializations",
                        updatedSpecializations
                      );
                    }}
                    sx={{
                      marginLeft: "10px",
                      color: (theme) => theme.palette.textColor.red,
                    }}
                  >
                    {intl.formatMessage({ id: "remove" })}
                  </Button>
                )}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.specializations && formik.errors.specializations && (
            <Typography variant="body2" color="error">
              {formik.errors.specializations}
            </Typography>
          )}
        </FormControl>
        <TextField
          fullWidth
          id="description"
          name="description"
          label={intl.formatMessage({ id: "description" })}
          variant="outlined"
          disabled={!editMode}
          multiline
          defaultValue={formik.values.description}
          InputLabelProps={{ shrink: true }}
          InputProps={{ placeholder: "" }}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        {editMode ? (
          <Button
            type="button"
            variant="contained"
            onClick={handleSaveButtonClick}
            sx={{
              display: "flex",
              justifyItems: "end",
              alignSelf: "end",
              width: { xs: "100%", md: "220px" },
              borderRadius: "6px",
              transition: "background-color 0.3s",
              backgroundColor: (theme) => theme.palette.buttonColor.greenYellow,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.buttonColor.greenYellowHover,
              },
            }}
          >
            <Typography
              variant="posterButton"
              sx={{ color: (theme) => theme.palette.buttonColor.fontColor }}
            >
              {intl.formatMessage({ id: "saveBtn" })}
            </Typography>
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            onClick={() => setEditMode(!editMode)}
            sx={{
              display: "flex",
              justifyItems: "end",
              alignSelf: "end",
              width: { xs: "100%", md: "220px" },
              borderRadius: "6px",
              transition: "background-color 0.3s",
              backgroundColor: (theme) => theme.palette.buttonColor.greenYellow,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.buttonColor.greenYellowHover,
              },
            }}
          >
            <Typography
              variant="posterButton"
              sx={{ color: (theme) => theme.palette.buttonColor.fontColor }}
            >
              {intl.formatMessage({ id: "editBtn" })}
            </Typography>
          </Button>
        )}
      </Box>
    </form>
  );
};
