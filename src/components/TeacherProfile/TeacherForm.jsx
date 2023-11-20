import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Stack } from "@mui/material";
import {
  // getAdverts,
  getCountries,
  getLanguages,
  getSpecializations,
  postAdvert,
} from "@/redux/marketplace/adverts/operations";
import { selectToken, selectUser } from "@/redux/auth/selectors";
import { SignUp } from "@/views";
import { v4 as uuidv4 } from "uuid";
import {
  advertsSelector,
  countriesSelector,
  languagesSelector,
  specializationsSelector,
} from "@/redux/marketplace/adverts/advertsSelector";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const initialValues = {
  price: 0,
  description: "",
  spokenLanguages: [],
  teachingLanguages: [],
  specializations: [],
  country: {},
  image: null,
};

const validationSchema = Yup.object({
  price: Yup.number().min(0).required("Price is required"),
  description: Yup.string().required("Description is required"),
  spokenLanguages: Yup.array().min(1, "Select at least one spoken language"),
  teachingLanguages: Yup.array().min(1, "Select at least one teaching language"),
  specializations: Yup.array().required("Specialization is required"),
  country: Yup.object().required("Country is required"),
  image: Yup.mixed().required("Select image"),
});

export const TeacherForm = () => {
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
  console.log(languages);
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
      // const spokenLanguages = values.spokenLanguages.map((language) => ({
      //   languageEn: language.languageEn,
      //   languageUa: language.languageUa,
      // }));

      // const teachingLanguages = values.teachingLanguages.map((language) => ({
      //   languageEn: language.languageEn,
      //   languageUa: language.languageUa,
      // }));
      const transformedData = new FormData();
      transformedData.append("description", values.description);
      transformedData.append("price", values.price);
      transformedData.append("spokenLanguages", JSON.stringify(values.spokenLanguages));
      transformedData.append("teachingLanguages", JSON.stringify(values.teachingLanguages));
      transformedData.append("country", JSON.stringify(values.country));
      transformedData.append("specializations", JSON.stringify(values.specializations));
      transformedData.append("image", values.image);

      dispatch(postAdvert(transformedData));
    },
  });

  return !token ? (
    <SignUp />
  ) : (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="price"
        name="price"
        label="Ціна"
        variant="outlined"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
      />

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
      <FormControl fullWidth variant="outlined">
        <InputLabel>Мови, якими розмовляєте</InputLabel>
        {/* <Select
          id="spokenLanguages"
          name="spokenLanguages"
          multiple
          label="Мови, якими розмовляєте"
          value={formik.values.spokenLanguages}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.spokenLanguages &&
            Boolean(formik.errors.spokenLanguages)
          }
          renderValue={(selected) => selected.join(", ")}
        >
          {languages &&
            languages.map((language) => (
              <MenuItem key={uuidv4()} value={language.languageUa}>
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
          label="Мови викладання"
          value={formik.values.teachingLanguages}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.teachingLanguages &&
            Boolean(formik.errors.teachingLanguages)
          }
          renderValue={(selected) => selected.join(", ")}
        >
          {languages.map((language) => (
            <MenuItem key={uuidv4()} value={language.languageUa}>
              {language.languageUa}
            </MenuItem>
          ))}
        </Select> */}
        <Select
          id="spokenLanguages"
          name="spokenLanguages"
          multiple
          label="Spoken Languages"
          value={formik.values.spokenLanguages}
          onChange={(event) => {
            formik.setFieldValue(
              "spokenLanguages",
              event.target.value.map((language) => ({
                languageEn: language.languageEn,
                languageUa: language.languageUa,
              }))
            );
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.spokenLanguages && Boolean(formik.errors.spokenLanguages)}
          renderValue={(selected) => selected.map((language) => language.languageUa).join(", ")}
        >
          {languages &&
            languages.map((language) => (
              <MenuItem
                key={uuidv4()}
                value={{
                  languageEn: language.languageEn,
                  languageUa: language.languageUa,
                }}
              >
                {language.languageUa}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined">
        <InputLabel>Мова викладання</InputLabel>
        <Select
          id="teachingLanguages"
          name="teachingLanguages"
          multiple
          label="Мова викладання"
          value={formik.values.teachingLanguages}
          onChange={(event) => {
            formik.setFieldValue(
              "teachingLanguages",
              event.target.value.map((language) => ({
                languageEn: language.languageEn,
                languageUa: language.languageUa,
              }))
            );
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.teachingLanguages && Boolean(formik.errors.teachingLanguages)}
          renderValue={(selected) => selected.map((language) => language.languageUa).join(", ")}
        >
          {languages &&
            languages.map((language) => (
              <MenuItem
                key={uuidv4()}
                value={{
                  languageEn: language.languageEn,
                  languageUa: language.languageUa,
                }}
              >
                {language.languageUa}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined">
        <InputLabel>Спеціалізація</InputLabel>
        <Select
          id="specializations"
          name="specializations"
          multiple
          label="Спеціалізація"
          value={formik.values.specializations}
          onChange={(event) => {
            formik.setFieldValue(
              "specializations",
              event.target.value.map((specialization) => ({
                specializationEn: specialization.specializationEn,
                specializationUa: specialization.specializationUa,
              }))
            );
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.specializations && Boolean(formik.errors.specializations)}
          renderValue={(selected) => selected.map((specialization) => specialization.specializationUa).join(", ")}
        >
          {specializations &&
            specializations.map((specialization) => (
              <MenuItem
                key={uuidv4()}
                value={{
                  specializationEn: specialization.specializationEn,
                  specializationUa: specialization.specializationUa,
                }}
              >
                {specialization.specializationUa}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined">
        <InputLabel>Країна</InputLabel>
        <Select
          id="country"
          name="country"
          // multiple
          label="Країна"
          value={formik.values.country}
          onChange={(event) => {
            formik.setFieldValue("country", event.target.value);
            console.log(event.target.value);
          }}
          // onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          renderValue={(selected) => selected.countryUa}
        >
          {countriesList &&
            countriesList.map((countryEl) => (
              <MenuItem
                key={uuidv4()}
                value={{
                  countryEn: countryEl.countryEn,
                  countryUa: countryEl.countryUa,
                }}
              >
                {countryEl.countryUa}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        type="file"
        id="image"
        name="image"
        label="Додати фото"
        variant="outlined"
        accept="image/*"
        placeholder=""
        // value={formik.values.imagePath}
        onChange={(event) => formik.setFieldValue("image", event.target.files[0])}
        onBlur={formik.handleBlur}
        error={formik.touched.image && Boolean(formik.errors.image)}
        helperText={formik.touched.image && formik.errors.image}
      />
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "40px",
        }}
      >
        <Button variant="contained" type="submit">
          Опублікувати
        </Button>
        <Button variant="outlined">Зберегти чернетку</Button>
      </Stack>
    </form>
  );
};

// import { useState } from "react";
// import {
//   TextField,
//   Box,
//   MenuItem,
//   Typography,
//   Button,
//   Stack,
// } from "@mui/material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   languageOptions,
//   ratingOptions,
//   lessonTimeOptions,
//   hobbyOptions,
//   countryOptions,
//   specializationOptions,
//   //teacherCardData,
// } from "@/defaults";

// import tablesBg from "@assets/images/tables.jpeg";

// export function TeacherForm() {
//   const formData = {
//     price: 0,
//     shortDescription: "",
//     spokenLanguages: [],
//     teachingLanguages: [],
//     imagePathes: [],
//     hobbies: [],
//   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //  const handleLanguagesChange = (e, field) => {
// //    const selectedLanguages = Array.isArray(e.target.value)
// //      ? e.target.value
// //      : [];
// //    setFormData({
// //      ...formData,
// //      [field]: selectedLanguages.map((language) => ({ language })),
// //    });
// //  };

// //      const handleImageChange = (e) => {
// //        const imagePathes = e.target.value.split(",");
// //        setFormData({
// //          ...formData,
// //          imagePathes,
// //        });
// //      };

//      const handleSubmit = (values) => {
//       //  e.preventDefault();
//        // Send the formData to your API endpoint (POST /adverts)
//        // Example:
//        console.log(values);
//       //  fetch("/adverts", {
//       //    method: "POST",
//       //    headers: {
//       //      "Content-Type": "application/json",
//       //    },
//       //    body: JSON.stringify(formData),
//       //  })
//       //    .then((response) => response.json())
//       //    .then((data) => {
//       //      console.log("Advertisement created:", data);
//       //      // Optionally, you can reset the form here
//       //      setFormData({
//       //        price: 0,
//       //        shortDescription: "",
//       //        spokenLanguages: [],
//       //        teachingLanguages: [],
//       //        imagePathes: [],
//       //        hobbies: [],
//       //      });
//       //    })
//       //    .catch((error) => {
//       //      console.error("Error creating advertisement:", error);
//       //    });
//      };
//  return (
//     <Formik
//       initialValues={formData}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       <Form>
//         {/* Price Field */}
//         <div>
//           <label htmlFor="price">Price</label>
//           <Field type="number" id="price" name="price" />
//           <ErrorMessage name="price" component="div" />
//         </div>

//         {/* Short Description Field */}
//         <div>
//           <label htmlFor="shortDescription">Short Description</label>
//           <Field type="text" id="shortDescription" name="shortDescription" />
//           <ErrorMessage name="shortDescription" component="div" />
//         </div>

//         {/* Spoken Languages Field */}
//         <div>
//           <label>Spoken Languages</label>
//           <Field
//             as="select"
//             id="spokenLanguages"
//             name="spokenLanguages"
//             multiple
//           >
//             {languageOptions.map((option) => (
//               <option key={option.code} value={option.code}>
//                 {option.title}
//               </option>
//             ))}
//           </Field>
//           <ErrorMessage name="spokenLanguages" component="div" />
//         </div>

//         {/* Add other form fields here */}

//         {/* Submit Button */}
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </Form>
//     </Formik>
//   );
// }
//   // return (
//   //   <Box
//   //     sx={{
//   //       backgroundImage: `url(${tablesBg})`,
//   //       backgroundSize: "cover",
//   //       backgroundRepeat: "no-repeat",
//   //       width: "100%",
//   //       height: "calc(100vh - 70px)",
//   //       display: "flex",
//   //       alignItems: "center",
//   //       justifyContent: "center",
//   //     }}
//   //   >
//   //     <Box
//   //       sx={{
//   //         backgroundColor: "white",
//   //         p: "40px",
//   //         borderRadius: "12px",
//   //       }}
//   //     >
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
