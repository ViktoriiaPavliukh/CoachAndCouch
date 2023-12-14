import { createTheme } from "@mui/material/styles";

const createThemeTemplate = (themeColor) => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: "100vh",
          fontFamily: "Mulish, sans-serif",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 375,
      md: 768,
      lg: 1440,
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
            header: "#FFF",
            title: "#0E5B1D",
            main: "#7ab02e",
            grey: "#878D99",
            green: "#146817",
            darkGrey: "#5A5E67",
            iconsGrey: "#7D7D7D",
            menuHover: "#A4E941",
            black: "#030904",
          },
        }
      : {
          mode: "dark",
          primary: {
            main: "#88CA1E",
            accent: "#7ab02e",
            switch: "#000",
          },
          secondary: {
            main: "#e4eadd",
          },
          buttonColor: {
            main: "#88CA1E",
            hover: "#ADCF7D",
            darkHover: "#ADCF7D",
            fontColor: "#000",
          },
          textColor: {
            header: "#030904",
            title: "#7ab02e",
            main: "#7ab02e",
            grey: "#878D99",
            green: "#88CA1E",
            darkGrey: "#5A5E67",
            iconsGrey: "#7D7D7D",
            menuHover: "#030904",
            black: "#FFF",
          },
        },
  typography: {
    fontFamily: "Mulish, sans-serif",
    fontHeading: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "50px",
      fontWeight: "900",
      lineHeight: "60px",
      fontStyle: "normal",
    },
    fontTitle: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "40px",
      fontWeight: "900",
      lineHeight: "28px",
      fontStyle: "normal",
      color: "#5A5E67",
    },
    fontLink: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "22px",
      fontWeight: "300",
      lineHeight: "24px",
      fontStyle: "normal",
      color: "#384C5E",
    },
    fontHeader: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "16px",
      lineHeight: "24px",
      fontStyle: "normal",
      letterSpacing: "0.32px",
      fontWeight: "500",
    },
    posterName: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "48px",
      fontWeight: "900",
      fontStyle: "normal",
      lineHeight: "0.5833",
    },
    posterCategory: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "calc(24 / 16)",
      textTransform: "uppercase",
    },
    posterItem: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "calc(16 / 12)",
    },
    posterTitle: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "1",
      textTransform: "uppercase",
    },
    posterBlack: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "30px",
      fontWeight: "600",
      lineHeight: "32px",
      letterSpacing: "0.6px",
    },
    posterSubtitle: {
      fontFamily: "Mulish, sans-serif",
      pt: "20px",
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "23.4px",
    },
    posterDescription: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "16px",
      lineHeight: "calc(24 / 16)",
    },
    posterStatus: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "8px",
      lineHeight: "16px",
      fontWeight: "400",
    },
    posterButton: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "14px",
      lineHeight: "calc(16 / 14)",
      fontWeight: "700",
      textTransform: "uppercase",
    },
    posterPrice: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "36px",
      fontWeight: "700",
      lineHeight: "calc(28 /36)",
    },
    bigTitle: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "98px",
      fontWeight: "500",
      lineHeight: "98px",
    },
    text: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "23.4px",
    },
    textUppercase: {
      fontFamily: "Mulish, sans-serif",
      textTransform: "uppercase",
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "23.4px",
    },
  },
});

export const lightTheme = createTheme(createThemeTemplate("light"));

export const darkTheme = createTheme(createThemeTemplate("dark"));
