import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
} from "@mui/material";
import { format } from "date-fns";
import { PersonalImage } from "./PersonalImage";
import countries from "../../defaults/countries/countries.json";
import countriesCase from "@/helpers/countriesCase";
import { userValidationSchema } from "../../defaults/validationScheme";

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
    description: currentUser?.advert?.description || "",
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
        birthday: currentUser?.birthday
          ? format(new Date(currentUser.birthday), "dd.MM.yyyy")
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
      console.log(formik);
      await dispatch(editUser(formik.values));
      setEditMode(false);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error editing user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <form onSubmit={handleUserProfileSubmit}>
      <Stack sx={{ display: "flex", flexDirection: "column" }}>
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
              gap: "24px",
              justifyContent: { xs: "center" },
              alignItems: { xs: "center", lg: "flex-start" },
            }}
          >
            <PersonalImage advertImagePath={currentUser.advert?.imagePath} />
            {editMode ? (
              <TextField
                type="file"
                id="image"
                name="image"
                variant="outlined"
                accept="image/*"
                placeholder=""
                onChange={(event) => {
                  formik.setFieldValue("image", event.target.files[0]);
                  setImage(URL.createObjectURL(event.target.files[0]));
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
              />
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
            />
            <TextField
              label={intl.formatMessage({ id: "lastName" })}
              name="lastName"
              defaultValue={currentUser?.lastName || ""}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
              disabled={!editMode}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              name="email"
              defaultValue={currentUser?.email}
              sx={{ width: { xs: "100%", lg: "48%" } }}
              variant="outlined"
              disabled={!editMode}
              onChange={handleInputChange}
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
              variant="outlined"
              onChange={handleInputChange}
            />
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
                value={currentUser.sex || ""}
                onChange={(e) => console.log(e.target.value)}
              >
                <MenuItem value="male">
                  {intl.formatMessage({ id: "male" })}
                </MenuItem>
                <MenuItem value="female">
                  {" "}
                  {intl.formatMessage({ id: "female" })}
                </MenuItem>
                <MenuItem value="other">
                  {" "}
                  {intl.formatMessage({ id: "other" })}
                </MenuItem>
              </Select>
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
                  ? format(
                      new Date(currentUser.registeredAt),
                      "dd.MM.yyyy HH:mm"
                    )
                  : ""
              }
              variant="outlined"
              sx={{ width: "100%" }}
              disabled={!editMode}
            />
          </Stack>
        </Box>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
            gap: "40px",
          }}
        >
          <TextField
            defaultValue={currentUser?.advert?.description}
            name="description"
            label={intl.formatMessage({ id: "description" })}
            id="description"
            placeholder={intl.formatMessage({ id: "description" })}
            sx={{ width: { xs: "100%" } }}
            multiline
            disabled={!editMode}
          />
          {editMode ? (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSaveButtonClick}
              sx={{
                display: "flex",
                justifyItems: "end",
                alignSelf: "end",
                width: { xs: "100%", md: "220px" },
              }}
            >
              {intl.formatMessage({ id: "saveBtn" })}
            </Button>
          ) : (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => setEditMode(!editMode)}
              sx={{
                display: "flex",
                justifyItems: "end",
                alignSelf: "end",
                width: { xs: "100%", md: "220px" },
              }}
            >
              {intl.formatMessage({ id: "editBtn" })}
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
};
