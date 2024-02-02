import React from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { Box, Typography, Button, useTheme } from "@mui/material/";
import mainBg from "@assets/images/bg.png";

const ZeroIcon = ({ fillColor, width }) => (
  <svg
    width={width}
    viewBox="0 0 186 255"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="0"
      d="M93.2008 254.45C63.5675 254.45 40.7008 243.367 24.6008 221.2C8.73412 198.8 0.800781 167.3 0.800781 126.7C0.800781 85.4 8.73412 54.0167 24.6008 32.55C40.7008 10.85 63.5675 0 93.2008 0C123.067 0 145.934 10.85 161.801 32.55C177.667 54.0167 185.601 85.2833 185.601 126.35C185.601 167.183 177.667 198.8 161.801 221.2C145.934 243.367 123.067 254.45 93.2008 254.45ZM93.2008 210.35C106.734 210.35 116.767 203.7 123.301 190.4C130.067 176.867 133.451 155.517 133.451 126.35C133.451 97.1833 130.067 76.1833 123.301 63.35C116.767 50.5167 106.734 44.1 93.2008 44.1C79.6675 44.1 69.5175 50.5167 62.7508 63.35C56.2174 76.1833 52.9508 97.0667 52.9508 126C52.9508 155.4 56.3341 176.867 63.1008 190.4C69.8675 203.7 79.9008 210.35 93.2008 210.35Z"
      fill={fillColor}
    />
  </svg>
);

const FourIcon = ({ fillColor, width }) => (
  <svg
    width={width}
    viewBox="0 0 192 247"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="4"
      d="M105.7 246.75V201.6H0V163.8L114.1 0H158.2V160.65H191.8V201.6H158.2V246.75H105.7ZM105.7 160.65V64.4H114.45L39.2 173.25V160.65H105.7Z"
      fill={fillColor}
    />
  </svg>
);

export default function PageError() {
  const navigate = useNavigate();
  const intl = useIntl();
  const theme = useTheme();
  const svgFill = theme.palette.mode === "light" ? "#0E5B1D" : "#51A134";
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/`);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: (theme) => theme.palette.background.paper,
          padding: { xs: "68px 32px", md: "80px 48px", lg: "79px 194px" },
          borderRadius: "24px",
          maxWidth: "1008px",
          maxHeight: "676px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingY: { xs: "40px", lg: "0px" },
            gap: { xs: "20px", lg: "26px" },
          }}
        >
          <FourIcon fillColor={svgFill} width="25%" />
          <ZeroIcon fillColor={svgFill} width="25%" />
          <FourIcon fillColor={svgFill} width="25%" />
        </Box>
        <Typography
          variant="posterBlack"
          sx={{
            color: (theme) => theme.palette.textColor.fontError,
            fontSize: { xs: "24px", md: "36px" },
            paddingTop: { xs: "0", lg: "68px" },
            textAlign: "center",
          }}
        >
          {intl.formatMessage({ id: "errorTitle" })}
        </Typography>
        <Typography
          variant="posterSubtitle"
          sx={{
            paddingTop: "20px",
            color: (theme) => theme.palette.textColor.fontError,
            textAlign: "center",
          }}
        >
          {intl.formatMessage({ id: "errorSubtitle" })}
        </Typography>
        <Button
          type="button"
          variant="contained"
          onClick={handleClick}
          sx={{
            mt: "36px",
            p: "12px 40px",

            borderRadius: "8px",
            transition: "background-color 0.3s",
            backgroundColor: (theme) => theme.palette.buttonColor.greenYellow,
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.buttonColor.greenYellowHover,
            },
          }}
        >
          <Typography
            variant="posterButton"
            sx={{ color: (theme) => theme.palette.buttonColor.fontColor }}
          >
            {intl.formatMessage({ id: "homepageBtn" })}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
