import { useEffect, useState } from "react";
import { parse } from "date-fns";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, editUser } from "@/redux/users/operations";
import {
  selectCurrentUser,
  selectUserIsLoading,
} from "@/redux/users/selectors";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { useIntl } from "react-intl";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Typography,
  Input,
  Avatar,
} from "@mui/material";
import { format } from "date-fns";
import { getCountries } from "@/redux/admin/operations";
import { PersonalImage } from "./PersonalImage";
import Loader from "../Loader/Loader";
import { countriesSelector } from "@/redux/admin/adminSelector";
import countries from "../../defaults/countries/countries.json";
import { userValidationSchema } from "../../defaults/validationScheme";
import IconPlus from "../../assets/icons/IconPlus.jsx";

export const Profile = () => {
  const en = useSelector(selectCurrentLanguage);
  const intl = useIntl();
  const dispatch = useDispatch();
  const countriesList = useSelector(countriesSelector);
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectUserIsLoading);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getCountries());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    birthday: currentUser?.birthday
      ? format(new Date(currentUser.birthday), "yyyy-MM-dd")
      : "",
    sex: currentUser?.sex || "",
    country: currentUser?.country?.alpha2 || "",
    registeredAt: currentUser?.registeredAt
      ? format(new Date(currentUser.registeredAt), "dd.MM.yyyy")
      : "",
    aboutMe: currentUser?.aboutMe || "",
    photoPath: currentUser?.photoPath || "",
  });

  const handleUserProfileSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: userValidationSchema,
    onSubmit: handleUserProfileSubmit,
  });

  const handleSaveButtonClick = async () => {
    try {
      await formik.validateForm();
      if (Object.keys(formik.errors).length > 0) {
        console.error("Validation errors:", formik.errors);
        return;
      }

      const formData = new FormData();
      formData.append("firstName", formik.values.firstName);
      formData.append("lastName", formik.values.lastName);
      formData.append("email", formik.values.email);

      let formattedBirthday = "";
      if (formik.values.birthday) {
        let [year, month, day] = formik.values.birthday.split("-");
        if (!year || !month || !day) {
          [day, month, year] = formik.values.birthday.split(".");
        }
        const parsedBirthday = new Date(year, month - 1, day);
        formattedBirthday = format(parsedBirthday, "yyyy-MM-dd");
      }

      formData.append("birthday", formattedBirthday);
      formData.append("sex", formik.values.sex);

      const selectedCountry = countriesList.find(
        (country) => country.alpha2 === formik.values.country
      );

      const countryId = selectedCountry ? selectedCountry.id : null;

      formData.append("country", JSON.stringify(countryId));

      formData.append("aboutMe", formik.values.aboutMe);
      formData.append("photo", formik.values.photo);

      await dispatch(editUser(formData));

      setEditMode(false);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "birthday") {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        const formattedDate = format(dateValue, "yyyy-MM-dd");
        formik.setFieldValue(name, formattedDate);
      } else {
        console.error("Invalid date format");
      }
    } else {
      formik.setFieldValue(name, value);
    }
  };

  return (
    <form onSubmit={handleUserProfileSubmit}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          py: { xs: "32px", md: "40px" },
          pl: { xs: "16px", md: "60px", lg: "20px" },
          pr: { xs: "16px", md: "60px", lg: "150px", xl: "40px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: "24px",
            justifyContent: { xs: "center" },
            alignItems: { xs: "center", lg: "flex-start" },
          }}
        >
          <Box
            sx={{
              minWidth: "150px",
              display: "flex",
              flexDirection: { xs: "column" },
              gap: "16px",
              justifyContent: { xs: "center" },
              alignItems: { xs: "center", lg: "center" },
            }}
          >
            <PersonalImage userImage={formData.photoPath} />
            {editMode ? (
              <Stack
                direction="column"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "24px",
                }}
              >
                <Input
                  type="file"
                  id="photoPath"
                  name="photo"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    formik.setFieldValue("photo", event.target.files[0]);
                    setImage(URL.createObjectURL(event.target.files[0]));
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  // helperText={formik.touched.image && formik.errors.image}
                />
                <InputLabel
                  htmlFor="photoPath"
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
                  }}
                >
                  <IconPlus />
                  {intl.formatMessage({ id: "newPhoto" })}
                </InputLabel>
                {image && (
                  <Avatar
                    src={image}
                    alt="Preview"
                    style={{
                      display: "flex",
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "50px",
                    }}
                  />
                )}
              </Stack>
            ) : null}
          </Box>
          <Stack
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px 20px",
              flexWrap: "wrap",
            }}
          >
            <TextField
              label={intl.formatMessage({ id: "name" })}
              name="firstName"
              defaultValue={formData.firstName}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%", xl: "49%" } }}
              disabled={!editMode}
              onChange={handleInputChange}
              error={Boolean(formik.errors.firstName)}
              helperText={formik.errors.firstName}
            />
            <TextField
              label={intl.formatMessage({ id: "lastName" })}
              name="lastName"
              defaultValue={formData.lastName}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%", xl: "49%" } }}
              disabled={!editMode}
              onChange={handleInputChange}
              error={Boolean(formik.errors.lastName)}
              helperText={formik.errors.lastName}
            />
            <TextField
              label="Email"
              name="email"
              defaultValue={formData.email}
              sx={{ width: { xs: "100%", lg: "48%", xl: "49%" } }}
              variant="outlined"
              disabled={true}
              // disabled={!editMode}
              // onChange={handleInputChange}
              // error={Boolean(formik.errors.email)}
              // helperText={formik.errors.email}
            />
            <TextField
              type="date"
              label={intl.formatMessage({ id: "birthday" })}
              name="birthday"
              disabled={!editMode}
              defaultValue={formData.birthday}
              sx={{ width: { xs: "100%", lg: "48%", xl: "49%" } }}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: "" }}
              variant="outlined"
              onChange={handleInputChange}
              error={formik.touched.birthday && Boolean(formik.errors.birthday)}
              helperText={formik.touched.birthday && formik.errors.birthday}
            />
            <FormControl
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%", xl: "49%" } }}
            >
              <InputLabel htmlFor="sex">
                {intl.formatMessage({ id: "sex" })}
              </InputLabel>
              <Select
                label={intl.formatMessage({ id: "sex" })}
                disabled={!editMode}
                name="sex"
                defaultValue={formData.sex}
                onChange={(e) => formik.handleChange(e)}
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
              {formik.touched.sex && formik.errors.sex && (
                <Typography color="error">{formik.errors.sex}</Typography>
              )}
            </FormControl>
            <FormControl
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%", xl: "49%" } }}
            >
              <InputLabel htmlFor="country">
                {intl.formatMessage({ id: "country" })}
              </InputLabel>
              <Select
                label={intl.formatMessage({ id: "country" })}
                disabled={!editMode}
                name="country"
                defaultValue={formData.country}
                onChange={(e) => formik.handleChange(e)}
                error={formik.touched.country && Boolean(formik.errors.country)}
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
                            : fullCountry.nameLong}
                        </MenuItem>
                      );
                    } else {
                      return null;
                    }
                  })}
              </Select>

              {formik.touched.country && formik.errors.country && (
                <Box sx={{ color: "red" }}>{formik.errors.country}</Box>
              )}
            </FormControl>
            <TextField
              label={intl.formatMessage({ id: "registrationDate" })}
              name="registeredAt"
              defaultValue={formData.registeredAt}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "98%", xl: "100%" } }}
              disabled={true}
            />
          </Stack>
        </Box>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
            gap: "40px",
            borderTop: "1px solid #1F2937",
            marginTop: { xs: "24px", md: "20px", lg: "30px" },
          }}
        >
          <TextField
            defaultValue={formData.aboutMe}
            onChange={handleInputChange}
            name="aboutMe"
            label={intl.formatMessage({ id: "description" })}
            id="aboutMe"
            InputLabelProps={{ shrink: true }}
            InputProps={{ placeholder: "" }}
            placeholder={intl.formatMessage({ id: "description" })}
            sx={{ width: { xs: "100%" } }}
            multiline
            disabled={!editMode}
            error={Boolean(formik.errors.aboutMe)}
            helperText={formik.errors.aboutMe}
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
                backgroundColor: (theme) =>
                  theme.palette.buttonColor.greenYellow,
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
                backgroundColor: (theme) =>
                  theme.palette.buttonColor.greenYellow,
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
        </Stack>
      </Stack>
    </form>
  );
};
