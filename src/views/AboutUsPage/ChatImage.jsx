import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import chatLight from "@assets/images/chat_light.webp";
import chatDark from "@assets/images/chat_dark.webp";

export function ChatImage() {
  const theme = useTheme();
  const chatImage = theme.palette.mode === "dark" ? chatDark : chatLight;

  return (
    <Box
      component="img"
      loading="lazy"
      src={chatImage}
      alt="chat profile"
      sx={{
        width: "100%",
        pt: { xs: "18px", md: "23px", xl: "38px" },
      }}
    />
  );
}
