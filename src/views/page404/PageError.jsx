import React from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { Box, Typography, Button, useTheme } from "@mui/material/";
import mainBg from "@assets/images/bg.webp";
import ZeroIcon from "@/assets/icons/ZeroIcon";
import FourIcon from "@/assets/icons/FourIcon";

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
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${mainBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: theme.palette.mode === "light" ? "1" : "0.4",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: (theme) => theme.palette.background.paper,
          padding: {
            xs: "68px 32px",
            md: "80px 48px",
            lg: "79px 194px",
            xl: "114px 248px",
          },
          marginX: { xs: "2%", md: "12%", lg: "15%" },
          borderRadius: "24px",
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
          sx={{
            paddingTop: "20px",
            color: (theme) => theme.palette.textColor.fontError,
            textAlign: "center",
            fontSize: { xs: "18px" },
            maxWidth: "310px",
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
