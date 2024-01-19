import { useState } from "react";
import { PropTypes } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";
import { sendMessageFromUser } from "../../redux/users/operations";
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Link,
  Typography,
  InputLabel,
  Input,
} from "@mui/material";
import { useIntl } from "react-intl";

const labelStyle = {
  marginRight: "auto",
  marginBottom: "8px",
  fontSize: "14px",
  color: "#1F2937",
  lineHeight: "1.43",
  marginTop: "16px",
};
const textInputStyle = {
  width: "100%",
  borderRadius: "8px",
  padding: "8px 16px",
  border: "1px solid #D1D5DB",
  color: "#1F2937",
  fontSize: "18px",
  lineHeight: "1.56",
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
        width: "670px",
        // height: "500px",
        position: "absolute",
        top: "50%",
        left: "50%",
        background: "white",
        transform: "translate(-50%,-50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: "20px 40px",
        color: "#D1D5DB",
      }}
    >
      {user.id ? (
        <>
          <Typography
            sx={{
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "1.4",
              color: "#000",
              mr: "auto",
            }}
          >
            {intl.formatMessage({ id: "sendMessageTitle" })}
          </Typography>
          <InputLabel sx={labelStyle}>
            {intl.formatMessage({ id: "messageSubject" })}
          </InputLabel>
          <Input
            placeholder={intl.formatMessage({ id: "messageSubject" })}
            multiline
            disableUnderline
            sx={textInputStyle}
          />
          <InputLabel sx={labelStyle}>
            {intl.formatMessage({ id: "messageEnterBody" })}
          </InputLabel>
          <Input
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
              gap: "16px",
              ml: "auto",
              mt: "29px",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                // border: "1px solid #0E5B1D",
                borderRadius: "8px",
                color: "#000",
                minWidth: "180px",
                p: "14px 20px",
                fontSize: "12px",
                lineHeight: "1.33",
              }}
              onClick={onBackdropClose}
            >
              {intl.formatMessage({ id: "cancelBtn" })}
            </Button>
            <Button
              variant="contained"
              // color="primary"
              onClick={handleSendMessage}
              sx={{
                p: "14px 20px",
                borderRadius: "8px",
                minWidth: "180px",
                fontSize: "12px",
                lineHeight: "1.33",
              }}
            >
              {intl.formatMessage({ id: "sendBtn" })}
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography color="primary">
            To send a message, please
            <Link
              component={ReactLink}
              to="/login"
              variant="body2"
              align="center"
              sx={{ textAlign: "center", mt: 2, display: "block" }}
            >
              log in
            </Link>
            or
            <Link
              component={ReactLink}
              to="/registration"
              variant="body2"
              align="center"
              sx={{ textAlign: "center", mt: 2, display: "block" }}
            >
              register
            </Link>
          </Typography>
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
