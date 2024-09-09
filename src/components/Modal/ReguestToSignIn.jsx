import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useIntl } from "react-intl";
import { X } from "react-feather";
import PropTypes from "prop-types";

const RequestToSignIn = ({ onBackdropClose }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
    onBackdropClose();
  };

  const handleRegister = () => {
    navigate("/registration");
    onBackdropClose();
  };

  return (
    <Box
      sx={{
        width: { sm: "335px", md: "615px", lg: "750px" },
        position: "absolute",
        top: "50%",
        left: "50%",
        background: (theme) => theme.palette.background.paper,
        transform: "translate(-50%,-50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: "20px 40px 40px",
      }}
    >
      <Button
        sx={{
          border: "none",
          backgroundColor: "#E5E7EB",
          minWidth: "24px",
          height: "24px",
          borderRadius: "50%",
          ml: "auto",
          mb: "29px",
          p: "4px",
          "&:hover": { backgroundColor: "#9CA3AF" },
        }}
        onClick={onBackdropClose}
      >
        <X
          style={{
            color: "#000",
            width: "16px",
            height: "16px",
          }}
        />
      </Button>

      <Typography
        variant="posterPopupTitle"
        sx={{
          color: (theme) => theme.palette.textColor.fontColor,
          mr: "auto",
        }}
      >
        {intl.formatMessage({ id: "bookSendMessageTitle" })}
      </Typography>
      <Typography
        variant="posterDescription"
        sx={{
          color: (theme) => theme.palette.textColor.fontColor,
          mr: "auto",
          mt: "29px",
        }}
      >
        {intl.formatMessage({ id: "bookLessonFailure" })}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: "16px",
          m: "29px auto 0px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleRegister}
          sx={(theme) => theme.button.buttonPopup}
        >
          <Typography variant="posterButton">
            {intl.formatMessage({ id: "header.registration" })}
          </Typography>
        </Button>
        <Typography> {intl.formatMessage({ id: "or" })}</Typography>
        <Button
          variant="outlined"
          onClick={handleSignIn}
          sx={(theme) => theme.button.buttonPopup}
        >
          <Typography
            variant="posterButton"
            sx={{
              color: (theme) => theme.palette.textColor.fontColor,
            }}
          >
            {intl.formatMessage({ id: "header.login" })}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

RequestToSignIn.propTypes = {
  onBackdropClose: PropTypes.func.isRequired,
};

export default RequestToSignIn;
