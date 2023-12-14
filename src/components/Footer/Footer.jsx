import PhoneNumber from "./PhoneNumber";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import LanguageSwitcher from "../Header/LanguageSwitcher";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/FacebookRounded";

const ExternalLink = ({ to, children, ...rest }) => {
  return (
    <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
      <IconButton
        size="large"
        color="inherit"
        sx={{ color: "white", padding: "3px" }}
      >
        {children}
      </IconButton>
    </a>
  );
};

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
        paddingY: "60px",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "56px",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <Typography
                variant="posterBlack"
                noWrap
                component={Link}
                to="home"
                sx={{
                  display: "flex",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  opacity: "0.9",
                  paddingy: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  "&:hover": {
                    color: (theme) => theme.palette.primary.accent,
                  },
                }}
              >
                Coach&#x26;Couch
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              {/* <LanguageSwitcher /> */}
              {/* <Typography>
                {intl.formatMessage({ id: "footer.text" })}
              </Typography> */}
              <Stack direction="row" spacing={6}>
                <Stack
                  direction="column"
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Typography
                    component="a"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: (theme) => theme.palette.primary.accent,
                      },
                    }}
                  >
                    {intl.formatMessage({ id: "footer.confidential" })}
                  </Typography>
                  <Typography
                    component="a"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: (theme) => theme.palette.primary.accent,
                      },
                    }}
                  >
                    {intl.formatMessage({ id: "footer.conditions" })}
                  </Typography>
                  <Typography
                    component="a"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: (theme) => theme.palette.primary.accent,
                      },
                    }}
                  >
                    {intl.formatMessage({ id: "footer.developers" })}
                  </Typography>
                </Stack>
                <Stack
                  direction="column"
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <PhoneNumber phoneNumber={phoneNumber1} />
                  <PhoneNumber phoneNumber={phoneNumber2} />
                  <Typography
                    component="a"
                    href={`mailto:coachandcouch@gmail.com`}
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      "&:hover": {
                        color: (theme) => theme.palette.primary.accent,
                      },
                    }}
                  >
                    coachandcouch@gmail.com
                  </Typography>
                </Stack>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Typography>
                    {intl.formatMessage({ id: "footer.social" })}
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{
                      display: "flex",
                      gap: "0",
                    }}
                  >
                    <ExternalLink
                      to="https://www.instagram.com"
                      aria-label="Instagram"
                    >
                      <InstagramIcon
                        sx={{
                          color: (theme) => theme.palette.textColor.header,
                          "&:hover": {
                            color: (theme) => theme.palette.primary.accent,
                          },
                        }}
                      />
                    </ExternalLink>
                    <ExternalLink
                      to="https://www.telegram.org"
                      aria-label="Telegram"
                    >
                      <TelegramIcon
                        sx={{
                          padding: "0px",
                          color: (theme) => theme.palette.textColor.header,
                          "&:hover": {
                            color: (theme) => theme.palette.primary.accent,
                          },
                        }}
                      />
                    </ExternalLink>
                    <ExternalLink
                      to="https://www.facebook.com"
                      aria-label="Facebook"
                    >
                      <FacebookIcon
                        sx={{
                          color: (theme) => theme.palette.textColor.header,
                          "&:hover": {
                            color: (theme) => theme.palette.primary.accent,
                          },
                        }}
                      />
                    </ExternalLink>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Stack>
          <Typography>
            {intl.formatMessage({ id: "footer.copyright" })}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
