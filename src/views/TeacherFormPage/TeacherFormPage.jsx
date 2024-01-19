import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import mainBg from "@assets/images/bg.png";
import { postAdvert } from "@/redux/marketplace/adverts/operations";
import { selectToken, selectUser } from "@/redux/auth/selectors";
import { SignUp } from "@/views";
import { v4 as uuidv4 } from "uuid";
import { advertsSelector } from "@/redux/marketplace/adverts/advertsSelector";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCountries,
  getLanguages,
  getSpecializations,
} from "@/redux/admin/operations";
import {
  countriesSelector,
  languagesSelector,
  specializationsSelector,
} from "@/redux/admin/adminSelector";

const initialValues = {
  price: 0,
  description: "",
  spokenLanguages: [],
  teachingLanguages: [],
  specializations: [],
  image: null,
  updateUser: {
    country: "",
    birthday: "",
    firstName: "",
    lastName: "",
    sex: "",
  },
};

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
  updateUser: Yup.object().required("All fields is required"),
});

export const TeacherFormPage = () => {
  const intl = useIntl();
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  console.log(user);
  console.log(token);
  const navigate = useNavigate();

  const adverts = useSelector(advertsSelector)?.adverts;
  const advertId = adverts
    ? adverts.find((advert) => advert.user.id === user.id)
    : null;

  const languages = useSelector(languagesSelector);
  const specializations = useSelector(specializationsSelector);
  const countriesList = useSelector(countriesSelector);
  console.log(countriesList);
  useEffect(() => {
    if (advertId) {
      navigate(`/teachers/${advertId}`);
    }
    dispatch(getLanguages());
    dispatch(getSpecializations());
    dispatch(getCountries());
  }, [dispatch, advertId, navigate]);

  console.log("user", user);
  initialValues.updateUser.firstName = user.firstName;
  initialValues.updateUser.lastName = user.lastName ?? "";
  initialValues.updateUser.country = user.country ?? "";

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const transformedData = new FormData();
      const updateUser = {
        country: values.updateUser.country.id,
        birthday: "1995-04-23T18:02:22.126Z",
        sex: values.updateUser.sex,
        firstName: values.updateUser.firstName,
        lastName: values.updateUser.lastName,
      };
      transformedData.append("description", values.description);
      transformedData.append("price", values.price);
      transformedData.append(
        "spokenLanguages",
        JSON.stringify(values.spokenLanguages.map((el) => el.id))
      );
      transformedData.append(
        "teachingLanguages",
        JSON.stringify(values.teachingLanguages.map((el) => el.id))
      );
      transformedData.append(
        "specializations",
        JSON.stringify(values.specializations.map((el) => el.id))
      );
      transformedData.append("updateUser", JSON.stringify(updateUser));

      transformedData.append("image", values.image);

      dispatch(postAdvert(transformedData));
    },
  });

  return !token ? (
    <SignUp />
  ) : (
    <Box
      maxWidth="xl"
      sx={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingY: { sm: "47px", lg: "57px", xl: "47px" },
      }}
    >
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          p: { md: "40px", xs: "40px 20px" },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Typography
            style={{ textTransform: "uppercase", marginBottom: "40px" }}
          >
            {intl.formatMessage({ id: "teacherForm" })}
          </Typography>
          <Stack
            // fullWidth
            sx={{
              display: "flex",
              flexDirection: { md: "row" },
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <TextField
              fullWidth
              // focused
              id="firstName"
              name="updateUser.firstName"
              type="text"
              label={intl.formatMessage({ id: "name" })}
              hiddenLabel
              InputLabelProps={{ shrink: !!formik.values.updateUser.firstName }}
              variant="outlined"
              value={formik.values.updateUser.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              id="lastName"
              name="updateUser.lastName"
              type="text"
              label={intl.formatMessage({ id: "lastName" })}
              InputLabelProps={{ shrink: !!formik.values.updateUser.lastName }}
              variant="outlined"
              value={formik.values.updateUser.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: { md: "row" },
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <FormControl variant="outlined">
              <InputLabel>{intl.formatMessage({ id: "country" })}</InputLabel>
              <Select
                style={{
                  minWidth: "274px",
                }}
                id="country"
                name="updateUser.country"
                label="country"
                value={formik.values.country}
                onChange={(event) => {
                  formik.setFieldValue(
                    "updateUser.country",
                    event.target.value
                  );
                  console.log(event.target.value);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                renderValue={(selected) => selected.alpha2}
              >
                {countriesList &&
                  countriesList.map((country) => (
                    <MenuItem key={uuidv4()} value={country}>
                      {country.alpha2}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <TextField
              label={intl.formatMessage({ id: "birthday" })}
              style={{
                minWidth: "274px",
              }}
            />

            <TextField
              style={{
                "&::placeholder": {
                  color: "red",
                },
                minWidth: "274px",
              }}
              id="price"
              name="price"
              label={intl.formatMessage({ id: "pricePerHour" })}
              variant="outlined"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Stack>
          <Stack
            fullWidth
            sx={{
              display: "flex",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel>
                {intl.formatMessage({ id: "languagesSpoken" })}
              </InputLabel>
              <Select
                id="spokenLanguages"
                name="spokenLanguages"
                multiple
                label="languagesSpoken"
                value={formik.values.spokenLanguages}
                onChange={(event) => {
                  formik.setFieldValue("spokenLanguages", event.target.value);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.spokenLanguages &&
                  Boolean(formik.errors.spokenLanguages)
                }
                renderValue={(selected) =>
                  selected.map((language) => language.languageUa).join(", ")
                }
              >
                {languages &&
                  languages.map((language) => (
                    <MenuItem key={uuidv4()} value={language}>
                      {language.languageUa}
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
                label="languagesTeaching"
                value={formik.values.teachingLanguages}
                onChange={(event) => {
                  formik.setFieldValue("teachingLanguages", event.target.value);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.teachingLanguages &&
                  Boolean(formik.errors.teachingLanguages)
                }
                renderValue={(selected) =>
                  selected.map((language) => language.languageUa).join(", ")
                }
              >
                {languages &&
                  languages.map((language) => (
                    <MenuItem key={uuidv4()} value={language}>
                      {language.languageUa}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel>
                {" "}
                {intl.formatMessage({ id: "specialization" })}
              </InputLabel>
              <Select
                id="specializations"
                name="specializations"
                multiple
                label="Спеціалізація"
                value={formik.values.specializations}
                onChange={(event) => {
                  formik.setFieldValue("specializations", event.target.value);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.specializations &&
                  Boolean(formik.errors.specializations)
                }
                renderValue={(selected) =>
                  selected
                    .map((specialization) => specialization.specializationUa)
                    .join(", ")
                }
              >
                {specializations &&
                  specializations.map((specialization) => (
                    <MenuItem key={uuidv4()} value={specialization}>
                      {specialization.specializationUa}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack
            style={{
              display: "flex",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <TextField
              fullWidth
              id="description"
              name="description"
              label={intl.formatMessage({ id: "description" })}
              variant="outlined"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Stack>

          <FormControl
            style={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <FormLabel>{intl.formatMessage({ id: "sex" })}</FormLabel>
            <RadioGroup
              style={{
                flexDirection: "row",
              }}
            >
              <FormControlLabel
                value="male"
                control={
                  <Radio
                    style={{
                      border: "none",
                    }}
                    id="sexMale"
                    name="updateUser.sex"
                    type="radio"
                    value="male"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.sex && Boolean(formik.errors.sex)}
                    helperText={formik.touched.sex && formik.errors.sex}
                  />
                }
                label={intl.formatMessage({ id: "male" })}
              />
              <FormControlLabel
                value="female"
                control={
                  <Radio
                    id="sexFemale"
                    name="updateUser.sex"
                    type="radio"
                    value="female"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.sex && Boolean(formik.errors.sex)}
                    helperText={formik.touched.sex && formik.errors.sex}
                  />
                }
                label={intl.formatMessage({ id: "female" })}
              />
              <FormControlLabel
                value="other"
                control={
                  <Radio
                    id="sexOther"
                    name="updateUser.sex"
                    type="radio"
                    value="other"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.sex && Boolean(formik.errors.sexOther)
                    }
                    helperText={formik.touched.sex && formik.errors.sex}
                  />
                }
                label={intl.formatMessage({ id: "other" })}
              />
            </RadioGroup>
          </FormControl>

          <FormControl
            fullWidth
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                alignSelf: "flex-start",
                marginBottom: "20px",
              }}
            >
              {intl.formatMessage({ id: "uploadPhoto" })}
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: { xs: "162px", md: "445px" },
                border: "1px solid rgba(193, 193, 193, 1)",
                borderRadius: "8px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={image ? image : null}
                style={{
                  minHeidth: "100%",
                  width: "100%",
                  minWidth: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <label
                htmlFor="image"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  cursor: "pointer",
                  position: "absolute",
                }}
              >
                <TextField
                  style={{
                    display: "none",
                  }}
                  fullWidth
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
              </label>
              {!image && (
                <p
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    pointerEvents: "none",
                    cursor: "pointer",
                  }}
                >
                  {intl.formatMessage({ id: "addPhoto" })}
                </p>
              )}
            </Box>
          </FormControl>

          <Stack
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: "40px",
            }}
          >
            <Button variant="contained" type="submit">
              {intl.formatMessage({ id: "publishBtn" })}
            </Button>
            {/* <Button variant="outlined">Зберегти чернетку</Button> */}
          </Stack>
        </form>
      </Box>
    </Box>
  );
};
