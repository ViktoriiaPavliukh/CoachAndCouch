import { createTheme } from '@mui/material/styles';
import mainBg from '../shared/images/bg.png';

export const lightTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url(${mainBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#285b1d'
    },
    secondary: {
      main: '#e4eadd'
    },
    buttonColor: {
      main: '#7ab02e'
    }
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
