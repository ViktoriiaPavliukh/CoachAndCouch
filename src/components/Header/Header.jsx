import { PropTypes } from "prop-types";
import { useIntl } from "react-intl";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Stack,
  MenuItem,
  Paper,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TelegramIcon from "@mui/icons-material/Telegram";
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { pages } from "@/defaults";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeTheme } from "@/redux/theme/slice";
import { GreenSwitch } from "../GreenSwitch/GreenSwitch";
import { styled } from "@mui/material/styles";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./../Logo";

const MenuMobItem = styled(MenuItem)(() => ({
  "& :hover": {
    color: "white",
  },
  "& .MuiMenuItem-root": {
    color: "white",
  },
  "& .MuiTypography-root": {
    padding: "8px 12px",
  },
}));

const ExternalLink = ({ to, children, ...rest }) => {
  return (
    <Link to={to} sx={{ color: "white", padding: "px" }}>
      <IconButton
        size="large"
        color="inherit"
        sx={{ color: "white", padding: "3px" }}
        {...rest}
      >
        {children}
      </IconButton>
    </Link>
  );
};

export function Header() {
  const user = useSelector(selectUser);
  const [pathname, setPathname] = useState("");
  const [checked, setChecked] = useState(true);
  const path = useLocation().pathname;
  const intl = useIntl();
  useEffect(() => {
    setPathname(path);
  }, [path]);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    setAnchorElNav(null);
    navigate(link);
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    setAnchorElNav(null);

    navigate("/");
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(changeTheme());
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        padding: { sm: "0 16px", md: "0 60px", lg: "21px 60px" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: (theme) => theme.palette.textColor.header,
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOpenNavMenu}
            sx={{ display: { xs: "flex", lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Logo width="130px" />
          <Box
            sx={{
              // flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              gap: "56px",
            }}
          >
            {pages.slice(7, 10).map(({ title, link }) => (
              <Button
                key={title.props.id}
                onClick={() => {
                  handleCloseNavMenu(link);
                }}
                sx={{
                  fontSize: "18px",
                  lineHeight: "28px",
                  fontWeight: 400,
                  color: (theme) =>
                    pathname === `/${link}` || pathname === `${link}`
                      ? theme.palette.textColor.black
                      : theme.palette.textColor.header,
                  display: "block",
                  textTransform: "lowercase",
                  "&:first-letter": {
                    textTransform: "capitalize",
                  },
                  transition: "color 0.3s",
                  backgroundColor: (theme) =>
                    pathname === `/${link}` || pathname === `${link}`
                      ? theme.palette.buttonColor.header
                      : null,
                  "&:hover": {
                    color: (theme) => theme.palette.primary.accent,
                  },
                }}
              >
                {title}
              </Button>
            ))}
          </Box>
          {/* <Stack
            direction="row"
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: "0",
            }}
          >
            <ExternalLink to="https://www.instagram.com" aria-label="Instagram">
              <InstagramIcon
                sx={{
                  color: (theme) => theme.palette.textColor.header,
                  "&:hover": {
                    color: (theme) => theme.palette.primary.accent,
                  },
                }}
              />
            </ExternalLink>
            <ExternalLink to="https://www.telegram.org" aria-label="Telegram">
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
            <ExternalLink to="https://www.facebook.com" aria-label="Facebook">
              <FacebookRoundedIcon
                sx={{
                  color: (theme) => theme.palette.textColor.header,
                  "&:hover": {
                    color: (theme) => theme.palette.primary.accent,
                  },
                }}
              />
            </ExternalLink>
          </Stack> */}
          <Stack direction="row" sx={{ display: { xs: "none", lg: "flex" } }}>
            <GreenSwitch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <LanguageSwitcher />
            {isLoggedIn ? (
              <Box display="flex" direction="row" sx={{ gap: "24px" }}>
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu(`/user/${user.id}/profile`);
                  }}
                  user={user}
                  sx={{
                    "&:hover": {
                      color: (theme) => theme.palette.primary.accent,
                    },
                  }}
                >
                  <PeopleAltOutlinedIcon sx={{ mr: "12px" }} />
                  <Box sx={{ padding: "0" }}>{user.firstName}</Box>
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    px: "12px",
                    borderColor: (theme) => theme.palette.primary.accent,
                    borderRadius: "6px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.accent,
                      color: (theme) => theme.palette.textColor.black,
                    },
                  }}
                >
                  <Typography textAlign="center">
                    {intl.formatMessage({ id: "header.logout" })}
                  </Typography>
                </MenuItem>
              </Box>
            ) : (
              pages.slice(10, 11).map(({ title, link }) => (
                <MenuItem
                  sx={{
                    px: "12px",
                    transition: "color 0.3s",
                    borderRadius: "6px",
                    color: (theme) =>
                      pathname === "/login"
                        ? theme.palette.textColor.header
                        : theme.palette.textColor.header,
                    backgroundColor: () =>
                      pathname === "/login" ? null : null,
                    borderColor: (theme) => theme.palette.primary.accent,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    "&:hover": {
                      color: (theme) => theme.palette.primary.accent,
                    },
                    marginRight: "24px",
                    textTransform: "uppercase",
                  }}
                  key={title}
                  onClick={() => {
                    navigate(link);
                  }}
                >
                  <Typography textAlign="center">
                    {intl.formatMessage({ id: "header.login" })}
                  </Typography>
                </MenuItem>
              ))
            )}
            {!isLoggedIn && (
              <Box>
                {pages.slice(11).map(({ title, link }) => (
                  <MenuItem
                    key={title}
                    onClick={() => {
                      navigate(link);
                    }}
                    sx={{
                      px: "12px",
                      color: (theme) =>
                        pathname === "/registration" || pathname === "/"
                          ? theme.palette.textColor.black
                          : theme.palette.textColor.black,
                      backgroundColor: (theme) =>
                        pathname === "/registration" || pathname === "/"
                          ? theme.palette.buttonColor.header
                          : theme.palette.buttonColor.header,
                      borderRadius: "6px",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: (theme) =>
                          theme.palette.primary.accent,
                      },
                      textTransform: "uppercase",
                    }}
                  >
                    <Typography textAlign="center">{title}</Typography>
                  </MenuItem>
                ))}
              </Box>
            )}
          </Stack>

          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              alignItems: "center",
            }}
          >
            {/* <GreenSwitch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            /> */}
            <LanguageSwitcher />
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {
                handleCloseNavMenu();
              }}
              sx={{
                "& .MuiMenu-list": {
                  padding: "0",
                },
                // "& .MuiPopover-paper": { top: "0" },
              }}
            >
              <Paper
                sx={{
                  height: "100vh",
                  width: "100vw",
                  padding: "40px 60px",
                }}
              >
{pages.slice(7, 10).map(({ title, link }) => (
                  <MenuMobItem
                    // disableGutters={true}
                    key={title.props.id}
                    onClick={() => {
                      handleCloseNavMenu(link);
                    }}
                    sx={{
                      padding: 0,
                      backgroundColor: (theme) => theme.palette.background,
                    }}
                  >
                    <Typography
                      textAlign="left"
                      variant="fontHeader"
                      sx={{
                        mr: 0,
                        padding: "6px 16px",
                      }}
                    >
                      {title}
                    </Typography>
                  </MenuMobItem>
                ))}               {isLoggedIn && (
                  <div>
                    <Box
                      sx={{ borderTop: "1px solid #4B5563", margin: "28px 0" }}
                    />
                    {pages.slice(0, 6).map(({ title, link }) => (
                      <MenuMobItem
                        // disableGutters={true}
                        key={title.props.id}
                        onClick={() => {
                          handleCloseNavMenu(`/user/${user.id}/${link}`);
                        }}
                        sx={{
                          padding: 0,
                          backgroundColor: (theme) => theme.palette.background,
                          "&:hover": {
                            color: (theme) =>
                              theme.palette.textColor.greenYellowHover,
                          },
                        }}
                      >
                        <Typography
                          textAlign="left"
                          variant="fontHeader"
                          sx={{
                            mr: 0,
                            padding: "6px 16px",
                            "&:hover": {
                              color: (theme) =>
                                theme.palette.textColor.greenYellowHover,
                            },
                          }}
                        >
                          {title}
                        </Typography>
                      </MenuMobItem>
                    ))}
                  </div>
                )}
                <Box
                  sx={{ borderTop: "1px solid #4B5563", margin: "28px 0" }}
                />

                {isLoggedIn ? (
                  <Box>
                    {pages.slice(6, 7).map(({ title, link }) => (
                      <MenuMobItem
                        key={title.props.id}
                        onClick={() => {
                          handleCloseNavMenu(`/user/${user.id}/${link}`);
                        }}
                        sx={{
                          padding: 0,
                          backgroundColor: (theme) => theme.palette.background,
                        }}
                      >
                        <Typography
                          textAlign="left"
                          variant="fontHeader"
                          sx={{
                            mr: 0,
                            padding: "6px 16px",
                            "&:hover": {
                              color: (theme) =>
                                theme.palette.textColor.greenYellowHover,
                            },
                          }}
                        >
                          {title}
                        </Typography>
                      </MenuMobItem>
                    ))}
                    <MenuMobItem
                      onClick={() => {
                        handleLogout("/");
                      }}
                      sx={{
                        padding: 0,
                        backgroundColor: (theme) => theme.palette.background,
                      }}
                    >
                      <Typography
                        textAlign="left"
                        variant="fontHeader"
                        sx={{
                          mr: 0,
                          padding: "6px 16px",
                          "&:hover": {
                            color: (theme) =>
                              theme.palette.textColor.greenYellowHover,
                          },
                        }}
                      >
                        {intl.formatMessage({ id: "header.logout" })}
                      </Typography>
                    </MenuMobItem>
                  </Box>
                ) : (
                  <Box>
                    <MenuMobItem
                      onClick={() => {
                        handleCloseNavMenu("/login");
                      }}
                      sx={{
                        padding: 0,
                        backgroundColor: (theme) => theme.palette.background,
                      }}
                    >
                      <Typography
                        textAlign="left"
                        variant="fontHeader"
                        sx={{
                          mr: 0,
                          padding: "6px 16px",
                        }}
                      >
                        {intl.formatMessage({ id: "header.login" })}
                      </Typography>
                    </MenuMobItem>
                    <MenuMobItem
                      disableGutters={true}
                      onClick={() => {
                        handleCloseNavMenu("/registration");
                      }}
                      sx={{
                        padding: 0,
                        backgroundColor: (theme) => theme.palette.background,
                      }}
                    >
                      <Typography
                        textAlign="left"
                        variant="fontHeader"
                        sx={{
                          mr: 0,
                          padding: "6px 16px",
                        }}
                      >
                        {intl.formatMessage({ id: "header.registration" })}
                      </Typography>
                    </MenuMobItem>
                  </Box>
                )}
              </Paper>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

ExternalLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};
