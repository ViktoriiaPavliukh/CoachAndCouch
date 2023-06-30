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
import { lightTheme } from 'styles';

export function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
        Реєстрація
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Ваше ім'я"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Введіть e-mail"
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
        <Grid container justifyContent="center">
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