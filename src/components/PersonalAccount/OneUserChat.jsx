import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import { Aperture, MapPin } from "react-feather";

export const OneUserChat = () => {
  return (
    <Box sx={{ pt: "32px", pl: "32px" }}>
      <Paper sx={{ width: "839px", minHeight: "100%", pt: "8px", pl: "8px" }}>
        <Box sx={{ display: "flex", gap: "20px", mb: "12px" }}>
          <Avatar
            sx={{ border: "3px solid #498E4C", width: "60px", height: "60px" }}
          >
            <Aperture />
          </Avatar>
          <Box>
            <Typography>Name LastName</Typography>
            <Box sx={{ display: "flex", gap: "8px", mt: "8px" }}>
              <MapPin />
              <Typography>Austria</Typography>
            </Box>
          </Box>
        </Box>

        <Divider />
      </Paper>
    </Box>
  );
};
