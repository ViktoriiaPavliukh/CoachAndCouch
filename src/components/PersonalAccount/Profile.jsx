import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, editUser } from "@/redux/users/operations";
import { selectCurrentUser } from "@/redux/users/selectors";
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
} from "@mui/material";
import { format } from "date-fns";
import { PersonalImage } from "./PersonalImage";
import countries from "../../defaults/countries/countries.json";
import countriesCase from "@/helpers/countriesCase";
import { userValidationSchema } from "../../defaults/validationScheme";
import IconPlus from "../../assets/icons/IconPlus.jsx";

export const Profile = () => {
  const en = useSelector(selectCurrentLanguage);
  const currentUser = useSelector(selectCurrentUser);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    birthday: currentUser?.birthday
      ? format(new Date(currentUser.birthday), "dd.MM.yyyy")
      : "",
    sex: currentUser?.sex || "",
    country: currentUser?.country?.alpha2
      ? countriesCase(
          en === "en"
            ? countries.find((el) => el.alpha2 === currentUser?.country?.alpha2)
                ?.nameEng || ""
            : countries.find((el) => el.alpha2 === currentUser?.country?.alpha2)
                ?.nameShort || ""
        )
      : "",
    registeredAt: currentUser?.registeredAt
      ? format(new Date(currentUser.registeredAt), "dd.MM.yyyy HH:mm")
      : "",
    aboutMe: currentUser?.aboutMe || currentUser?.advert?.description,
    photoPath: currentUser?.photoPath || "",
  });

  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: currentUser?.firstName || "",
        lastName: currentUser?.lastName || "",
        email: currentUser?.email || "",
        birthday: currentUser?.birthday ? new Date(currentUser.birthday) : "",
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
        aboutMe: currentUser.aboutMe || currentUser?.advert?.description,
      }));
    }
  }, [currentUser, en]);

  const handleUserProfileSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: userValidationSchema,
    onSubmit: handleUserProfileSubmit, // Assuming you still want to handle submit separately
  });

  const handleSaveButtonClick = async () => {
    try {
      await formik.validateForm();
      if (Object.keys(formik.errors).length > 0) {
        console.error("Validation errors:", formik.errors);
        return;
      }

      const mappedData = {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        // birthday: formik.values.birthday,
        sex: formik.values.sex,
        aboutMe: formik.values.aboutMe,
        photoPath: formik.values.photoPath,
      };
      console.log(JSON.stringify(mappedData, null, 2));
      console.log(mappedData);

      // Dispatch the editUser action with the mapped data
      await dispatch(editUser(mappedData));

      setEditMode(false);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error editing user:", error);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   formik.setFieldValue(name, value);

  //   // if (name === "photoPath") {
  //   //   setFormData((prevFormData) => ({
  //   //     ...prevFormData,
  //   //     photoPath: value,
  //   //   }));
  //   // } else {
  //   //   formik.setFieldValue(name, value);
  //   // }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "birthday") {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        formik.setFieldValue(name, dateValue);
      } else {
        console.error("Invalid date format");
      }
    } else {
      formik.setFieldValue(name, value);
    }
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <form onSubmit={handleUserProfileSubmit}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: { xs: "32px", md: "40px" },
          pl: { xs: "16px", md: "60px", lg: "12px" },
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
            <PersonalImage userImage={currentUser.photoPath} />
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
                <input
                  type="file"
                  id="photoPath"
                  name="photoPath"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    formik.setFieldValue("photoPath", event.target.files[0]);
                    setImage(URL.createObjectURL(event.target.files[0]));
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                />
                <label
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
                </label>
                {image && (
                  <img
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
              defaultValue={currentUser?.firstName}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
              disabled={!editMode}
              onChange={handleInputChange}
              error={Boolean(formik.errors.firstName)}
              helperText={formik.errors.firstName}
            />
            <TextField
              label={intl.formatMessage({ id: "lastName" })}
              name="lastName"
              defaultValue={currentUser?.lastName || ""}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
              disabled={!editMode}
              onChange={handleInputChange}
              error={Boolean(formik.errors.lastName)}
              helperText={formik.errors.lastName}
            />
            <TextField
              label="Email"
              name="email"
              defaultValue={currentUser?.email}
              sx={{ width: { xs: "100%", lg: "48%" } }}
              variant="outlined"
              disabled={!editMode}
              onChange={handleInputChange}
              error={Boolean(formik.errors.email)}
              helperText={formik.errors.email}
            />
            <TextField
              label={intl.formatMessage({ id: "birthday" })}
              name="birthday"
              disabled={!editMode}
              defaultValue={
                currentUser.birthday
                  ? format(new Date(currentUser.birthday), "dd.MM.yyyy")
                  : ""
              }
              sx={{ width: { xs: "100%", lg: "48%" } }}
              InputLabelProps={{ shrink: true }}
              InputProps={{ placeholder: "" }}
              variant="outlined"
              onChange={handleInputChange}
              error={formik.touched.birthday && Boolean(formik.errors.birthday)}
              helperText={formik.touched.birthday && formik.errors.birthday}
            />
            {/* <FormControl
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
            >
              <InputLabel htmlFor="sex-label">
                {intl.formatMessage({ id: "sex" })}
              </InputLabel>
              <Select
                label={intl.formatMessage({ id: "sex" })}
                disabled={!editMode}
                name="sex"
                value={formik.values.sex || ""}
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
                <div style={{ color: "red" }}>{formik.errors.sex}</div>
              )}
            </FormControl> */}
            <FormControl
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
            >
              <InputLabel htmlFor="sex-label">
                {intl.formatMessage({ id: "sex" })}
              </InputLabel>
              <Select
                label={intl.formatMessage({ id: "sex" })}
                disabled={!editMode}
                name="sex"
                value={formik.values.sex || ""}
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
                <Box sx={{ color: "red" }}>{formik.errors.sex}</Box>
              )}
            </FormControl>
            <TextField
              id="country"
              name="updateUser.country"
              label={intl.formatMessage({ id: "country" })}
              disabled={!editMode}
              defaultValue={
                currentUser?.country?.alpha2
                  ? countriesCase(
                      en === "en"
                        ? countries.find(
                            (el) => el.alpha2 === currentUser?.country?.alpha2
                          )?.nameEng || ""
                        : countries.find(
                            (el) => el.alpha2 === currentUser?.country?.alpha2
                          )?.nameShort || ""
                    )
                  : ""
              }
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
            />
            <TextField
              label={intl.formatMessage({ id: "registrationDate" })}
              name="registeredAt"
              defaultValue={
                currentUser.registeredAt
                  ? format(new Date(currentUser.registeredAt), "dd.MM.yyyy")
                  : ""
              }
              variant="outlined"
              sx={{ width: "100%" }}
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
            defaultValue={currentUser?.aboutMe}
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
                backgroundColor: (theme) => theme.palette.buttonColor.main,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.buttonColor.hover,
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
                backgroundColor: (theme) => theme.palette.buttonColor.main,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.buttonColor.hover,
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
