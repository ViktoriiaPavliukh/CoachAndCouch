import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import {
  addSpecializationsAsAdmin,
  deleteSpecializationAsAdmin,
  getSpecializations,
} from "@/redux/admin/operations";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { specializationsSchema } from "@/defaults";

const initialValues = {
  specializationUa: "",
  specializationEn: "",

  specializationBD: "",
};

export function AddSpecializationForm({ specializations }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
     validationSchema: specializationsSchema(intl),
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        gap: "20px",
        width: "100%",
      }}
    >
      <Typography sx={{ fontSize: "30px" }}>
        {intl.formatMessage({ id: "specialization" })}
      </Typography>
      <FormControl variant="outlined" sx={{ minWidth: "375px" }}>
        <InputLabel>
          {" "}
          {intl.formatMessage({ id: "specializationInDB" })}
        </InputLabel>
        <Select
          id="specializationBD"
          name="specializationBD"
          label={intl.formatMessage({ id: "specializationInDB" })}
          onBlur={formik.handleBlur}
          error={
            formik.touched.specializationBD &&
            Boolean(formik.errors.specializationBD)
          }
        >
          {specializations &&
            specializations?.map((specialization) => (
              <MenuItem
                key={specialization.id}
                value={specialization}
                sx={{ display: "flex" }}
              >
                <Typography>
                  {specialization.specializationUa +
                    " | " +
                    specialization.specializationEn}
                </Typography>
                <Button
                  sx={{
                    justifySelf: "flex-end",
                    justifyItems: "flex-end",
                    ml: "auto",
                  }}
                  onClick={() => {
                    dispatch(deleteSpecializationAsAdmin(specialization.id));
                    dispatch(getSpecializations());
                  }}
                >
                  D
                </Button>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <form onSubmit={formik.handleSubmit} id="addSpecializationForm">
        <FormControl
          sx={{
            minWidth: "375px",
            width: "100%",
            display: "flex",
            gap: "20px",
          }}
        >
          <TextField
            id="addspecializationUa"
            name="specializationUa"
            label={intl.formatMessage({ id: "inUkr" })}
            value={formik.values.specializationUa}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.specializationUa &&
              Boolean(formik.errors.specializationUa)
            }
            helperText={
              formik.touched.specializationUa && formik.errors.specializationUa
            }
          />
          <TextField
            id="addspecializationEn"
            name="specializationEn"
            label={intl.formatMessage({ id: "inEnglish" })}
            value={formik.values.specializationEn}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.specializationEn &&
              Boolean(formik.errors.specializationEn)
            }
            helperText={
              formik.touched.specializationEn && formik.errors.specializationEn
            }
          />
          <Button variant="contained" type="submit">
            {intl.formatMessage({ id: "addBtn" })}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
AddSpecializationForm.propTypes = {
  specializations: PropTypes.arrayOf(PropTypes.shape),
};
