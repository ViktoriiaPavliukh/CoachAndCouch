import React from "react";
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
import { Link as ReactLink } from "react-router-dom";
import { useIntl } from "react-intl";
import { useFormik } from "formik";
import { loginSchema } from "@/defaults";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import mainBg from "@assets/images/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/auth/operations";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { selectTheme } from "@/redux/theme/selectors";

export function SignIn() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const intl = useIntl();
  const validationSchema = loginSchema(intl);
  const theme = useSelector(selectTheme);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
    },
    validationSchema,
    onSubmit: ({ email, password }) => {
      dispatch(loginUser({ email, password }));
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
          backgroundColor: (theme) => theme.palette.background.paper,
          maxWidth: "458px",
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
          {intl.formatMessage({ id: "signIn" })}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            mt: "36px",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <TextField
                sx={{
                  mb: "36px",
                }}
                size="small"
                fullWidth
                label={intl.formatMessage({ id: "enterEmail" })}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={
                  formik.touched.email && formik.errors.email ? (
                    <Typography variant="body2" color="error">
                      {formik.errors.email}
                    </Typography>
                  ) : null
                }
                name="email"
                autoComplete="email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{
                  mb: "24px",
                }}
                fullWidth
                size="small"
                name="password"
                label={intl.formatMessage({ id: "enterPassword" })}
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
          </Grid>
          <Link
            href="."
            sx={{
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="posterUnderline"
              sx={{
                color: (theme) => theme.palette.textColor.greyBoth,
                textDecoration: "underline",
              }}
            >
              {intl.formatMessage({ id: "forgotPassword" })}
            </Typography>
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoggedIn}
            sx={{
              borderRadius: "8px",
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
            {isLoggedIn
              ? intl.formatMessage({ id: "loading" })
              : intl.formatMessage({ id: "signInButton" })}
          </Button>
          <Box justifyContent="center">
            <Typography
              variant="posterUnderline"
              sx={{
                textAlign: "center",
                display: "block",
                color: (theme) => theme.palette.textColor.greyBoth,
              }}
            >
              {intl.formatMessage({ id: "newUser" })}
            </Typography>
            <Link
              component={ReactLink}
              to="/registration"
              variant="body2"
              align="center"
              sx={{
                textAlign: "center",
                mt: "6px",
                display: "block",
                textDecoration: "none",
                color: (theme) => theme.palette.textColor.listColor,
              }}
            >
              {intl.formatMessage({ id: "createAccount" })}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
