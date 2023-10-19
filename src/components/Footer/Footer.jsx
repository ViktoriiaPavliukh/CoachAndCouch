import { AppBar, Container } from "@mui/material";

export default function Footer() {
  return (
    <AppBar position="static" component={"footer"} sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
      <Container
        sx={{
          bottom: 0,
          height: "44px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div>Copyright ...</div>
      </Container>
    </AppBar>
  );
}
