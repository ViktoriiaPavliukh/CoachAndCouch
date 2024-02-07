import React, { useEffect } from "react";
// import { useIntl } from "react-intl";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserMessages } from "@/redux/users/operations";
import messages from "../../../defaults/conversations.json";
// import { selectMessages } from "@/redux/users/selectors";
import {
  Box,
  // Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
} from "@mui/material";
import { Aperture } from "react-feather";
import { ChatWithUser } from "./ChatWithUser";
import { useState } from "react";

export const Messages = () => {
  // const dispatch = useDispatch();
  // const messages = useSelector(selectMessages);
  // const intl = useIntl();
  const [userChat, setUserChat] = useState("");

  const sortedChats = messages.sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];
    if (lastMessageA && lastMessageB) {
      return (
        new Date(lastMessageB.writtedAt) - new Date(lastMessageA.writtedAt)
      );
    }
    if (lastMessageA) {
      return -1;
    } else if (lastMessageB) {
      return 1;
    }
    return 0;
  });
  useEffect(() => {
    setUserChat(sortedChats[0]);
    // dispatch(getUserMessages());
  }, []);

  return (
    <Box sx={{ ml: "20px" }}>
      {sortedChats.length !== 0 ? (
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              width: "320px",
              height: "100vh",
              p: "40px 12px",
              boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)",
            }}
          >
            <List>
              {messages.map((chat) => {
                console.log(chat);
                const sortedMessages = [...chat.messages].sort((a, b) => {
                  return new Date(b.writtedAt) - new Date(a.writtedAt);
                });
                const lastMessage = sortedMessages[0];
                const isSelected = userChat === chat;
                return (
                  <React.Fragment key={chat.userCorrespondenceId.id}>
                    <ListItem
                      onClick={() => {
                        setUserChat(chat);
                      }}
                      sx={{
                        m: "12px 0",

                        backgroundColor: isSelected ? "#D1D5DB" : "transparent",
                        "&:hover": { background: "#F3F4F6" },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <Aperture />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={chat.userCorrespondenceId.name}
                        primaryTypographyProps={{
                          fontWeight: !lastMessage.isReaded ? "700" : "400",
                        }}
                        secondary={lastMessage.message}
                        secondaryTypographyProps={{
                          fontWeight: !lastMessage.isReaded ? "700" : "400",
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
          {userChat && <ChatWithUser user={userChat} />}
        </Stack>
      ) : (
        <p> у вас ще немає повідомлень</p>
      )}
    </Box>
  );
};
