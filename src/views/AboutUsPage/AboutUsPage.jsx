import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Link, useLocation } from "react-router-dom";
import { Container, Typography, Stack, Button, Box } from "@mui/material";

export function AboutUsPage() {
  const intl = useIntl();
  const [pathname, setPathname] = useState("");
  const path = useLocation().pathname;
  useEffect(() => {
    setPathname(path);
  }, [path]);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Typography>{intl.formatMessage({ id: "header.aboutUs" })}</Typography>
      <Stack>
        <Typography>Coach&Couch </Typography>
        <Typography>{intl.formatMessage({ id: "aboutText1" })}</Typography>
        <Typography>{intl.formatMessage({ id: "aboutText2" })}</Typography>
        <Typography>{intl.formatMessage({ id: "aboutText3" })}</Typography>
        <Typography>{intl.formatMessage({ id: "aboutUpper" })}</Typography>
        {!isLoggedIn && (
          <Box>
            <Button
              component={Link}
              to="/registration"
              sx={{
                px: "12px",
                transition: "color 0.3s",
                borderRadius: "6px",
                backgroundColor: (theme) =>
                  pathname === "/registration"
                    ? theme.palette.primary.accent
                    : null,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.accent,
                  color: "white",
                },
              }}
            >
              {" "}
              <Typography>
                {intl.formatMessage({ id: "header.registration" })}
              </Typography>
            </Button>
            <Button
              component={Link}
              to="/login"
              sx={{
                px: "12px",
                transition: "color 0.3s",
                borderRadius: "6px",
                backgroundColor: (theme) =>
                  pathname === "/login" ? theme.palette.primary.accent : null,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.accent,
                  color: "white",
                },
              }}
            >
              {" "}
              <Typography>
                {intl.formatMessage({ id: "header.login" })}
              </Typography>
            </Button>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
