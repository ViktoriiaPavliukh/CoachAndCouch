import * as React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  FormControl,
  MenuItem,
  Select,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { changeTheme } from "@/redux/theme/slice";
import { deleteUserAsUser } from "../../redux/users/operations";
import { selectUser } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import { passwordSchema } from "@/defaults";
import * as Yup from "yup";

export const Settings = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const validationSchema = passwordSchema(intl);
  const navigate = useNavigate();
  const isDarkTheme = useSelector((state) => state.theme.value);

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
      showPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: ({ password }) => {
      // dispatch(registerUser({ firstName, email, password }));
      console.log("Entered password:", password);
    },
  });

  const handleChange = (event) => {
    dispatch(changeTheme());
  };

  const handleDeleteAccount = () => {
    try {
      dispatch(deleteUserAsUser(user.id));
      dispatch(logoutUser());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "91%", md: "84%", lg: "61%", xl: "46%" },
        maxWidth: { md: "648px", lg: "880px" },
        margin: "0 auto",
        mt: { xs: "45px", md: "105px", lg: "158px", xl: "186px" },
        paddingY: { xs: "96px" },
        paddingX: { xs: "24px" },
        backgroundColor: (theme) => theme.palette.background.sidebar,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "left", md: "center" },
          gap: {
            xs: "32px",
            md: "0",
          },
          paddingBottom: "26px",
          borderBottom: "1px solid #9da3af",
        }}
      >
        <Typography variant="posterPopupTitle">
          {intl.formatMessage({ id: "theme" })}
        </Typography>
        <FormControl sx={{ width: { md: "375px" } }}>
          <Select
            value={isDarkTheme ? "dark" : "light"}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "theme-selector" }}
          >
            <MenuItem value="light">
              <Typography variant="posterSubtitle">
                {intl.formatMessage({ id: "lightTheme" })}
              </Typography>
            </MenuItem>
            <MenuItem value="dark">
              <Typography variant="posterSubtitle">
                {intl.formatMessage({ id: "darkTheme" })}
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Typography variant="posterTitleBold" sx={{ paddingTop: "26px" }}>
        {intl.formatMessage({ id: "changePassword" })}
      </Typography>
      <Stack
        sx={{
          display: "flex",
          paddingTop: "26px",
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: "20px 0", lg: "0 36px" },
        }}
      >
        <TextField
          fullWidth
          size="small"
          name="password"
          label={intl.formatMessage({ id: "newPassword" })}
          type={formik.values.showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    formik.setFieldValue(
                      "showPassword",
                      !formik.values.showPassword
                    )
                  }
                  edge="end"
                >
                  {formik.values.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          autoComplete="new-password"
        />
        <TextField
          fullWidth
          size="small"
          name="passwordConfirm"
          label={intl.formatMessage({ id: "repeatPassword" })}
          type={formik.values.showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm visibility"
                  onClick={() =>
                    formik.setFieldValue(
                      "showPassword",
                      !formik.values.showPassword
                    )
                  }
                  edge="end"
                >
                  {formik.values.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          error={
            formik.touched.passwordConfirm &&
            Boolean(formik.errors.passwordConfirm)
          }
          helperText={
            formik.touched.passwordConfirm && formik.errors.passwordConfirm
          }
          autoComplete="new-password"
        />
      </Stack>
      <Stack
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-end" },
          paddingBottom: "26px",
          borderBottom: "1px solid #9da3af",
        }}
      >
        <Button
          type="submit"
          variant="button"
          onClick={formik.handleSubmit}
          sx={{
            display: "flex",
            mt: "26px",
            p: "12px 32px",
            width: { xs: "100%", md: "185px" },
            borderRadius: "6px",
            transition: "background-color 0.3s",
            backgroundColor: (theme) => theme.palette.buttonColor.greenDark,
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.buttonColor.greenDarkHover,
            },
          }}
        >
          <Typography
            variant="posterButton"
            sx={{ color: (theme) => theme.palette.textColor.header }}
          >
            {intl.formatMessage({ id: "saveChanges" })}
          </Typography>
        </Button>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          width: "100%",
          pt: "26px",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Button
          onClick={handleDeleteAccount}
          sx={{
            p: "10px 18px",
          }}
        >
          <Typography
            variant="posterSubtitle"
            noWrap
            sx={{ color: (theme) => theme.palette.textColor.red }}
          >
            {intl.formatMessage({ id: "deleteAccount" })}
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};
