import PropTypes from "prop-types";
import {
  //   addLanguagesAsAdmin,
  addSpecializationsAsAdmin,
  //   deleteLanguageAsAdmin,
  deleteSpecializationAsAdmin,
  getSpecializations,
  //   getLanguages,
} from "@/redux/admin/operations";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const initialValues = {
  specializationUa: "",
  specializationEn: "",

  specializationBD: "",
};
const validationSchema = Yup.object({
  specializationUa: Yup.string().required("This field id required"),
  specializationEn: Yup.string().required("This field id required"),
});

export function AddSpecializationForm({ specializations }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(
        addSpecializationsAsAdmin({
          specializationUa: values.specializationUa,
          specializationEn: values.specializationEn,
        })
      );
      dispatch(getSpecializations());
      formik.resetForm();
    },
  });
  return (
    <Box style={{ display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>
      <h2>Додати cпеціалізацію</h2>
      <FormControl variant="outlined" sx={{ width: "300px" }}>
        <InputLabel>Спеціалізації в базі даних:</InputLabel>
        <Select
          id="specializationBD"
          name="specializationBD"
          label="Specializations"
          // value={formik.values.languagesBD || ""}
          // onChange={(event) => {
          //   formik.setFieldValue("languagesBD", event.target.value);
          // }}
          onBlur={formik.handleBlur}
          error={formik.touched.specializationBD && Boolean(formik.errors.specializationBD)}
          // renderValue={(selected) =>
          //   selected.map((language) => {
          //     language;
          //   })
          // }
        >
          {specializations &&
            specializations?.map((specialization) => (
              <MenuItem key={specialization.id} value={specialization}>
                {specialization.id + " " + specialization.specializationUa + " " + specialization.specializationEn}
                <button
                  onClick={() => {
                    dispatch(deleteSpecializationAsAdmin(specialization.id));
                    dispatch(getSpecializations());
                  }}
                >
                  D
                </button>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <form onSubmit={formik.handleSubmit} id="addSpecializationForm">
        <label>
          Українською:
          <TextField
            id="addspecializationUa"
            name="specializationUa"
            value={formik.values.specializationUa}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.specializationUa && Boolean(formik.errors.specializationUa)}
            helperText={formik.touched.specializationUa && formik.errors.specializationUa}
          />
        </label>
        <br />
        <label>
          Англійською:
          <TextField
            id="addspecializationEn"
            name="specializationEn"
            value={formik.values.specializationEn}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.specializationEn && Boolean(formik.errors.specializationEn)}
            helperText={formik.touched.specializationEn && formik.errors.specializationEn}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </Box>
  );
}
AddSpecializationForm.propTypes = {
  specializations: PropTypes.arrayOf(PropTypes.shape),
};
