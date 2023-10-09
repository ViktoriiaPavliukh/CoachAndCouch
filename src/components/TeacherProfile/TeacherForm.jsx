import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Stack } from "@mui/material";
import {
  languageOptions,
  // ratingOptions,
  // lessonTimeOptions,
  hobbyOptions,
  // countryOptions,
  // specializationOptions,
} from "@/defaults";
import { postAdvert } from "@/redux/marketplace/adverts/operations";

const initialValues = {
  price: 0,
  shortDescription: "",
  spokenLanguages: [],
  teachingLanguages: [],
  imagePath: "",
  hobbies: [],
};

const validationSchema = Yup.object({
  price: Yup.number().min(0).required("Price is required"),
  shortDescription: Yup.string().required("Description is required"),
  spokenLanguages: Yup.array().min(1, "Select at least one spoken language"),
  teachingLanguages: Yup.array().min(
    1,
    "Select at least one teaching language"
  ),
  hobbies: Yup.array(),
});

export const TeacherForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {

      const hobbies = Array.isArray(values.hobbies)
        ? values.hobbies.map((hobby) => ({ hobby }))
        : [];
      const spokenLanguages = Array.isArray(values.spokenLanguages)
        ? values.spokenLanguages.map((language) => ({ language }))
        : [];
      const teachingLanguages = Array.isArray(values.teachingLanguages)
        ? values.teachingLanguages.map((language) => ({ language }))
        : [];

      const transformedData = {
        shortDescription: values.shortDescription,
        price: values.price,
        imagePath: values.imagePath,
        hobbies,
        spokenLanguages,
        teachingLanguages,
      };

      console.log(transformedData);

      // Dispatch the transformed data
      dispatch(postAdvert(transformedData));

    },

    // onSubmit: (values) => {
    //   console.log(values);
    //   dispatch(
    //     postAdvert({
    //       shortDescription: "Some text",
    //       price: 0.97,
    //       imagePath: "image789.jpg",
    //       hobbies: [{ hobby: "Футбол" }, { hobby: "Кодування" }, { hobby: "Розробка" }],
    //       spokenLanguages: [{ language: "polski" }],
    //       teachingLanguages: [{ language: "polski" }],
    //     })
    //   );
    // },
  });

  return (
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
        id="shortDescription"
        name="shortDescription"
        label="Опис"
        variant="outlined"
        multiline
        rows={4}
        value={formik.values.shortDescription}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.shortDescription &&
          Boolean(formik.errors.shortDescription)
        }
        helperText={
          formik.touched.shortDescription && formik.errors.shortDescription
        }
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel>Захоплення</InputLabel>
        <Select
          id="hobbies"
          name="hobbies"
          multiple
          label="Захоплення"
          value={formik.values.hobbies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.hobbies &&
            Boolean(formik.errors.hobbies)
          }
          renderValue={(selected) => selected.join(", ")}
        >
          {hobbyOptions.map((hobby) => (
            <MenuItem key={hobby.code} value={hobby.title}>
              {hobby.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Мови, якими розмовляєте</InputLabel>
        <Select
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
          {languageOptions.map((language) => (
            <MenuItem key={language.code} value={language.title}>
              {language.title}
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
          {languageOptions.map((language) => (
            <MenuItem key={language.code} value={language.title}>
              {language.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        id="imagePath"
        name="imagePath"
        label="Додати фото"
        variant="outlined"
        value={formik.values.imagePath}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.imagePath && Boolean(formik.errors.imagePath)}
        helperText={formik.touched.imagePath && formik.errors.imagePath}
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
