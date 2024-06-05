import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
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
  advertByIdSelector,
  selectAdvertsIsLoading,
} from "@/redux/marketplace/adverts/advertsSelector";
import { selectCurrentUser } from "@/redux/users/selectors";
import { getAdvertById } from "@/redux/marketplace/adverts/operations";
import {
  editAdvert,
  editAdvertImage,
} from "@/redux/marketplace/adverts/operations";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import countries from "../../defaults/countries/countries.json";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const validationSchema = Yup.object({
  price: Yup.number().integer().min(0).required("Price is required"),
  description: Yup.string().required("Description is required"),
  spokenLanguages: Yup.array().min(1, "Select at least one spoken language"),
  teachingLanguages: Yup.array().min(
    1,
    "Select at least one teaching language"
  ),
  specializations: Yup.array().required("Specialization is required"),
  image: Yup.mixed().required("Select image for your advert"),
});

export const PersonalAdvertForm = ({
  currentUser,
  countriesList,
  languages,
  specializations,
  advertId,
  teacher,
  dataChanged,
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
      country: currentUser?.country?.alpha2
        ? countriesCase(
            en === "en"
              ? countries.find(
                  (el) => el.alpha2 === currentUser?.country?.alpha2
                )?.nameEng || ""
              : countries.find(
                  (el) => el.alpha2 === currentUser?.country?.alpha2
                )?.nameShort || ""
          )
        : "",
      registeredAt: currentUser?.registeredAt
        ? format(new Date(currentUser.registeredAt), "dd.MM.yyyy HH:mm")
        : "",
      description: currentUser?.advert?.description || "",
      price: currentUser?.advert?.price || "",
      specializations: teacher?.specializations || [],
      spokenLanguages: teacher?.spokenLanguages || [],
      teachingLanguages: teacher?.teachingLanguages || [],
    },
    validationSchema,
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
                  // helperText={formik.touched.image && formik.errors.image}
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
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          type="text"
          label={intl.formatMessage({ id: "name" })}
          disabled={true}
          defaultValue={formik.values.firstName}
          variant="outlined"
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          type="text"
          label={intl.formatMessage({ id: "lastName" })}
          defaultValue={formik.values.lastName || ""}
          variant="outlined"
          disabled={true}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          label="Email"
          name="email"
          defaultValue={formik.values.email}
          sx={{ width: { xs: "100%" } }}
          variant="outlined"
          disabled={true}
          onChange={handleInputChange}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />
        <Stack
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "24px 24px",
            justifyContent: "space-between",
          }}
        >
          <TextField
            type="date"
            label={intl.formatMessage({ id: "birthday" })}
            sx={{
              flex: "1 1 auto",
              width: { xs: "100%", lg: "auto" },
            }}
            id="userBirthday"
            name="birthday"
            disabled={true}
            defaultValue={formik.values.birthday}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
            helperText={formik.touched.birthday && formik.errors.birthday}
            InputLabelProps={{ shrink: true }}
          />

          <FormControl
            variant="outlined"
            sx={{
              flex: "1 1 auto",
            }}
          >
            <InputLabel> {intl.formatMessage({ id: "sex" })}</InputLabel>
            <Select
              id="sex"
              name="sex"
              label={intl.formatMessage({ id: "sex" })}
              disabled={true}
              defaultValue={formik.values.sex}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              error={formik.touched.sex && Boolean(formik.errors.sex)}
            >
              <MenuItem value="male">
                {intl.formatMessage({ id: "male" })}
              </MenuItem>
              <MenuItem value="female">
                {intl.formatMessage({ id: "female" })}
              </MenuItem>
              <MenuItem value="other">
                {intl.formatMessage({ id: "other" })}
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{
              "&::placeholder": {
                color: "red",
              },
              flex: "1 1 auto",
            }}
            id="price"
            disabled={!editMode}
            name="price"
            label={intl.formatMessage({ id: "pricePerHour" })}
            variant="outlined"
            type="number"
            defaultValue={formik.values.price}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            InputLabelProps={{ shrink: true }}
            InputProps={{ placeholder: "" }}
          />
        </Stack>
        <TextField
          fullWidth
          id="country"
          name="country"
          label={intl.formatMessage({ id: "country" })}
          variant="outlined"
          disabled={true}
          defaultValue={formik.values.country}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
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
                  <div>
                    {en === "en" ? language.languageEn : language.languageUa}
                  </div>
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
            disabled={!editMode}
            multiple
            label={intl.formatMessage({ id: "specialization" })}
            value={formik.values.specializations}
            // onChange={(event) => {
            //   formik.setFieldValue("specializations", event.target.value);
            // }}
            onChange={(event) => {
              const selectedLanguage =
                event.target.value[event.target.value.length - 1];
              if (
                !formik.values.specializations.some(
                  (lang) => lang.id === selectedLanguage.id
                )
              ) {
                formik.setFieldValue("specializations", [
                  ...formik.values.specializations,
                  selectedLanguage,
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
                <div>
                  {en === "en"
                    ? specialization.specializationEn
                    : specialization.specializationUa}
                </div>
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

        {/* 
        <FormControl fullWidth variant="outlined">
          <InputLabel>
            {intl.formatMessage({ id: "specialization" })}
          </InputLabel>
          <Select
            id="specializations"
            name="specializations"
            disabled={!editMode}
            multiple
            label={intl.formatMessage({ id: "specialization" })}
            value={formik.values.specializations || []}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.specializations &&
              Boolean(formik.errors.specializations)
            }
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
            {specializations &&
              specializations.map((specialization) => (
                <MenuItem key={specialization.id} value={specialization}>
                  {en === "en"
                    ? specialization.specializationEn
                    : specialization.specializationUa}
                </MenuItem>
              ))}
          </Select>
        </FormControl> */}
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
        <TextField
          label={intl.formatMessage({ id: "registrationDate" })}
          variant="outlined"
          name="registeredAt"
          style={{
            width: "100%",
          }}
          disabled={true}
          defaultValue={formik.values.registeredAt}
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
