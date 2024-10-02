import { FormattedMessage, useIntl } from "react-intl";
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as ReactLink } from "react-router-dom";
import { useFormik } from "formik";
import { registrationSchema } from "@/defaults";
import mainBg from "@assets/images/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/auth/operations";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { selectTheme } from "@/redux/theme/selectors";

export function SignUp() {
  const intl = useIntl();
  const validationSchema = registrationSchema(intl);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      showPassword: false,
    },
    validationSchema,
    onSubmit: ({ firstName, email, password }) => {
      dispatch(registerUser({ firstName, email, password }));
    },
  });

  return (
    <Box
      sx={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {theme && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          backgroundColor: (theme) => theme.palette.background.form,
          maxWidth: { xl: "478px", md: "458px", xs: "91%" },
          padding: {
            xs: "26px 28px 28px",
            md: "38px 65px 40px",
            xl: "48px 75px 50px",
          },
          borderRadius: "16px",
          zIndex: 2,
        }}
      >
        <Typography sx={{ fontSize: { xs: "30px", md: "36px" } }}>
          <FormattedMessage
            id="signup.registration"
            defaultMessage="Registration"
          />
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            mt: { xs: "30px", md: "36px" },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                size="small"
                sx={{ mb: 2.5 }}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth
                id="firstname"
                label={<FormattedMessage id="signup.firstName" />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                sx={{ mb: 2.5 }}
                label={<FormattedMessage id="signup.email" />}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                sx={{ mb: 2.5 }}
                name="password"
                label={<FormattedMessage id="signup.password" />}
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="new-password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                sx={{ mb: 2.5 }}
                name="passwordConfirm"
                label={<FormattedMessage id="signup.confirmPassword" />}
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
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoggedIn}
            sx={{
              borderRadius: "8px",
              p: "12px 24px",
              mt: "24px",
              mb: "40px",
              color: (theme) => theme.palette.buttonColor.fontColor,
              backgroundColor: (theme) => theme.palette.buttonColor.greenYellow,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.buttonColor.greenYellowHover,
              },
            }}
          >
            {isLoggedIn ? (
              <FormattedMessage
                id="signup.checking"
                defaultMessage="Checking..."
              />
            ) : (
              <Typography variant="posterButton">
                {intl.formatMessage({ id: "signup.createAccount" })}
              </Typography>
            )}
          </Button>
          <Typography
            component="p"
            variant="h6"
            sx={{
              fontSize: "14px",
              textAlign: "center",
              color: (theme) => theme.palette.textColor.greyBoth,
            }}
          >
            {<FormattedMessage id="signup.termsAndConditions1" />}
            <Link
              component={ReactLink}
              to="/"
              variant="body2"
              sx={{
                color: (theme) => theme.palette.buttonColor.greenYellow,
                textDecorationColor: (theme) =>
                  theme.palette.buttonColor.greenYellow,
                "&:hover": {
                  color: (theme) => theme.palette.buttonColor.greenYellowHover,
                },
              }}
            >
              {<FormattedMessage id="signup.termsLink" />}
            </Link>{" "}
            {<FormattedMessage id="signup.termsAndConditions2" />}
            <Link
              component={ReactLink}
              to="/"
              variant="body2"
              sx={{
                color: (theme) => theme.palette.buttonColor.greenYellow,
                textDecorationColor: (theme) =>
                  theme.palette.buttonColor.greenYellow,
                "&:hover": {
                  color: (theme) => theme.palette.buttonColor.greenYellowHover,
                },
              }}
            >
              {<FormattedMessage id="signup.privacyLink" />}
            </Link>
          </Typography>
          <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
            <Typography>
              {<FormattedMessage id="signup.alreadyHaveAccount" />}
            </Typography>
            <Link
              component={ReactLink}
              to="/login"
              variant="body2"
              sx={{
                marginTop: "2px",
                marginLeft: "15px",
                color: (theme) => theme.palette.buttonColor.greenYellow,
                textDecorationColor: (theme) =>
                  theme.palette.buttonColor.greenYellow,
                "&:hover": {
                  color: (theme) => theme.palette.buttonColor.greenYellowHover,
                },
              }}
            >
              {<FormattedMessage id="signIn" />}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
