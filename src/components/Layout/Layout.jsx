import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { lightTheme, darkTheme } from "@/styles";
import { useSelector } from "react-redux";
import { selectTheme } from "@/redux/theme/selectors";
import { Header } from "@components";

export default function Layout() {
  const isDark = useSelector(selectTheme);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}
