import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { Box, Typography, Button } from "@mui/material/";
import mainBg from "@assets/images/bg.png";
// import four from "../../assets/icons/four.svg";
// import zero from "../../assets/icons/zero.svg";

export default function PageError() {
  const navigate = useNavigate();
  const intl = useIntl();
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
        width: "100%",
        height: "calc(100vh - 70px)",
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
          // maxWidth: "440px",
          padding: "86px 182px",
          borderRadius: "16px",
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontSize: "200px",
            color: (theme) => theme.palette.textColor.green,
          }}
        >
          404
        </Typography>
        <Typography
          variant="posterBlack"
          sx={{ color: (theme) => theme.palette.textColor.black }}
        >
          {intl.formatMessage({ id: "errorTitle" })}
        </Typography>
        <Typography
          variant="posterSubtitle"
          sx={{
            pt: "20px",
            color: (theme) => theme.palette.textColor.black,
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
            maxWidth: { xs: "100%", sm: "375px", md: "328px" },
            borderRadius: "8px",
            transition: "background-color 0.3s",
            backgroundColor: (theme) => theme.palette.buttonColor.main,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.buttonColor.darkHover,
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
