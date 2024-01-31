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
} from "@mui/material";
import { PersonalImage } from "./PersonalImage";
import countriesCase from "@/helpers/countriesCase";
import {
  advertByIdSelector,
  selectAdvertsIsLoading,
} from "@/redux/marketplace/adverts/advertsSelector";
import { selectCurrentUser } from "@/redux/users/selectors";
import { getAdvertById } from "@/redux/marketplace/adverts/operations";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import countries from "../../defaults/countries/countries.json";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

// const initialValues = {
//   price: 0,
//   description: "",
//   spokenLanguages: [],
//   teachingLanguages: [],
//   specializations: [],
//   image: null,
//   updateUser: {
//     country: "",
//     birthday: "",
//     firstName: "",
//     lastName: "",
//     sex: "",
//   },
// };

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

export const PersonalAdvertForm = ({
  currentUser,
  countriesList,
  languages,
  specializations,
  advertId,
}) => {
  // console.log(currentUser);
  console.log(advertId, "id");
  const intl = useIntl();
  const en = useSelector(selectCurrentLanguage);
  const [image, setImage] = useState(currentUser.advert.imagePath);

  const [editMode, setEditMode] = useState(false);
  // const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    // image: currentUser?.advert?.imagePath || "",
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
    price: currentUser?.advert?.price || "",
    specializations: currentUser?.advert?.specializations || [],
    spokenLanguages: currentUser?.advert?.spokenLanguages || [],
    teachingLanguages: currentUser?.advert?.teachingLanguages || [],
  });
   const dispatch = useDispatch();

  //  useEffect(() => {
  //    dispatch(getAdvertById(advertId));
  //  }, [dispatch, advertId]);

    // const teacher = useSelector(advertByIdSelector);
    // console.log(teacher);

  const handleTeacherProfileSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const formik = useFormik({
    // initialValues,
    initialValues: formData,
    validationSchema,
    onSubmit: handleTeacherProfileSubmit,
    // onSubmit: async (values) => {
    //   const transformedData = new FormData();
    //   const updateUser = {
    //     country: values.updateUser.country.id,
    //     birthday: values.updateUser.birthday,
    //     sex: values.updateUser.sex,
    //     firstName: values.updateUser.firstName,
    //     lastName: values.updateUser.lastName,
    //   };
    //   transformedData.append("description", values.description);
    //   transformedData.append("price", values.price);
    //   transformedData.append(
    //     "spokenLanguages",
    //     JSON.stringify(values.spokenLanguages.map((el) => el.id))
    //   );
    //   transformedData.append(
    //     "teachingLanguages",
    //     JSON.stringify(values.teachingLanguages.map((el) => el.id))
    //   );
    //   transformedData.append(
    //     "specializations",
    //     JSON.stringify(values.specializations.map((el) => el.id))
    //   );
    //   transformedData.append("updateUser", JSON.stringify(updateUser));
    //   transformedData.append("image", values.image);
    //   // dispatch(postAdvert(transformedData));
    //   console.log(transformedData);
    // },
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
    <form
      onSubmit={formik.handleSubmit}
      style={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          gap: "24px",
          alignItems: { xs: "center", md: "flex-start" },
          marginBottom: "52px",
        }}
      >
        <Box
          style={{
            // width: "263px",
            // height: "205px",
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
          {image && (
            <img
              src={image ? image : currentUser.advert.imagePath}
              alt="user's advert"
              style={{
                minHeidth: "100%",
                objectFit: "cover",
                display: "flex",
                width: "263px",
                height: "205px",
                alignSelf: "stretch",
              }}
            />
          )}

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
          {Boolean(!image) && (
            <>
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
                + Додати фото
              </p>
            </>
          )}
        </Box>
        <Typography
          sx={{
            fontSize: "12px",
            lineHeight: "16px",
            color: "#4B5563",
          }}
        >
          {intl.formatMessage({ id: "imgAdvise" })}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            lineHeight: "16px",
            color: "#4B5563",
          }}
        >
          {intl.formatMessage({ id: "saveAdvise" })}
        </Typography>
        <TextField
          fullWidth
          // focused
          id="firstName"
          name="firstName"
          type="text"
          label={intl.formatMessage({ id: "name" })}
          // hiddenLabel
          disabled={!editMode}
          defaultValue={currentUser?.firstName}
          // InputLabelProps={{ shrink: !!formik.values.firstName }}
          variant="outlined"
          // value={formik.values.firstName}
          onChange={formik.handleChange}
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
          defaultValue={currentUser?.lastName || ""}
          // InputLabelProps={{ shrink: !!formik.values.updateUser.lastName }}
          variant="outlined"
          disabled={!editMode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          label="Email"
          name="email"
          defaultValue={currentUser?.email}
          sx={{ width: { xs: "100%" } }}
          variant="outlined"
          disabled={!editMode}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />
        <Stack
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <TextField
            type="date"
            sx={{
              width: { xs: "100%", lg: "32%", xl: "33%" },
            }}
            // id="userBirthday"
            name="birthday"
            disabled={!editMode}
            // InputLabelProps={{ shrink: !!formik.values.updateUser.firstName }}
            defaultValue={
              currentUser.birthday
                ? format(new Date(currentUser.birthday), "yyyy-MM-dd")
                : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
            helperText={formik.touched.birthday && formik.errors.birthday}
          />

          <FormControl
            variant="outlined"
            sx={{
              width: { xs: "100%", md: "49%", lg: "32%", xl: "32%" },
            }}
          >
            <InputLabel> {intl.formatMessage({ id: "sex" })}</InputLabel>
            <Select
              id="sex"
              name="sex"
              disabled={!editMode}
              label={intl.formatMessage({ id: "sex" })}
              defaultValue={currentUser.sex}
              // value={formik.values.sex}
              onChange={(event) => {
                formik.setFieldValue("sex", event.target.value);
                // console.log(event.target.value);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.sex && Boolean(formik.errors.sex)}
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
            sx={{
              "&::placeholder": {
                color: "red",
              },
              width: { xs: "50%", md: "49%", lg: "33%", xl: "32%" },
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
        <FormControl variant="outlined" sx={{ width: "100%" }}>
          <InputLabel>{intl.formatMessage({ id: "country" })}</InputLabel>
          <Select
            // style={{
            //   width: "100%",
            // }}
            id="country"
            name="country"
            label={intl.formatMessage({ id: "country" })}
            value={currentUser?.country?.alpha2}
            onChange={(event) => {
              formik.setFieldValue("country", event.target.value);
              console.log(event.target.value);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.country && Boolean(formik.errors.country)}
            renderValue={(selected) => selected.alpha2}
          >
            {countriesList &&
              countriesList.map((country) => (
                <MenuItem key={country.alpha2} value={country}>
                  {country.alpha2}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
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
            disabled={!editMode}
            multiple
            label="languagesTeaching"
            defaultValue={
              currentUser.advert.teachingLanguages
                ? currentUser.advert.teachingLanguages.map((el) =>
                    en === "en" ? el.languageEn : el.languageUa
                  )
                : []
            }
            // defaultValue={console.log(currentUser.advert.teachingLanguages)}
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
        <TextField
          fullWidth
          id="description"
          name="description"
          label={intl.formatMessage({ id: "description" })}
          variant="outlined"
          disabled={!editMode}
          multiline
          rows={4}
          defaultValue={currentUser?.advert?.description}
          InputLabelProps={{ shrink: true }}
          InputProps={{ placeholder: "" }}
          onChange={formik.handleChange}
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
          defaultValue={
            currentUser.registeredAt
              ? format(new Date(currentUser.registeredAt), "dd.MM.yyyy")
              : ""
          }
          // value={format(new Date(currentUser.advert.createdAt), "dd.MM.yyyy")}
        />
        <Button variant="contained" type="submit">
          {intl.formatMessage({ id: "publishBtn" })}
        </Button>
      </Box>
    </form>
  );
};

PersonalAdvertForm.propTypes = {
  currentUser: PropTypes.object.isRequired,
  countriesList: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
  specializations: PropTypes.array.isRequired,
};
