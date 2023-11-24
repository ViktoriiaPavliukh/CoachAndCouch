import { useDispatch, useSelector } from "react-redux";
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

import { getCountries, postAdvert } from "@/redux/marketplace/adverts/operations";
import { selectToken, selectUser } from "@/redux/auth/selectors";
import { SignUp } from "@/views";
import { v4 as uuidv4 } from "uuid";
import { advertsSelector, countriesSelector } from "@/redux/marketplace/adverts/advertsSelector";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLanguages, getSpecializations } from "@/redux/admin/operations";
import { languagesSelector, specializationsSelector } from "@/redux/admin/adminSelector";

const initialValues = {
  price: 0,
  description: "",
  spokenLanguages: [],
  teachingLanguages: [],
  image: null,
  updateUser: {
    country: "",
    specializations: [],
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
  teachingLanguages: Yup.array().min(1, "Select at least one teaching language"),
  // specializations: Yup.array().required("Specialization is required"),
  // country: Yup.object().required("Country is required"),
  image: Yup.mixed().required("Select image for your advert"),
  updateUser: Yup.object().required("All fields is required"),
});

export const TeacherForm = () => {
  const [image, setImage] = useState("");
  // const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);
  const advertId = useSelector(advertsSelector).find((advert) => advert.user.id === user.id)?.id || null;
  const languages = useSelector(languagesSelector);

  const specializations = useSelector(specializationsSelector);
  const countriesList = useSelector(countriesSelector);
  console.log(countriesList);
  useEffect(() => {
    if (advertId) {
      navigate(`/teachers/${advertId}`);
      // console.log(advertId);
    }
    dispatch(getLanguages());
    dispatch(getSpecializations());
    dispatch(getCountries());
  }, [dispatch, advertId, navigate]);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const transformedData = new FormData();

      const updateUser = {
        country: values.updateUser.country.id,
        birthday: "11-20-2007",
        specializations: values.updateUser.specializations.map((el) => el.id),
        sex: values.updateUser.sex,
        firstName: values.updateUser.firstName,
        lastName: values.updateUser.lastName,
      };
      transformedData.append("description", values.description);
      transformedData.append("price", values.price);
      transformedData.append("spokenLanguages", JSON.stringify(values.spokenLanguages.map((el) => el.id)));
      transformedData.append("teachingLanguages", JSON.stringify(values.teachingLanguages.map((el) => el.id)));

      transformedData.append("updateUser", JSON.stringify(updateUser));

      transformedData.append("image", values.image);

      dispatch(postAdvert(transformedData));
    },
  });

  return !token ? (
    <SignUp />
  ) : (
    <Box
      sx={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "235px",
        paddingRight: "235px",
        paddingBottom: "235px",
        paddingTop: "235px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          p: "40px",
          borderRadius: "12px",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Typography style={{ textTransform: "uppercase", marginBottom: "40px" }}>Анкета викладача</Typography>
          <Stack
            fullWidth
            style={{
              flexDirection: "row",
              gap: "27px",
              marginBottom: "20px",
            }}
          >
            <TextField
              fullWidth
              id="firstName"
              name="updateUser.firstName"
              type="text"
              label="Ім'я"
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
              label="Прізвище"
              variant="outlined"
              value={formik.values.updateUser.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Stack>

          <Stack
            style={{
              flexDirection: "row",
              gap: "27px",
              marginBottom: "20px",
            }}
          >
            <FormControl variant="outlined">
              <InputLabel>Країна</InputLabel>
              <Select
                style={{
                  width: "274px",
                }}
                id="country"
                name="updateUser.country"
                label="Країна"
                value={formik.values.country}
                onChange={(event) => {
                  formik.setFieldValue("updateUser.country", event.target.value);
                  console.log(event.target.value);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                renderValue={(selected) => selected.countryUa}
              >
                {countriesList &&
                  countriesList.map((country) => (
                    <MenuItem key={uuidv4()} value={country}>
                      {country.countryUa}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="День народження"
              style={{
                width: "274px",
              }}
            />

            <TextField
              style={{
                "&::placeholder": {
                  color: "red",
                },
                width: "274px",
              }}
              id="price"
              name="price"
              label="Вартість за годину уроку"
              variant="outlined"
              type="number"
              placeholder="hello"
              defaultValue="Default value"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Stack>

          <Stack
            fullWidth
            style={{
              gap: "27px",
              marginBottom: "20px",
            }}
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel>Мови, якими розмовляєте</InputLabel>
              <Select
                id="spokenLanguages"
                name="spokenLanguages"
                multiple
                label="Spoken Languages"
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
              <InputLabel>Мови викладання</InputLabel>
              <Select
                id="teachingLanguages"
                name="teachingLanguages"
                multiple
                label="Мова викладання"
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
              <InputLabel>Спеціалізація</InputLabel>
              <Select
                id="specializations"
                name="updateUser.specializations"
                multiple
                label="Спеціалізація"
                value={formik.values.updateUser.specializations}
                onChange={(event) => {
                  formik.setFieldValue("updateUser.specializations", event.target.value);
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
          </Stack>
          <Stack
            style={{
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <Typography
              style={{
                marginBottom: "8px",
              }}
            >
              Опис
            </Typography>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Опис"
              variant="outlined"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Stack>

          <FormControl
            style={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <FormLabel>Стать</FormLabel>
            <RadioGroup
              style={{
                flexDirection: "row",
              }}
            >
              <FormControlLabel
                value="Male"
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
                label="Чоловіча"
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
                label="Жіноча"
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
              Завантажте свою фотографію
            </Typography>
            <Box
              style={{
                width: "670px",
                height: "560px",
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
                  + Додати фото
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
              Опублікувати
            </Button>
            {/* <Button variant="outlined">Зберегти чернетку</Button> */}
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

//   //       <Typography variant="posterTitle" sx={{ marginBottom: "40px" }}>
//   //         АНКЕТА ВИКЛАДАЧА
//   //       </Typography>
//   //       <form
//   //         onSubmit={handleSubmit}
//   //         sx={{
//   //           display: "flex",
//   //           maxWidth: "900px",
//   //           flexWrap: "wrap",
//   //           justifyContent: "space-between",
//   //           mt: "40px",
//   //           mb: "20px",
//   //           "& > :not(style)": { width: "49%" },
//   //         }}
//   //         noValidate
//   //         autoComplete="off"
//   //       >
//   //         <TextField
//   //           id="outlined-basic"
//   //           label="Ціна"
//   //           name="price"
//   //           variant="outlined"
//   //           value={formData.price}
//   //           onChange={handleInputChange}
//   //         />
//   //         <TextField
//   //           id="outlined-basic"
//   //           label="Опис"
//   //           variant="outlined"
//   //           name="shortDescription"
//   //           value={formData.shortDescription}
//   //           onChange={handleInputChange}
//   //         />
//   //         <TextField
//   //           id="outlined-select-languages"
//   //           select
//   //           label="Мови, якими розмовляєте"
//   //           multiple
//   //           value={formData.spokenLanguages.map((lang) => lang.language)}
//   //           onChange={(e) => handleLanguagesChange(e, "spokenLanguages")}
//   //         >
//   //           {languageOptions.map((option) => (
//   //             <MenuItem key={option.code} value={option.title}>
//   //               {option.title}
//   //             </MenuItem>
//   //           ))}
//   //         </TextField>

//           {/* <TextField
//             id="outlined-basic"
//             label="Ім'я"
//             variant="outlined"
//             onChange={handleInputChange}
//           />
//           <TextField
//             id="outlined-basic"
//             label="Прізвище"
//             variant="outlined"
//             onChange={handleInputChange}
//           /> */}
//           {/* <TextField
//             id="outlined-select-language"
//             select
//             label="Країна"
//             // defaultValue="Україна"
//             // helperText="Виберіть країну проживання"
//           >
//             {countryOptions.map((option) => (
//               <MenuItem key={option.code} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField id="outlined-select-age" select label="Дата народження">
//             {countryOptions.map((option) => (
//               <MenuItem key={option.code} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField id="outlined-select-sex" select label="Стать">
//             {countryOptions.map((option) => (
//               <MenuItem key={option.code} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             id="outlined-select-languages"
//             select
//             label="Мови, якими розмовляє"
//             multiple
//             value={formData.spokenLanguages.map((lang) => lang.language)}
//             onChange={(e) => handleLanguagesChange(e, "spokenLanguages")}
//           >
//             {languageOptions.map((option) => (
//               <MenuItem key={option.code} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             id="outlined-select-languages"
//             select
//             label="Мови, якими навчає"
//             multiple
//             value={formData.teachingLanguages.map((lang) => lang.language)}
//             onChange={(e) => handleLanguagesChange(e, "teachingLanguages")}
//           >
//             {languageOptions.map((option) => (
//               <MenuItem key={option.code} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             id="outlined-select-specialization"
//             select
//             label="Спеціалізація"
//           >
//             {specializationOptions.map((option) => (
//               <MenuItem key={option.code} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             id="outlined-select-hobbies"
//             select
//             label="Захоплення"
//             multiple
//             value={formData.hobbies.map((hobby) => hobby.hobby)}
//             onChange={(e) => handleLanguagesChange(e, "hobbies")}
//           >
//             {hobbyOptions.map((option) => (
//               <MenuItem key={option.code} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField id="outlined-select-time" select label="Час роботи">
//             {countryOptions.map((option) => (
//               <MenuItem key={option.code} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField id="outlined-select-platforms" select label="Платформи">
//             {countryOptions.map((option) => (
//               <MenuItem key={option.code} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             id="outlined-select-certificates"
//             select
//             label="Сертифікати"
//           >
//             {countryOptions.map((option) => (
//               <MenuItem key={option.code} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             id="outlined-basic"
//             label="Ціна"
//             name="price"
//             variant="outlined"
//             value={formData.price}
//             onChange={handleInputChange}
//           />
//           <TextField
//             id="outlined-basic"
//             label="Опис"
//             variant="outlined"
//             name="shortDescription"
//             value={formData.shortDescription}
//             onChange={handleInputChange}
//           />
//           <TextField
//             id="outlined-basic"
//             label="Фото"
//             variant="outlined"
//             name="imagePathes"
//             value={formData.imagePathes.join(",")}
//             onChange={handleImageChange}
//           /> */}
//   //         <Stack
//   //           direction="row"
//   //           sx={{
//   //             display: "flex",
//   //             justifyContent: "space-between",
//   //             mt: "40px",
//   //           }}
//   //         >
//   //           <Button variant="contained" type="submit">
//   //             Опублікувати
//   //           </Button>
//   //           <Button variant="outlined">Зберегти чернетку</Button>
//   //         </Stack>
//   //       </form>
//   //     </Box>
//   //   </Box>
//   // );
// // }
