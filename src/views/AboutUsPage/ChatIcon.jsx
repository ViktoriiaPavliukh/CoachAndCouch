import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import greenChat from "@assets/icons/chat_icon_green.svg";
import yellowChat from "@assets/icons/chat_icon_yellow.svg";

export function ChatIcon() {
  const theme = useTheme();
  const chatImage = theme.palette.mode === "dark" ? yellowChat : greenChat;

  return (
    <Box
      component="img"
      src={chatImage}
      alt="chat image"
      sx={{
        display: "flex",
        width: { xs: "48px" },
      }}
    />
  );
}
