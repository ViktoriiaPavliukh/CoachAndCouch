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
      main: '#0E5B1D',
    },
    secondary: {
      main: '#e4eadd',
    },
    buttonColor: {
      main: '#7ab02e',
    },
  },
  typography: {
    posterName: {
      fontSize: '48px',
      fontWeight: '900',
      fontStyle: 'normal',
      lineHeight: '0.5833',
    },
    posterCategory: {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'calc(24 / 16)',
      textTransform: 'uppercase',
    },
    posterItem: {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 'calc(16 / 12)',
    },
    posterTitle: {
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '1',
      textTransform: 'uppercase',
    },
    posterDescription: {
      fontSize: '16px',
      lineHeight: 'calc(24 / 16)',
    },
    posterButton: {
      fontSize: '14px',
      lineHeight: 'calc(16 / 14)',
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    posterPrice: {
      fontSize: '36px',
      fontWeight: '700',
      lineHeight: 'calc(28 /36)',
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
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#0E5B1D',
    },
    secondary: {
      main: '#e4eadd',
    },
    buttonColor: {
      main: '#7ab02e',
    },
  },
  typography: {
    posterName: {
      fontSize: '48px',
      fontWeight: '900',
      fontStyle: 'normal',
      lineHeight: '0.5833',
    },
    posterCategory: {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'calc(24 / 16)',
      textTransform: 'uppercase',
    },
    posterItem: {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 'calc(16 / 12)',
    },
    posterTitle: {
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '1',
      textTransform: 'uppercase',
    },
    posterDescription: {
      fontSize: '16px',
      lineHeight: 'calc(24 / 16)',
    },
    posterButton: {
      fontSize: '14px',
      lineHeight: 'calc(16 / 14)',
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    posterPrice: {
      fontSize: '36px',
      fontWeight: '700',
      lineHeight: 'calc(28 /36)',
    },
  },
});
