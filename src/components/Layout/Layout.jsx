import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { lightTheme, darkTheme } from "@/styles";
import { useSelector } from "react-redux";
import { selectTheme } from "@/redux/theme/selectors";
import { Header } from "@components";
import Footer from "../Footer/Footer";

export default function Layout() {
  const isDark = useSelector(selectTheme);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline enableColorScheme />

      <Header />
      <Container
        sx={{
          padding: { xs: "0 16px", md: "0 23px" },
          border: "1px solid red",
          backgroundColor: "background",
          display: "flex",
          justifyContent: "center",
          maxWidth: "100vw",
          minWidth: "320px",
          minHeight: "100vh",
        }}
        component="div"
      >
        <Outlet />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
