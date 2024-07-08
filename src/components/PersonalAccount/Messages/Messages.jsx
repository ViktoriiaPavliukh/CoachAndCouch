import { useDispatch, useSelector } from "react-redux";
import { getUserMessages } from "@/redux/users/operations";
import messages from "../../../defaults/conversations.json";
import { selectMessages } from "@/redux/users/selectors";
import { Box, Stack } from "@mui/material";

import { ChatWithUser } from "./ChatWithUser";
import { useEffect, useState } from "react";
import { ChatList } from "./ChatList";
import { selectUser } from "@/redux/auth/selectors";

const sortedChats = messages.sort((a, b) => {
  const lastMessageA = a.messages[a.messages.length - 1];
  const lastMessageB = b.messages[b.messages.length - 1];
  if (lastMessageA && lastMessageB) {
    return new Date(lastMessageB.writtedAt) - new Date(lastMessageA.writtedAt);
  }
  if (lastMessageA) {
    return -1;
  } else if (lastMessageB) {
    return 1;
  }
  return 0;
});

export const Messages = () => {
  const fetchMessages = useSelector(selectMessages);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [userChat, setUserChat] = useState(sortedChats[0]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const userActive = userChat.userCorrespondenceId.id;

  const uniqueIds = new Set();

  fetchMessages.forEach((conversation) => {
    conversation.messages.forEach((message) => {
      if (message.senderId !== 12) {
        uniqueIds.add(message.senderId);
      }
      if (message.receiverId !== 12) {
        uniqueIds.add(message.receiverId);
      }
    });
  });

  const result = Array.from(uniqueIds);
  console.log(result);

  console.log(fetchMessages);

  const sortedChats2 = fetchMessages.sort((a, b) => {
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

  console.log(sortedChats2);

  const onGoBack = () => {
    setIsChatOpen(false);
  };
  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  useEffect(() => {
    dispatch(getUserMessages());
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {sortedChats.length !== 0 ? (
        <Stack
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: { xs: "column" },
          }}
        >
          {isChatOpen && userChat ? (
            <ChatWithUser user={userChat} onClose={onGoBack} />
          ) : (
            <ChatList
              isMob
              user={userActive}
              onOpenChat={onOpenChat}
              setUserChat={setUserChat}
            />
          )}
        </Stack>
      ) : (
        <p> у вас ще немає повідомлень</p>
      )}
      {sortedChats.length !== 0 ? (
        <Stack
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: { md: "row" },
            justifyContent: { md: "center" },
          }}
        >
          <ChatList
            user={userActive}
            onOpenChat={onOpenChat}
            setUserChat={setUserChat}
          />
          {userChat && <ChatWithUser user={userChat} />}
        </Stack>
      ) : (
        <p> у вас ще немає повідомлень</p>
      )}
    </Box>
  );
};
