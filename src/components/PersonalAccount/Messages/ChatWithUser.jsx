import { sendMessageFromUser } from "@/redux/users/operations";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Aperture, MapPin, Send } from "react-feather";
import { useDispatch } from "react-redux";

const messageItem = {
  width: { xs: "300px", md: "350px", lg: "466px" },
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
  const groupedMessages = messages.reduce((acc, curr) => {
    const messageDate = new Date(curr.writtedAt).toLocaleDateString();
    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }
    acc[messageDate].push(curr);
    return acc;
  }, {});

  return (
    <Box
      sx={{
        display: "block",
        m: { lg: "32px 55px 0 2px", xl: "26px 90px 32px 32px" },
        width: { xs: "100%", md: "446px", lg: "855px", xl: "1142px" },
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100%",
          p: { xs: "32px 16px", md: "32px 8px", lg: "8px" },
          boxShadow:
            "0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.04)",
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
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <Box key={date}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              <Typography
                sx={{
                  display: "inline",
                  fontSize: "14px",
                  lineHeight: "1.43",
                  borderRadius: "16px",
                  padding: "4px 8px",
                  background: "#f3f4f6",
                }}
              >
                {date}
              </Typography>
            </Box>
            <List>
              {messages.map((message) => {
                const date = new Date(message.writtedAt);
                console.log(date);
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
                    <ListItemText
                      primary={message.message}
                      sx={{
                        mr: "auto",
                        mt: "0",
                        mb: "0",
                      }}
                      primaryTypographyProps={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "1.42857",
                      }}
                    />
                    <ListItemText
                      primary={messageTime}
                      sx={{
                        ml: "auto",
                        mt: "0",
                        mb: "0",
                      }}
                      primaryTypographyProps={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "1.42857",
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
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
            <Input type="file" id="file-input" style={{ display: "none" }} />
          </Box>
          <IconButton
            sx={{
              borderRadius: "6px",
              border: "2px solid",
              borderColor: (theme) =>
                theme.palette.buttonColorComponentFigma.defaultGreen,
              color: "inherit",
              minWidth: "37px",
              height: "34px",
              p: "8px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                borderColor: (theme) =>
                  theme.palette.buttonColorComponentFigma.hoverGreen,
                background: "transparent",
              },
            }}
            onClick={handleSendMessage}
          >
            <Send sx={{ stroke: (theme) => theme.palette.buttonColor.send }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
