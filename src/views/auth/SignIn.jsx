import {
  Button,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { lightTheme } from 'styles';
import { validationSchema } from 'defaults';

export function SignIn() {
  const initialValues = {
    email: '',
    password: '',
    remember: false,
  };
  const onSubmit = (values, props) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
    console.log(props);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          backgroundColor: 'white',
          maxWidth: '440px',
          padding: '40px',
          borderRadius: '16px',
        }}
      >
        <Typography component="h1" variant="h5">
          Вхід
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {props => (
            <Form>
              {console.log(props)}
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Введіть e-mail"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Введіть пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={<ErrorMessage name="password" />}
              />
              {/* <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Grid container justifyContent="center" alignItems="center">
                <Grid item >
                  <Link href="#" variant="body2">
                    Забули пароль?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disable={props.isSubmitting ? 'true' : 'false'}
                sx={{ mt: 3, mb: 2, textTransform: 'capitalize', backgroundColor: lightTheme.palette.buttonColor.main }}
              >
                {props.isSubmitting ? 'Завантаження' : 'Увійти'}
              </Button>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography>
                        Новий користувач?
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2" align="center">
                        Створити аккаунт
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
