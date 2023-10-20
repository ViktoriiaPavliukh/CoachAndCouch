import { AppBar, Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <AppBar position="static" component={"footer"} sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
      <Container
        sx={{
          bottom: 0,

          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            width: "300px",
          }}
        >
          <h3>Контакти</h3>
          <Typography>м.Київ, вул. Еспланадна, 8/10, 01601 </Typography>
          <Typography>контактний телефон - (044) 289 35 60</Typography>
          <Typography> Email : press@mlsp.gov.ua </Typography>
        </Box>
        <div> &copy; 2023 Команда Marketplace, Teamchallenge</div>
      </Container>
    </AppBar>
  );
}
