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
    MuiTextField: {
      styleOverrides: {
        variants: {
          containedSizeSmall: {
            padding: '10.5px 14px',
            height: 44, // Set the desired height, in this case, 44px
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        variants: {
          containedSizeSmall: {
            height: 44, // Set the desired height, in this case, 44px
          },
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#285b1d',
    },
    secondary: {
      main: '#e4eadd',
    },
    buttonColor: {
      main: '#7ab02e',
    },
  },
});
export const darkTheme = createTheme({
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
    MuiTextField: {
      styleOverrides: {
        variants: {
          containedSizeSmall: {
            padding: '10.5px 14px',
            height: 44, // Set the desired height, in this case, 44px
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        variants: {
          containedSizeSmall: {
            height: 44, // Set the desired height, in this case, 44px
          },
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#285b1d',
    },
    secondary: {
      main: '#e4eadd',
    },
    buttonColor: {
      main: '#7ab02e',
    },
  },
});
