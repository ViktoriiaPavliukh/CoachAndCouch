import React, { useState, useEffect } from "react";
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

export function SignIn() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const intl = useIntl();
  const validationSchema = loginSchema(intl);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
    },
    validationSchema,
    onSubmit: ({ email, password }) => {
      dispatch(loginUser({ email, password }));
      // formik.resetForm();
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          backgroundColor: (theme) => theme.palette.background.paper,
          maxWidth: "440px",
          padding: "40px 56px",
          borderRadius: "16px",
        }}
      >
        <Typography component="h1" variant="h5">
          {intl.formatMessage({ id: "signIn" })}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            mt: 3,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <TextField
                sx={{
                  mb: "40px",
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
                  mb: "28px",
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
              variant="posterItem"
              sx={{
                color: (theme) => theme.palette.textColor.greyWhite,
                textDecoration: "underline",
                // paddingBottom: "1px",
                // borderBottom:
                //   "1px solid"
              }}
            >
              {" "}
              {intl.formatMessage({ id: "forgotPassword" })}
            </Typography>
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoggedIn}
            sx={{
              mt: "28px",
              mb: "44px",
              textTransform: "upperCase",
              backgroundColor: (theme) => theme.palette.buttonColor.secondary,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.buttonColor.hover,
              },
              color: (theme) => theme.palette.textColor.header,
            }}
          >
            {isLoggedIn
              ? intl.formatMessage({ id: "loading" })
              : intl.formatMessage({ id: "signInButton" })}
          </Button>
          <Box justifyContent="center">
            <Typography sx={{ textAlign: "center", display: "block" }}>
              {intl.formatMessage({ id: "newUser" })}
            </Typography>
            <Link
              component={ReactLink}
              to="/registration"
              variant="body2"
              align="center"
              sx={{ textAlign: "center", mt: 2, display: "block" }}
            >
              {intl.formatMessage({ id: "createAccount" })}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
