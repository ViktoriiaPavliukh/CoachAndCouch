import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUserMessages } from "@/redux/users/operations";
import { Box, Stack, Typography } from "@mui/material";
import { ChatWithUser } from "./ChatWithUser";
import { useState, useMemo, useEffect } from "react";
import { ChatList } from "./ChatList";

export const Messages = ({ currentUser, fetchMessages }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [hasReloaded, setHasReloaded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (currentUser === {}) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (
      Array.isArray(fetchMessages) &&
      fetchMessages.length === 0 &&
      !hasReloaded
    ) {
      setHasReloaded(true);
      window.location.reload();
    }
  }, [fetchMessages, hasReloaded]);

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
    <Box
      sx={{
        height: "100%",
        width: { xs: "100%", lg: "1124px", xl: "1604px" },
      }}
    >
      {sortedChats.length !== 0 ? (
        <Stack
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: { xs: "column" },
          }}
        >
          {isChatOpen && userChat ? (
            <ChatWithUser
              user={userChat}
              onClose={onGoBack}
              currentUser={currentUser}
            />
          ) : (
            <ChatList
              isMob
              user={userActive}
              onOpenChat={onOpenChat}
              isChatOpen={isChatOpen}
              setUserChat={setUserChat}
              messages={fetchMessages}
              currentUser={currentUser}
            />
          )}
          {/* <ChatList
            isMob
            user={userActive}
            onOpenChat={onOpenChat}
            setUserChat={setUserChat}
            messages={fetchMessages}
            currentUser={currentUser}
          /> */}
        </Stack>
      ) : (
        <Box
          sx={{
            height: "50%",
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>{intl.formatMessage({ id: "noMessage" })}</Typography>
        </Box>
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
            isChatOpen={isChatOpen}
            setUserChat={setUserChat}
            messages={fetchMessages}
            currentUser={currentUser}
          />
          {userChat && (
            <ChatWithUser user={userChat} currentUser={currentUser} />
          )}
        </Stack>
      ) : (
        <Box
          sx={{
            height: "50%",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>{intl.formatMessage({ id: "noMessage" })}</Typography>
        </Box>
      )}
    </Box>
  );
};
