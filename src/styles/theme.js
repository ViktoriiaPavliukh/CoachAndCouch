import { createTheme } from "@mui/material/styles";

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
  palette:
    themeColor === "light"
      ? {
          mode: "light",
          primary: {
            main: "#0E5B1D",
            accent: "#7ab02e",
            switch: "#ffffff",
          },
          secondary: {
            main: "#e4eadd",
          },
          buttonColor: {
            main: "#0E5B1D",
            hover: "#ADCF7D",
            darkHover: "#7ab02e",
            fontColor: "#F1F3EF",
          },
          textColor: {
            title: "#0E5B1D",
            main: "#7ab02e",
            grey: "#878D99",
            darkGrey: "#5A5E67",
            iconsGrey: "#7D7D7D",
            menuHover: "#A4E941",
          },
        }
      : {
          mode: "dark",
          primary: {
            main: "#313732",
            accent: "#7ab02e",
            switch: "#7AB02E",
          },
          secondary: {
            main: "#e4eadd",
          },
          buttonColor: {
            main: "#0E5B1D",
            hover: "#ADCF7D",
            darkHover: "#7ab02e",
            fontColor: "#F1F3EF",
          },
          textColor: {
            title: "#7ab02e",
            main: "#7ab02e",
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
    fontTitle: {
      fontSize: "40px",
      fontWeight: "900",
      lineHeight: "28px",
      fontStyle: "normal",
      color: "#5A5E67",
    },
    fontLink: {
      fontSize: "22px",
      fontWeight: "300",
      lineHeight: "24px",
      fontStyle: "normal",
      color: "#384C5E",
    },
    fontHeader: {
      fontSize: "16px",
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
