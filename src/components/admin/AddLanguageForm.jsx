import PropTypes from "prop-types";
import { addLanguagesAsAdmin, deleteLanguageAsAdmin, getLanguages } from "@/redux/admin/operations";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const initialValues = {
  languageUa: "",
  languageEn: "",

  languagesBD: "",
};
const validationSchema = Yup.object({
  languageUa: Yup.string().required("This field id required"),
  languageEn: Yup.string().required("This field id required"),
});

export function AddLanguageForm({ languages }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(addLanguagesAsAdmin({ languageUa: values.languageUa, languageEn: values.languageEn }));
      dispatch(getLanguages());
      formik.resetForm();
    },
  });
  return (
    <Box style={{ display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>
      <h2>Додати мову</h2>
      <FormControl variant="outlined" sx={{ width: "300px" }}>
        <InputLabel>Мови в базі даних:</InputLabel>
        <Select
          id="languagesBD"
          name="languagesBD"
          label="Languages"
          // value={formik.values.languagesBD || ""}
          // onChange={(event) => {
          //   formik.setFieldValue("languagesBD", event.target.value);
          // }}
          onBlur={formik.handleBlur}
          error={formik.touched.languagesBD && Boolean(formik.errors.languagesBD)}
          // renderValue={(selected) =>
          //   selected.map((language) => {
          //     language;
          //   })
          // }
        >
          {languages &&
            languages?.map((language) => (
              <MenuItem key={language.id} value={language}>
                {language.id + " " + language.languageUa + " " + language.languageEn}
                <button
                  onClick={() => {
                    dispatch(deleteLanguageAsAdmin(language.id));
                    dispatch(getLanguages());
                  }}
                >
                  D
                </button>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <form onSubmit={formik.handleSubmit} id="addLanguageForm">
        <label>
          Українською:
          <TextField
            id="addLanguageUa"
            name="languageUa"
            value={formik.values.languageUa}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.languageUa && Boolean(formik.errors.languageUa)}
            helperText={formik.touched.languageUa && formik.errors.languageUa}
          />
        </label>
        <br />
        <label>
          Англійською:
          <TextField
            id="addLanguageEn"
            name="languageEn"
            value={formik.values.languageEn}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.languageEn && Boolean(formik.errors.languageEn)}
            helperText={formik.touched.languageEn && formik.errors.languageEn}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </Box>
  );
}
AddLanguageForm.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape),
};
