import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

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

// const sexSelect = [
//   {
//     id: 1,
//     sex: "man",
//     sexEn: "Man",
//     sexUa: "Чоловіча",
//   },

//   {
//     id: 2,
//     sex: "female",
//     sexEn: "Female",
//     sexUa: "Жіноча",
//   },
//   {
//     id: 3,
//     sex: "other",
//     sexEn: "Other",
//     sexUa: "Інша",
//   },
// ];

const validationSchema = Yup.object({
  price: Yup.number().integer().min(0).required("Price is required"),
  description: Yup.string().required("Description is required"),
  spokenLanguages: Yup.array().min(1, "Select at least one spoken language"),
  teachingLanguages: Yup.array().min(1, "Select at least one teaching language"),
  specializations: Yup.array().required("Specialization is required"),
  image: Yup.mixed().required("Select image for your advert"),
  updateUser: Yup.object().required("All fields is required"),
});

export const PersonalAdvertForm = ({ currentUser, countriesList, languages, specializations }) => {
  const intl = useIntl();
  const [image, setImage] = useState(currentUser.advert.imagePath);

  initialValues.price = currentUser.advert.price;
  initialValues.description = currentUser.advert.description;
  // initialValues.specializations = currentUser.advert.specialization;
  // initialValues.spokenLanguages = currentUser.advert.spokenLanguages((el) => languages.find((lang) => lang.id === el));
  initialValues.updateUser.firstName = currentUser.firstName;
  initialValues.updateUser.lastName = currentUser.lastName;
  initialValues.updateUser.country = currentUser.country;
  initialValues.updateUser.birthday = currentUser.birthday;
  initialValues.updateUser.sex = currentUser.sex;

  console.log(initialValues);

  // initialValues.specializations = currentUser.advert.specializations.map((spec) => spec);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const transformedData = new FormData();
      const updateUser = {
        country: values.updateUser.country.id,
        birthday: values.updateUser.birthday,
        sex: values.updateUser.sex,
        firstName: values.updateUser.firstName,
        lastName: values.updateUser.lastName,
      };
      transformedData.append("description", values.description);
      transformedData.append("price", values.price);
      transformedData.append("spokenLanguages", JSON.stringify(values.spokenLanguages.map((el) => el.id)));
      transformedData.append("teachingLanguages", JSON.stringify(values.teachingLanguages.map((el) => el.id)));
      transformedData.append("specializations", JSON.stringify(values.specializations.map((el) => el.id)));
      transformedData.append("updateUser", JSON.stringify(updateUser));
      transformedData.append("image", values.image);
      // dispatch(postAdvert(transformedData));
      console.log(transformedData);
    },
  });

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
        {/* <p
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              color: "#4B5563",
            }}
          >
            Розмір фотографії повинен бути не менше 200x200 пікселів і не більше 5 МБ. Формат зображення JPG, PNG
          </p> */}

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
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
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
        <TextField
          label={intl.formatMessage({ id: "birthday" })}
          style={{
            width: "100%",
          }}
          id="userBirthday"
          name="updateUser.birthday"
          InputLabelProps={{ shrink: !!formik.values.updateUser.firstName }}
          value={format(new Date(formik.values.updateUser.birthday), "dd.MM.yyyy")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.birthday && Boolean(formik.errors.birthday)}
          helperText={formik.touched.birthday && formik.errors.birthday}
        />
        <FormControl variant="outlined" sx={{ width: "100%" }}>
          <InputLabel>{intl.formatMessage({ id: "country" })}</InputLabel>
          <Select
            // style={{
            //   width: "100%",
            // }}
            id="country"
            name="updateUser.country"
            label={intl.formatMessage({ id: "country" })}
            inputlabelprops={{ shrink: !!formik.values.updateUser.country }}
            value={formik.values.updateUser.country}
            onChange={(event) => {
              formik.setFieldValue("updateUser.country", event.target.value);
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
          <InputLabel> {intl.formatMessage({ id: "sex" })}</InputLabel>
          <Select
            id="sex"
            name="updateUser.sex"
            label={intl.formatMessage({ id: "sex" })}
            value={formik.values.updateUser.sex}
            onChange={(event) => {
              formik.setFieldValue("updateUser.sex", event.target.value);
              console.log(event.target.value);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.sex && Boolean(formik.errors.sex)}
          >
            <MenuItem value="male">{intl.formatMessage({ id: "male" })}</MenuItem>
            <MenuItem value="female"> {intl.formatMessage({ id: "female" })}</MenuItem>
            <MenuItem value="other"> {intl.formatMessage({ id: "other" })}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          style={{
            "&::placeholder": {
              color: "red",
            },
            width: "100%",
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
        <FormControl fullWidth variant="outlined">
          <InputLabel>{intl.formatMessage({ id: "languagesSpoken" })}</InputLabel>
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
            error={formik.touched.spokenLanguages && Boolean(formik.errors.spokenLanguages)}
            renderValue={(selected) => selected.map((language) => language.languageUa).join(", ")}
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
          <InputLabel>{intl.formatMessage({ id: "languagesTeaching" })}</InputLabel>
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
            error={formik.touched.teachingLanguages && Boolean(formik.errors.teachingLanguages)}
            renderValue={(selected) => selected.map((language) => language.languageUa).join(", ")}
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
          <InputLabel> {intl.formatMessage({ id: "specialization" })}</InputLabel>
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
            error={formik.touched.specializations && Boolean(formik.errors.specializations)}
            renderValue={(selected) => selected.map((specialization) => specialization.specializationUa).join(", ")}
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
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          InputLabelProps={{ shrink: !!formik.values.updateUser.firstName }}
          disabled
          label="Дата реєстрації"
          style={{
            width: "100%",
          }}
          value={format(new Date(currentUser.advert.createdAt), "dd.MM.yyyy HH:mm")}
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
