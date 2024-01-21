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
} from "@mui/material";
import { Aperture } from "react-feather";
import { OneUserChat } from "./OneUserChat";

export const Messages = () => {
  // const dispatch = useDispatch();
  // const messages = useSelector(selectMessages);
  // console.log(messages);
  // const intl = useIntl();

  // useEffect(() => {
  //   dispatch(getUserMessages());
  // }, [dispatch]);

  return (
    <Box sx={{ ml: "20px" }}>
      {/* <Typography variant="h5">
        {intl.formatMessage({ id: "personalAccount.messages" })}
      </Typography> */}
      {messages.length !== 0 ? (
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              width: "320px",
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
                  <ListItem key={chat.userCorrespondenceId.id}>
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
                  // <Divider />
                );
              })}
            </List>
          </Box>
          <OneUserChat />
        </Stack>
      ) : (
        <p> у вас ще немає повідомлень</p>
      )}
    </Box>
  );
};
