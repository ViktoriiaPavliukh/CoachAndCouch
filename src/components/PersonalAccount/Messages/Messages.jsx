import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserMessages } from "@/redux/users/operations";
import { selectMessages } from "@/redux/users/selectors";
import { Box, Stack } from "@mui/material";

import { ChatWithUser } from "./ChatWithUser";
import { ChatList } from "./ChatList";
import { selectUser } from "@/redux/auth/selectors";

export const Messages = () => {
  const fetchedMessages = useSelector(selectMessages);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [userChat, setUserChat] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const userActive =
    userChat &&
    userChat.messages.find((conversation) => {
      if (conversation.senderId !== user.id) {
        conversation.senderId;
      } else {
        conversation.receiverId;
      }
    });

  console.log(allChats);
  // const uniqueIds = new Set();

  // fetchedMessages.forEach((conversation) => {
  //   conversation.messages.forEach((message) => {
  //     if (message.senderId !== user.id) {
  //       uniqueIds.add(message.senderId);
  //     }
  //     if (message.receiverId !== user.id) {
  //       uniqueIds.add(message.receiverId);
  //     }
  //   });
  // });

  // const result = Array.from(uniqueIds);
  // console.log(result);

  const onGoBack = () => {
    setIsChatOpen(false);
  };
  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  useEffect(() => {
    dispatch(getUserMessages());
  }, [dispatch]);

  useEffect(() => {
    if (fetchedMessages.length > 0) {
      const sortedChats = [...fetchedMessages].sort((a, b) => {
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

      console.log(sortedChats[0]);
      setUserChat(sortedChats[0]);
      setAllChats(sortedChats);
    }
  }, [fetchedMessages]);

  return (
    <Box sx={{ width: "100%" }}>
      {allChats.length !== 0 ? (
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
      {allChats.length !== 0 ? (
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
