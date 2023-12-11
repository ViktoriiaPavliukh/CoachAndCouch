import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { selectUser } from "../../redux/auth/selectors";
import { sendMessageFromUser } from "../../redux/user/operations";
import { Box, TextField, Button, Snackbar, Alert, Link } from "@mui/material";

export const SendMessageWrapper = () => {
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const user = useSelector(selectUser);

  const handleSendMessage = async () => {
    try {
      await sendMessageFromUser({ userId: user.id, message });

      setSentMessage({ message: "Your message has been sent." });
      setMessage("");
      setSnackbarOpen(true);
      console.log(message);
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
        width: "500px",
        height: "500px",
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: "white",
        transform: "translate(-50%,-50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      {user.id ? (
        <>
          <TextField
            label="Type your message"
            multiline
            rows={4}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ marginBottom: "16px", width: "100%" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            Send Message
          </Button>
        </>
      ) : (
        <>
          <p>
            To send a message, please{" "}
            <Link
              component={ReactLink}
              to="/login"
              variant="body2"
              align="center"
              sx={{ textAlign: "center", mt: 2, display: "block" }}
            >
              log in
            </Link>{" "}
            or{" "}
            <Link
              component={ReactLink}
              to="/registration"
              variant="body2"
              align="center"
              sx={{ textAlign: "center", mt: 2, display: "block" }}
            >
              register
            </Link>
            .
          </p>
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
