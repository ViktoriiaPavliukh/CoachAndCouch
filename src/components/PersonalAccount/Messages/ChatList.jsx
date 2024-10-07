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
}) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const bckgrColor = !theme
    ? lightTheme.palette.background.messagesUsers
    : darkTheme.palette.background.messagesUsers;

  const fetchSenderName = (senderId) => {
    dispatch(getUserById(senderId));
    const user = useSelector((state) => selectUserById(state, senderId));
    console.log(user.name);
    return user ? user.name : "Unknown"; // Fallback if user is not found
  };

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
          console.log(chat, "chat");
          const sortedMessages = [...chat.messages].sort((a, b) => {
            return new Date(b.writtedAt) - new Date(a.writtedAt);
          });
          const initialSender = chat.messages[0].text;
          const senderName = extractSenderName(initialSender);
          const lastMessage = chat.messages[chat.messages.length - 1];
          const isSelected = user === lastMessage.senderId;
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

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsersById } from "@/redux/users/operations";
// import { selectUsersState } from "@/redux/users/selectors";
// import { selectTheme } from "@/redux/theme/selectors";
// import { lightTheme, darkTheme } from "../../../styles/theme";
// import { Aperture } from "react-feather";
// import PropTypes from "prop-types";

// export const ChatList = ({
//   isMob,
//   user,
//   onOpenChat,
//   setUserChat,
//   messages,
// }) => {
//   const dispatch = useDispatch();
//   const theme = useSelector(selectTheme);

//   const bckgrColor = !theme
//     ? lightTheme.palette.background.messagesUsers
//     : darkTheme.palette.background.messagesUsers;

//   const [userNames, setUserNames] = useState({}); // To store user names

//   // Fetch all unique sender IDs when messages change
//   useEffect(() => {
//     const uniqueSenderIds = [
//       ...new Set(
//         messages.flatMap((chat) => chat.messages.map((m) => m.senderId))
//       ),
//     ];

//     // Fetch user data only if not already fetched
//     uniqueSenderIds.forEach((id) => {
//       if (!userNames[id]) {
//         dispatch(fetchUsersById(id));
//       }
//     });
//   }, [messages, dispatch, userNames]); // Note: userNames is now a dependency

//   // Fetch user names from Redux and store in local state
//   useEffect(() => {
//     const updatedUserNames = {};
//     messages.forEach((chat) => {
//       chat.messages.forEach((message) => {
//         const fetchedUser = selectUsersState(message.senderId);
//         if (fetchedUser) {
//           updatedUserNames[message.senderId] = fetchedUser.name;
//         }
//       });
//     });
//     setUserNames((prev) => ({ ...prev, ...updatedUserNames }));
//   }, [messages]);

//   const handleSidebarChatClick = (chat) => {
//     setUserChat(chat);
//     if (isMob) {
//       onOpenChat();
//     }
//   };

//   return (
//     <Box
//       sx={{
//         width: "40%",
//         p: {
//           sm: "32px 16px",
//           md: "32px 12px 32px 60px",
//           lg: "40px 12px",
//         },
//         boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)",
//       }}
//     >
//       <List>
//         {messages.map((chat) => {
//           const sortedMessages = [...chat.messages].sort(
//             (a, b) => new Date(b.writtedAt) - new Date(a.writtedAt)
//           );
//           const initialSender = sortedMessages[0]?.senderId;
//           const lastMessage = sortedMessages[sortedMessages.length - 1];
//           const senderName = userNames[initialSender] || "Unknown";

//           const isSelected = user === lastMessage.senderId;

//           return (
//             <React.Fragment key={chat.id}>
//               <ListItem
//                 onClick={() => handleSidebarChatClick(chat)}
//                 sx={{
//                   m: "12px 0",
//                   backgroundColor: isSelected ? bckgrColor : "transparent",
//                   "&:hover": { background: bckgrColor },
//                 }}
//               >
//                 <ListItemAvatar>
//                   <Avatar>
//                     <Aperture />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={senderName}
//                   primaryTypographyProps={{
//                     fontWeight: !lastMessage.isReaded ? "700" : "400",
//                     overflow: "hidden",
//                     whiteSpace: "nowrap",
//                     textOverflow: "ellipsis",
//                   }}
//                   secondary={lastMessage.text}
//                   secondaryTypographyProps={{
//                     fontWeight: !lastMessage.isReaded ? "700" : "400",
//                     overflow: "hidden",
//                     whiteSpace: "nowrap",
//                     textOverflow: "ellipsis",
//                   }}
//                 />
//               </ListItem>
//               <Box
//                 sx={{
//                   borderBottom: "1px solid #9CA3AF",
//                 }}
//               />
//             </React.Fragment>
//           );
//         })}
//       </List>
//     </Box>
//   );
// };

// ChatList.propTypes = {
//   isMob: PropTypes.bool,
//   user: PropTypes.number.isRequired,
//   onOpenChat: PropTypes.func.isRequired,
//   setUserChat: PropTypes.func.isRequired,
//   messages: PropTypes.array.isRequired,
// };
