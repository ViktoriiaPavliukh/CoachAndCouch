import PhoneNumber from "./PhoneNumber";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Paper, Stack } from "@mui/material";
import LanguageSwitcher from "../Header/LanguageSwitcher";
import { useIntl } from "react-intl";

export default function Footer() {
  const phoneNumber1 = "+38(093) 033 80 21";
  const phoneNumber2 = "+38(067) 587 04 55";

  const intl = useIntl();
  return (
    <Paper
      elevation={3}
      component={"footer"}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        paddingY: "44px",
      }}
    >
      <Container
        sx={{
          bottom: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <Stack direction="row" spacing={2}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="home"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                opacity: "0.9",
              }}
            >
              Coach&#x26;Couch
            </Typography>
            <LanguageSwitcher />
          </Stack>
          <Typography>{intl.formatMessage({ id: "footer.text" })}</Typography>
          <Stack direction="row" spacing={6}>
            <Stack>
              <PhoneNumber phoneNumber={phoneNumber1} />
              <PhoneNumber phoneNumber={phoneNumber2} />
              <Typography
                component="a"
                href={`mailto:coachandcouch@gmail.com`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                coachandcouch@gmail.com
              </Typography>
            </Stack>
            <Typography>{intl.formatMessage({ id: "footer.social" })}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>{intl.formatMessage({ id: "footer.confidential" })}</Typography>
            <Typography>{intl.formatMessage({ id: "footer.conditions" })}</Typography>
            <Typography>{intl.formatMessage({ id: "footer.developers" })}</Typography>
          </Stack>
          <Typography>{intl.formatMessage({ id: "footer.copyright" })}</Typography>
        </Box>
      </Container>
      {/* </AppBar> */}
    </Paper>
  );
}
