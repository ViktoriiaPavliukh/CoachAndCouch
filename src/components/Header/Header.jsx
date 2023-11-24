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
  Switch,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { pages } from "@/defaults";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeTheme } from "@/redux/theme/slice";
import { styled } from "@mui/material/styles";
import LanguageSwitcher from "./LanguageSwitcher";
// import { FormattedMessage } from "react-intl";

import messages from "../../defaults/translations/messages";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: (theme) => theme.palette.primary.switch,
  },
  "& .MuiSwitch-switchBase": {
    color: theme.palette.primary.switch,
  },
  "& .MuiSwitch-thumb": {
    color: theme.palette.primary.switch,
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.switch,
    color: theme.palette.primary.switch,
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.accent,
  },
}));

const MenuMobItem = styled(MenuItem)(() => ({
  "& :hover": {
    backgroundColor: "green",
    color: "white",
  },
  "& .MuiMenuItem-root": {
    color: "white",
  },
  "& .MuiTypography-root": {
    width: "100%",
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
  // console.log(user);
  const [pathname, setPathname] = useState("");
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
    navigate("/");
  };

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(changeTheme());
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            gap: "5%",
            color: (theme) => theme.palette.textColor.header,
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="home"
            sx={{
              display: { xs: "none", md: "flex" },
              // marginRight: "5%",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              opacity: "0.9",
            }}
          >
            Coach&#x26;Couch
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="home"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Coach&#x26;Couch
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: "1rem",
            }}
          >
            {pages.slice(0, 3).map(({ title, link }) => (
              <Button
                key={title}
                onClick={() => {
                  handleCloseNavMenu(link);
                }}
                sx={{
                  color: (theme) => theme.palette.textColor.header,
                  display: "block",
                  textTransform: "lowercase",
                  "&:first-letter": {
                    textTransform: "capitalize",
                  },
                  transition: "color 0.3s",
                  backgroundColor: (theme) =>
                    pathname === `/${link}` || pathname === `${link}`
                      ? theme.palette.primary.accent
                      : null,
                  "&:hover": {
                    color: (theme) => theme.palette.textColor.menuHover,
                  },
                }}
              >
                {title}
              </Button>
            ))}
          </Box>
          <Stack
            direction="row"
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: "0",
            }}
          >
            <ExternalLink to="https://www.instagram.com" aria-label="Instagram">
              <InstagramIcon
                sx={{ color: (theme) => theme.palette.textColor.header }}
              />
            </ExternalLink>
            <ExternalLink to="https://www.telegram.org" aria-label="Telegram">
              <TelegramIcon
                sx={{
                  padding: "0px",
                  color: (theme) => theme.palette.textColor.header,
                }}
              />
            </ExternalLink>
            <ExternalLink to="https://www.facebook.com" aria-label="Facebook">
              <FacebookRoundedIcon
                sx={{ color: (theme) => theme.palette.textColor.header }}
              />
            </ExternalLink>
          </Stack>
          <Stack direction="row" sx={{ display: { xs: "none", md: "flex" } }}>
            <LanguageSwitcher />
            <GreenSwitch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Stack>
          <Stack direction="row" sx={{ display: { xs: "none", md: "flex" } }}>
            {isLoggedIn ? (
              <Box display="flex" direction="row">
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu(`/user/${user.id}/main`);
                  }}
                  user={user}
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.accent,
                      borderRadius: "6px",
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

                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.accent,
                      borderRadius: "6px",
                    },
                  }}
                >
                  <Typography textAlign="center">
                    {intl.formatMessage({ id: "header.logout" })}
                  </Typography>
                </MenuItem>
              </Box>
            ) : (
              pages.slice(4, 5).map(({ title, link }) => (
                <MenuItem
                  sx={{
                    px: "12px",
                    transition: "color 0.3s",
                    borderRadius: "6px",

                    backgroundColor: (theme) =>
                      pathname === "/login"
                        ? theme.palette.primary.accent
                        : null,
                    "&:hover": {
                      // color: (theme) => (pathname === "/login" ? theme.palette.textColor.main : null),
                      backgroundColor: (theme) => theme.palette.primary.accent,
                    },
                  }}
                  key={title}
                  onClick={() => {
                    if (link === "login") {
                      console.log(link);
                    }
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
                {pages.slice(5, 6).map(({ title, link }) => (
                  <MenuItem
                    key={title}
                    onClick={() => {
                      navigate(link);
                    }}
                    sx={{
                      px: "12px",
                      backgroundColor: (theme) =>
                        pathname === "/registration" || pathname === "/"
                          ? theme.palette.primary.accent
                          : null,
                      borderRadius: "6px",
                      transition: "background-color 0.3s",

                      "&:hover": {
                        backgroundColor: (theme) =>
                          theme.palette.primary.accent,
                      },
                    }}
                  >
                    <Typography textAlign="center">{title}</Typography>
                  </MenuItem>
                ))}
              </Box>
            )}
          </Stack>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              {/* {isLoggedIn && (
                <MenuItem sx={{ px: "12px" }} onClick={handleLogout}>
                  <Typography textAlign="center">Вихід</Typography>
                </MenuItem>
              )} */}
              <MenuIcon />
            </IconButton>
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
                display: { xs: "block", lg: "none" },
                padding: "10px",
              }}
            >
              {isLoggedIn ? (
                <div>
                  <MenuMobItem
                    disableGutters={true}
                    sx={{ width: "100%" }}
                    onClick={() => {
                      handleCloseNavMenu(`/user/${user.id}/main`);
                    }}
                  >
                    <Typography
                      textAlign="center"
                      variant="fontHeader"
                      sx={{
                        mr: 0,
                      }}
                    >
                      <Typography textAlign="center">
                        {intl.formatMessage({ id: "header.profile" })}
                      </Typography>
                    </Typography>
                  </MenuMobItem>
                  <MenuMobItem
                    disableGutters={true}
                    onClick={() => {
                      handleCloseNavMenu("/logout");
                    }}
                  >
                    <Typography
                      textAlign="center"
                      variant="fontHeader"
                      // sx={{
                      //   mr: 5.5,
                      // }}
                    >
                      {intl.formatMessage({ id: "header.logout" })}
                    </Typography>
                  </MenuMobItem>
                </div>
              ) : (
                <div>
                  <MenuMobItem
                    disableGutters={true}
                    onClick={() => {
                      handleCloseNavMenu("/login");
                    }}
                  >
                    <Typography
                      textAlign="center"
                      variant="fontHeader"
                      // sx={{
                      //   mr: 5.5,
                      // }}
                    >
                      {intl.formatMessage({ id: "header.login" })}
                    </Typography>
                  </MenuMobItem>

                  <MenuMobItem
                    disableGutters={true}
                    onClick={() => {
                      handleCloseNavMenu("/registration");
                    }}
                  >
                    <Typography
                      // disableGutters={true}
                      textAlign="center"
                      variant="fontHeader"
                      sx={{
                        mr: 0,
                      }}
                    >
                      {intl.formatMessage({ id: "header.registration" })}
                    </Typography>
                  </MenuMobItem>
                </div>
              )}
              {pages.slice(0, 3).map(({ title, link }) => (
                <MenuMobItem
                  // disableGutters={true}
                  key={title}
                  onClick={() => {
                    handleCloseNavMenu(link);
                  }}
                >
                  <Typography
                    textAlign="center"
                    variant="fontHeader"
                    sx={{
                      //mr: 5.5,
                      paddingLeft: "6px",
                      paddingRight: "6px",
                    }}
                  >
                    {title}
                  </Typography>
                </MenuMobItem>
              ))}
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
