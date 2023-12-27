import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getUserMessages } from "@/redux/users/operations";
import { selectMessages } from "@/redux/users/selectors";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export const Messages = () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const intl = useIntl();

  useEffect(() => {
    dispatch(getUserMessages());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">
        {intl.formatMessage({ id: "personalAccount.messages" })}
      </Typography>
      <List>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText
              primary={message.message}
              secondary={new Date(message.writtedAt).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
