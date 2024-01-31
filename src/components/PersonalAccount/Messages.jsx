// import { useEffect } from "react";
// import { useIntl } from "react-intl";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserMessages } from "@/redux/users/operations";
import messages from "../../defaults/conversations.json";
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
  Divider,
} from "@mui/material";
import { Aperture } from "react-feather";
import { ChatWithUser } from "./ChatWithUser";
import { useState } from "react";

export const Messages = () => {
  // const dispatch = useDispatch();
  // const messages = useSelector(selectMessages);
  // console.log(messages);
  // const intl = useIntl();
  const [userChat, setUserChat] = useState("");
  console.log(userChat);

  // useEffect(() => {
  //   dispatch(getUserMessages());
  // }, [dispatch]);

  return (
    <Box sx={{ ml: "20px" }}>
      {messages.length !== 0 ? (
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              width: "320px",
              height: "100vh",
              p: "40px 24px",
              boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)",
            }}
          >
            <List>
              {messages.map((chat) => {
                const sortedMessages = [...chat.messages].sort((a, b) => {
                  return new Date(b.writtedAt) - new Date(a.writtedAt);
                });
                const lastMessage = sortedMessages[0];
                return (
                  <>
                    <ListItem
                      key={chat.userCorrespondenceId.id}
                      onClick={() => {
                        setUserChat(chat);
                      }}
                      sx={{
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
                        secondary={lastMessage.message}
                      />
                    </ListItem>
                    <Divider />
                  </>
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
