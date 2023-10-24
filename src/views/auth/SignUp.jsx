import { Button, TextField, Link, Grid, Box, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as ReactLink } from "react-router-dom";
import { useFormik } from "formik";
import { registrationSchema as validationSchema } from "@/defaults";
import mainBg from "@assets/images/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/auth/operations";
import { selectIsLoggedIn } from "@/redux/auth/selectors";

export function SignUp() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      showPassword: false,
    },
    validationSchema,
    onSubmit: ({ name, email, password }) => {
      dispatch(registerUser({ name, email, password }));
      console.log(name, email, password);
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
        // height: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          backgroundColor: (theme) => theme.palette.background.paper,
          backgroundSize: "cover",
          maxWidth: "440px",
          padding: "40px 56px",
          borderRadius: "16px",
          marginTop: "2%",
          marginBottom: "20px",
        }}
      >
        <Typography component="h1" variant="h5">
          Реєстрація
        </Typography>
        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                size="small"
                sx={{ mb: 2.5 }}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                id="name"
                label="Ваше ім'я"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                sx={{ mb: 2.5 }}
                label="Введіть e-mail"
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
                label="Придумайте пароль"
                type={formik.values.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => formik.setFieldValue("showPassword", !formik.values.showPassword)}
                        edge="end"
                      >
                        {formik.values.showPassword ? <VisibilityOff /> : <Visibility />}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                sx={{ mb: 2.5 }}
                name="passwordConfirm"
                label="Повторіть пароль"
                type={formik.values.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm visibility"
                        onClick={() => formik.setFieldValue("showPassword", !formik.values.showPassword)}
                        edge="end"
                      >
                        {formik.values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
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
              mt: 3,
              mb: 2,
              textTransform: "none",
              backgroundColor: (theme) => theme.palette.buttonColor.main,
            }}
          >
            {isLoggedIn ? "Перевіряємо..." : "Створити новий аккаунт"}
          </Button>
          <Typography component="p" variant="h6" sx={{ fontSize: "14px", textAlign: "center" }}>
            Входячи в систему, я приймаю{" "}
            <Link component={ReactLink} to="/" variant="body2">
              Умови користування
            </Link>{" "}
            та підтверджую, що мною прочитана{" "}
            <Link component={ReactLink} to="/" variant="body2">
              Політика конфіденційності
            </Link>
          </Typography>
          <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
            <Typography>Вже є аккаунт?</Typography>
            <Link component={ReactLink} to="/login" variant="body2" style={{ marginTop: "2px", marginLeft: "15px" }}>
              Вхід
            </Link>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
