// teacher/Messages.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherMessages } from "@/redux/teacher/operations";
// import { selectTeacherMessages } from "@/redux/teacher/selectors";
import { Box, Typography } from "@mui/material";

export const Messages = ({ teacherId }) => {
  const dispatch = useDispatch();

  // Assuming getTeacherMessages is an action that directly updates the Redux store
  useEffect(() => {
    dispatch(getTeacherMessages(teacherId));
  }, [dispatch, teacherId]);

  // const messages = useSelector((state) => state.teacher.messages);

  // console.log(messages);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography>Teacher Messages</Typography>
      {/* {messages.length === 0 ? (
        <Typography>No messages available.</Typography>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>{message.text}</li>
            // Render other message details as needed...
          ))}
        </ul>
      )} */}
    </Box>
  );
};
