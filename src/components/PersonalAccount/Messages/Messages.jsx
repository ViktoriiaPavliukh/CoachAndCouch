import { useDispatch, useSelector } from "react-redux";
import { getUserMessages } from "@/redux/users/operations";
import { selectMessages } from "@/redux/users/selectors";
import { Box, Stack } from "@mui/material";
import { ChatWithUser } from "./ChatWithUser";
import { useEffect, useState, useMemo } from "react";
import { ChatList } from "./ChatList";
import { selectUser } from "@/redux/auth/selectors";

export const Messages = ({ currentUser, fetchMessages }) => {
  const dispatch = useDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);
  console.log(currentUser);
  console.log(fetchMessages);
  const uniqueIds = new Set();
  if (fetchMessages) {
    fetchMessages.forEach((conversation) => {
      console.log(conversation);
      conversation.messages.forEach((message) => {
        console.log(message);
        if (message.senderId !== message.receiverId) {
          uniqueIds.add(message.senderId);
        }
      });
    });
  }

  const result = Array.from(uniqueIds);

  const sortedChats = useMemo(() => {
    return [...fetchMessages].sort((a, b) => {
      const lastMessageA = a.messages[a.messages.length - 1];
      const lastMessageB = b.messages[b.messages.length - 1];

      if (lastMessageA && lastMessageB) {
        return (
          new Date(lastMessageB.writtedAt) - new Date(lastMessageA.writtedAt)
        );
      }
      if (lastMessageA) return -1;
      if (lastMessageB) return 1;
      return 0;
    });
  }, [fetchMessages]);
  const [userChat, setUserChat] = useState(
    sortedChats.length > 0 ? sortedChats[0] : null
  );

  const getLastMessage = (messages) => {
    return messages.length > 0 ? messages[messages.length - 1] : null;
  };

   const lastMessage = useMemo(() => {
     return userChat?.messages?.length > 0
       ? userChat.messages[userChat.messages.length - 1]
       : null;
   }, [userChat]);
   
  const userActive = lastMessage ? lastMessage.senderId : null;

  const onGoBack = () => {
    setIsChatOpen(false);
  };
  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
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
              messages={fetchMessages}
            />
          )}
          <ChatList
            isMob
            user={userActive}
            onOpenChat={onOpenChat}
            setUserChat={setUserChat}
            messages={fetchMessages}
          />
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
            messages={fetchMessages}
          />
          {userChat && (
            <ChatWithUser user={userChat} currentUser={currentUser} />
          )}
        </Stack>
      ) : (
        <p> у вас ще немає повідомлень</p>
      )}
    </Box>
  );
};
