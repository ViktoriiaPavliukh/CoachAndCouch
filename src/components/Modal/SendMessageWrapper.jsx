import { useState } from "react";
import { PropTypes } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";
import { sendMessageFromUser } from "../../redux/users/operations";
import { Box, Button, Snackbar, Alert, Typography, Input } from "@mui/material";
import { useIntl } from "react-intl";
import { X } from "react-feather";

const labelStyle = {
  marginRight: "auto",
  marginBottom: "8px",
  color: (theme) => theme.palette.textColor.fontColor,
  marginTop: "16px",
  textTransform: "none",
};
const textInputStyle = {
  width: "100%",
  borderRadius: "8px",
  padding: "8px 16px",
  border: "1px solid #D1D5DB",
  color: (theme) => theme.palette.textColor.fontColor,

  "& textarea::placeholder": {
    opacity: "1",
  },
};
export const SendMessageWrapper = ({ id, onBackdropClose }) => {
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const user = useSelector(selectUser);
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    try {
      await dispatch(sendMessageFromUser({ id, message }));
      setSentMessage({ message: "Your message has been sent." });
      setMessage("");
      setSnackbarOpen(true);
      navigate(`/teachers/${id}`);
      onBackdropClose();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        p: "20px 40px",
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
      {user.id ? (
        <>
          <Typography
            variant="posterPopupTitle"
            sx={{
              color: (theme) => theme.palette.textColor.fontColor,
              mr: "auto",
            }}
          >
            {intl.formatMessage({ id: "sendMessageTitle" })}
          </Typography>
          <Typography variant="posterButton" sx={labelStyle}>
            {intl.formatMessage({ id: "messageSubject" })}
          </Typography>
          <Input
            variant="text"
            placeholder={intl.formatMessage({ id: "messageSubject" })}
            multiline
            disableUnderline
            sx={textInputStyle}
          />
          <Typography variant="posterButton" sx={labelStyle}>
            {intl.formatMessage({ id: "messageEnterBody" })}
          </Typography>
          <Input
            variant="text"
            placeholder={intl.formatMessage({ id: "messageBody" })}
            multiline
            disableUnderline
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={textInputStyle}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: "16px",
              ml: "auto",
              mr: { xs: "auto", md: "0" },
              mt: "29px",
            }}
          >
            <Button
              variant="outlined"
              sx={(theme) => theme.button.buttonPopup}
              onClick={onBackdropClose}
            >
              <Typography
                variant="posterButton"
                sx={{
                  color: (theme) => theme.palette.textColor.fontColor,
                }}
              >
                {intl.formatMessage({ id: "cancelBtn" })}
              </Typography>
            </Button>
            <Button
              variant="contained"
              onClick={handleSendMessage}
              sx={(theme) => theme.button.buttonPopup}
            >
              <Typography variant="posterButton">
                {intl.formatMessage({ id: "sendBtn" })}
              </Typography>
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography
            variant="posterPopupTitle"
            sx={{
              color: (theme) => theme.palette.textColor.fontColor,
              mr: "auto",
            }}
          >
            {intl.formatMessage({ id: "loginSendMessageTitle" })}
          </Typography>
          <Typography
            variant="posterDescription"
            sx={{
              color: (theme) => theme.palette.textColor.fontColor,
              mr: "auto",
              mt: "29px",
            }}
          >
            {intl.formatMessage({ id: "loginSendMessageSubject" })}
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
              onClick={() => navigate("/registration")}
              sx={(theme) => theme.button.buttonPopup}
            >
              <Typography variant="posterButton">
                {intl.formatMessage({ id: "header.registration" })}
              </Typography>
            </Button>
            <Typography> {intl.formatMessage({ id: "or" })}</Typography>
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
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
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {sentMessage?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
SendMessageWrapper.propTypes = {
  id: PropTypes.number.isRequired,
  onBackdropClose: PropTypes.func.isRequired,
};
