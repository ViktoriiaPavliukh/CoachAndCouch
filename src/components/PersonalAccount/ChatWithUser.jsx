import { sendMessageFromUser } from "@/redux/users/operations";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Aperture, MapPin, Paperclip, Send } from "react-feather";
import { useDispatch } from "react-redux";

const messageItem = {
  maxWidth: "629px",
  borderRadius: "10px",
  mb: "40px",
  p: "8px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
const correspondenceMessageItem = {
  border: "1px solid #498E4C",
  background: (theme) => theme.palette.background.messages,
  mr: "auto",
};
const userMessageItem = {
  background: "#498E4C",
  ml: "auto",
  color: "#FFF",
};

const correspondenceMessages = {
  ...messageItem,
  ...correspondenceMessageItem,
};
const userMessages = {
  ...messageItem,
  ...userMessageItem,
};
export const ChatWithUser = (userChat) => {
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(null);
  const dispatch = useDispatch;
  const correspondenceName = userChat.user.userCorrespondenceId.name;
  const correspondenceId = userChat.user.userCorrespondenceId.id;
  const correspondenceCountry = userChat.user.userCorrespondenceId.country;
  const messages = userChat.user.messages;
  const handleSendMessage = async () => {
    try {
      await dispatch(sendMessageFromUser({ correspondenceId, message }));
      setSentMessage({ message: "Your message has been sent." });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <Box
      sx={{
        pt: "32px",
        pl: "32px",
        pb: "32px",
        pr: "90px",

        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "1142px",
          minHeight: "100%",
          p: "8px",
          boxShadow:
            "0px 8px 16px 0px rgba(0, 0, 0, 0.08), 0px 0px 4px 0px rgba(0, 0, 0, 0.04)",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", gap: "20px", mb: "12px" }}>
            <Avatar
              sx={{
                border: "3px solid #498E4C",
                width: "60px",
                height: "60px",
              }}
            >
              <Aperture />
            </Avatar>
            <Box>
              <Typography> {correspondenceName}</Typography>
              <Box sx={{ display: "flex", gap: "8px", mt: "8px" }}>
                <MapPin />
                <Typography>{correspondenceCountry}</Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
        </Box>
        <List>
          {messages.map((message) => {
            const date = new Date(message.writtedAt);
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();
            const messageTime = `${hours}:${minutes}`;
            return (
              <ListItem
                key={message.id}
                sx={
                  message.userSender === correspondenceId
                    ? correspondenceMessages
                    : userMessages
                }
              >
                <ListItemText primary={message.message} sx={{ mr: "auto" }} />
                <ListItemText primary={messageTime} sx={{ ml: "auto" }} />
              </ListItem>
            );
          })}
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "12px",
            border: "1px solid #498E4C",
            padding: "8px 25px",
          }}
        >
          <Input
            variant="text"
            placeholder="Напишіть повідомлення"
            disableUnderline
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Box>
            <InputLabel
              htmlFor="file-input"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "25px",
                height: "25px",
              }}
            >
              <Paperclip
                style={{
                  transform: "rotate(-45deg)",
                  color: (theme) => theme.palette.buttonColor.send,
                }}
              />
            </InputLabel>
            <Input type="file" id="file-input" style={{ display: "none" }} />
          </Box>
          <IconButton
            sx={{
              borderRadius: "6px",
              border: "1px solid #498E4C",
              minWidth: "37px",
              height: "34px",
              p: "8px",
              ml: "18px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleSendMessage}
          >
            <Send
              style={{
                transform: "rotate(45deg)",
                color: (theme) => theme.palette.buttonColor.send,
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
