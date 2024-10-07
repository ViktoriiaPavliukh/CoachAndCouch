import React, { useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "@/redux/users/operations";
import { selectUserById } from "@/redux/users/selectors";
import { selectTheme } from "@/redux/theme/selectors";
import { lightTheme, darkTheme } from "../../../styles/theme";
import { Aperture } from "react-feather";
import { PropTypes } from "prop-types";

export const ChatList = ({
  isMob,
  user,
  onOpenChat,
  setUserChat,
  messages,
  currentUser,
}) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  console.log(currentUser);
  const bckgrColor = !theme
    ? lightTheme.palette.background.messagesUsers
    : darkTheme.palette.background.messagesUsers;

  // const fetchSenderName = (correspondenceId) => {
  //   // Dispatch to fetch user data based on correspondenceId
  //   dispatch(getUserById(correspondenceId));
  //   const user = useSelector((state) =>
  //     selectUserById(state, correspondenceId)
  //   );
  //   return user ? user.name : "Unknown"; // Fallback if user is not found
  // };

  const extractSenderName = (messageText) => {
    const greeting = "Hi I am ";
    const startIndex = messageText.indexOf(greeting);
    if (startIndex !== -1) {
      const startOfName = startIndex + greeting.length;
      const endOfName = messageText.indexOf(",", startOfName);
      if (endOfName !== -1) {
        const name = messageText.substring(startOfName, endOfName).trim();
        return name.split(" ")[0]; // Return only the first name
      }
    }
    return null; // Return null or a fallback value if the name isn't found
  };

  const handleSidebarChatClick = (chat) => {
    setUserChat(chat);
    isMob && onOpenChat();
  };

  return (
    <Box
      sx={{
        width: "40%",

        p: {
          sm: "32px 16px",
          md: "32px 12px 32px 60px",
          lg: "40px 12px",
        },
        boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <List>
        {messages.map((chat) => {
          const sortedMessages = [...chat.messages].sort((a, b) => {
            return new Date(b.writtedAt) - new Date(a.writtedAt);
          });
          console.log(chat);
          const initialSender = sortedMessages[sortedMessages.length-1].text;
          const senderName = extractSenderName(initialSender);
          const correspondenceId =
            sortedMessages[0].senderId === currentUser.id
              ? sortedMessages[0].receiverId
              : sortedMessages[0].senderId;
          console.log(correspondenceId);

          // const senderName = fetchSenderName(correspondenceId);
          const lastMessage = sortedMessages[0];
          const isSelected = user === lastMessage;
          return (
            <React.Fragment key={chat.id}>
              <ListItem
                onClick={() => handleSidebarChatClick(chat)}
                sx={{
                  m: "12px 0",
                  backgroundColor: isSelected ? bckgrColor : "transparent",
                  "&:hover": { background: bckgrColor },
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Aperture />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={senderName}
                  primaryTypographyProps={{
                    fontWeight: !lastMessage.isReaded ? "700" : "400",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  secondary={lastMessage.text}
                  secondaryTypographyProps={{
                    fontWeight: !lastMessage.isReaded ? "700" : "400",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                />
              </ListItem>
              <Box
                sx={{
                  borderBottom: "1px solid #9CA3AF",
                }}
              />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

ChatList.propTypes = {
  isMob: PropTypes.bool,
  user: PropTypes.number.isRequired,
  onOpenChat: PropTypes.func.isRequired,
  setUserChat: PropTypes.func.isRequired,
};
