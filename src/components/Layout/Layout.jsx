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
          backgroundColor: "background",
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
        }}
        component="div"
        maxWidth="100ww"
      >
        <Outlet />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
