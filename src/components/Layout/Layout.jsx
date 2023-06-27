import React from 'react';
import { Header } from '../Header/Header';
import { CssBaseline, ThemeProvider, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { lightTheme, darkTheme } from 'styles';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/theme/selectors';

export default function Layout() {
  const isDark = useSelector(selectTheme);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container disableGutters maxWidth={false}>
        <Header />
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
