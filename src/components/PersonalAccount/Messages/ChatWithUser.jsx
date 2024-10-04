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
import { Aperture, ChevronLeft, MapPin, Send } from "react-feather";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../../../styles/theme";
import { selectTheme } from "@/redux/theme/selectors";
import { PropTypes } from "prop-types";

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
export const ChatWithUser = ({ user, onClose }) => {
  // const [message, setMessage] = useState("");
  const theme = useSelector(selectTheme);
  console.log(user);
  // const [sentMessage, setSentMessage] = useState(null);
  // const dispatch = useDispatch;
  const intl = useIntl();
  // const correspondenceName = user.userCorrespondenceId.name;
  const correspondenceId = user.id;
  // const correspondenceCountry = user.userCorrespondenceId.country;
  const messages = user.messages;

  const sendBtnColor = !theme
    ? lightTheme.palette.buttonColor.send
    : darkTheme.palette.buttonColor.send;

  // const handleSendMessage = async () => {
  //   try {
  //     await dispatch(sendMessageFromUser({ correspondenceId, message }));
  //     setSentMessage({ message: "Your message has been sent." });
  //     setMessage("");
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  // const groupedMessages = messages.reduce((acc, curr) => {
  //   const messageDate = new Date(curr.writtedAt).toLocaleDateString();
  //   if (!acc[messageDate]) {
  //     acc[messageDate] = [];
  //   }
  //   acc[messageDate].push(curr);
  //   return acc;
  // }, {});

  return (
    <Box
      sx={{
        display: "block",
        m: { lg: "32px 55px 0 2px", xl: "26px 90px 32px 32px" },
        width: "100%",
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
        {/* <Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "transparent",
                border: "none",
                marginBottom: "16px",
                color: "inherit",
              }}
            >
              <ChevronLeft />
              <p
                style={{
                  textDecoration: "underline",
                  fontSize: "16px",
                  lineHeight: "150%",
                }}
              >
                {intl.formatMessage({ id: "goBack" })}
              </p>
            </button>
          </Box>
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
                <Typography
                  sx={{ color: (theme) => theme.palette.textColor.remarks }}
                >
                  {correspondenceCountry}
                </Typography>
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
                  background: (theme) => theme.palette.background.messagesDate,
                }}
              >
                {date}
              </Typography>
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
          <IconButton
            sx={{
              borderRadius: "6px",
              border: "2px solid",
              borderColor: (theme) =>
                theme.palette.buttonColorComponentFigma.defaultGreen,
              width: "40px",
              height: "40px",
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
            <Send color={sendBtnColor} />
          </IconButton>
        </Box> */}
      </Box>
    </Box>
  );
};
ChatWithUser.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
};
