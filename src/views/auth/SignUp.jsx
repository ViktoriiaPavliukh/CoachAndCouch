import * as React from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { lightTheme } from 'styles';

const validationSchema = yup.object({
  email: yup
    .string('Enter your e-mail')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          backgroundColor: 'white',
          maxWidth: '500px',
          padding: '40px',
          borderRadius: '16px',
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
              value={formik.values.name}
              onChange={formik.handleChange}
              required
              fullWidth
              id="name"
              label="Ваше ім'я"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
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
              required
              fullWidth
              name="password"
              label="Придумайте пароль"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, textTransform: 'none', backgroundColor: lightTheme.palette.buttonColor.main }}
        >
          Створити новий аккаунт
        </Button>
        <Typography component="p" variant="h6" sx={{ fontSize: '14px', textAlign: 'center' }}>
            Входячи в систему, я приймаю Умови користування та підтверджую, що мною прочитана Політика конфіденційності 
        </Typography>
        <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
          <Typography>
            Вже є аккаунт?
          </Typography>
            <Link href="#" variant="body2" style={{ color: 'black', marginTop: '2px', marginLeft: '15px' }}>
              Вхід
            </Link>
        </Grid>
      </Box>
    </Box>
  </Container>            
  );
}