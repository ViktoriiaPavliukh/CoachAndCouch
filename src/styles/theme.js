import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#285b1d'
    },
    secondary: {
      main: '#e4eadd'
    }
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
