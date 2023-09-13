import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Stack } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { pages } from "@/defaults";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ExternalLink = ({ to, children, ...rest }) => {
  return (
    <Link to={to} sx={{ color: "white", padding: "px" }}>
      <IconButton size="large" color="inherit" sx={{ color: "white", padding: "3px" }} {...rest}>
        {children}
      </IconButton>
    </Link>
  );
};

export function Header() {
  const [pathname, setPathname] = useState("");
  const path = useLocation().pathname;
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
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters sx={{ display: "flex", gap: "5%" }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to=""
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
            to=""
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
            {pages.slice(0, 5).map(({ title, link }) => (
              <Button
                key={title}
                onClick={() => {
                  handleCloseNavMenu(link);
                }}
                sx={{
                  color: "white",
                  display: "block",
                  textTransform: "lowercase",
                  "&:first-letter": {
                    textTransform: "capitalize",
                  },
                  transition: "color 0.3s",
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
              <InstagramIcon />
            </ExternalLink>
            <ExternalLink to="https://www.telegram.org" aria-label="Telegram">
              <TelegramIcon sx={{ padding: "0px" }} />
            </ExternalLink>
            <ExternalLink to="https://www.facebook.com" aria-label="Facebook">
              <FacebookRoundedIcon />
            </ExternalLink>
          </Stack>
          <Stack direction="row" sx={{ display: { xs: "none", md: "flex" } }}>
            {isLoggedIn ? (
              <>
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu("/user");
                  }}
                >
                  <PeopleAltOutlinedIcon />
                </MenuItem>
                <MenuItem sx={{ px: "12px" }} onClick={handleLogout}>
                  <Typography textAlign="center">Вихід</Typography>
                </MenuItem>
              </>
            ) : (
              pages.slice(5, 6).map(({ title, link }) => (
                <MenuItem
                  sx={{
                    px: "12px",
                    transition: "color 0.3s",
                    borderRadius: () => (pathname === "/login" ? "6px" : null),

                    backgroundColor: (theme) =>
                      pathname === "/login"
                        ? theme.palette.buttonColor.main
                        : null,
                    "&:hover": {
                      color: (theme) =>
                        pathname === "/login"
                          ? theme.palette.textColor.main
                          : theme.palette.textColor.menuHover,
                      backgroundColor: (theme) =>
                        pathname === "/login"
                          ? theme.palette.buttonColor.hover
                          : null,
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
                    {title.charAt(0).toUpperCase() +
                      title.slice(1).toLowerCase()}
                  </Typography>
                </MenuItem>
              ))
            )}
            {!isLoggedIn && (
              <Box>
                {pages.slice(6, 7).map(({ title, link }) => (
                  <MenuItem
                    key={title}
                    onClick={() => {
                      navigate(link);
                    }}
                    sx={{
                      px: "12px",
                      backgroundColor: (theme) =>
                        pathname === "/registration" || pathname === "/"
                          ? theme.palette.buttonColor.main
                          : null,
                      borderRadius: "6px",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: (theme) =>
                          theme.palette.buttonColor.hover,
                      },
                    }}
                  >
                    <Typography textAlign="center">
                      {title.toUpperCase()}
                    </Typography>
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
              onClick={handleOpenNavMenu}
              color="inherit"
            >
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
              }}
            >
              {isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu("/user");
                    }}
                  >
                    <Typography
                      textAlign="center"
                      variant="fontHeader"
                      sx={{
                        mr: 5.5,
                      }}
                    >
                      Особистий кабінет
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu("/logout");
                    }}
                  >
                    <Typography
                      textAlign="center"
                      variant="fontHeader"
                      sx={{
                        mr: 5.5,
                      }}
                    >
                      Вихід
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu("/login");
                    }}
                  >
                    <Typography
                      textAlign="center"
                      variant="fontHeader"
                      sx={{
                        mr: 5.5,
                      }}
                    >
                      Вхід
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu("/registration");
                    }}
                  >
                    <Typography
                      textAlign="center"
                      variant="fontHeader"
                      sx={{
                        mr: 5.5,
                      }}
                    >
                      Реєстрація
                    </Typography>
                  </MenuItem>
                </>
              )}
              {pages.slice(0, 5).map(({ title, link }) => (
                <MenuItem
                  key={title}
                  onClick={() => {
                    handleCloseNavMenu(link);
                  }}
                >
                  <Typography
                    textAlign="center"
                    variant="fontHeader"
                    sx={{
                      mr: 5.5,
                    }}
                  >
                    {title.charAt(0).toUpperCase() +
                      title.slice(1).toLowerCase()}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
