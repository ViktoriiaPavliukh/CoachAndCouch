import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const createThemeTemplate = (themeColor) => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: "100vh",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 834,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: themeColor,
    primary: {
      main: "#0E5B1D",
    },
    secondary: {
      main: "#e4eadd",
    },
    buttonColor: {
      main: "#7ab02e",
      hover: "#ADCF7D",
      darkHover: "#50945E",
      fontColor: "#F1F3EF",
    },
    textColor: {
      grey: "#878D99",
      darkGrey: "#5A5E67",
      iconsGrey: "#7D7D7D",
      menuHover: "#A4E941",
    },
  },
  typography: {
    fontHeading: {
      fontSize: "50px",
      fontWeight: "900",
      lineHeight: "60px",
      fontStyle: "normal",
    },
    fontHeader: {
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "24px",
      fontStyle: "normal",
      letterSpacing: "0.32px",
      fontWeight: "500",
    },
    posterName: {
      fontSize: "48px",
      fontWeight: "900",
      fontStyle: "normal",
      lineHeight: "0.5833",
    },
    posterCategory: {
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "calc(24 / 16)",
      textTransform: "uppercase",
    },
    posterItem: {
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "calc(16 / 12)",
    },
    posterTitle: {
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "1",
      textTransform: "uppercase",
    },
    posterDescription: {
      fontSize: "16px",
      lineHeight: "calc(24 / 16)",
    },
    posterStatus: {
      fontSize: "8px",
      lineHeight: "16px",
      fontWeight: "400",
    },
    posterButton: {
      fontSize: "14px",
      lineHeight: "calc(16 / 14)",
      fontWeight: "700",
      textTransform: "uppercase",
    },
    posterPrice: {
      fontSize: "36px",
      fontWeight: "700",
      lineHeight: "calc(28 /36)",
    },
  },
});

export const lightTheme = createTheme(createThemeTemplate("light"));

export const darkTheme = createTheme(createThemeTemplate("dark"));
