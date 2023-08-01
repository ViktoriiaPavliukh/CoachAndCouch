import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { pages } from "@/defaults";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ExternalLink = ({ to, children, ...rest }) => {
  return (
    <Link to={to}>
      <IconButton
        size="large"
        color="inherit"
        sx={{ color: "white" }}
        {...rest}
      >
        {children}
      </IconButton>
    </Link>
  );
};

export function Header() {
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
      <Container sx={{ maxWidth: { lg: 1200, md: 834, sm: 375 } }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to=""
            sx={{
              display: { xs: "none", lg: "flex" },
              marginRight: "54px",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              // color: (theme) => theme.palette.headerColor.grey,
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
              display: { xs: "flex", lg: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Coach&#x26;Couch
          </Typography>
          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
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
                      color: (theme) => theme.palette.buttonColor.fontColor,
                    }}
                  >
                    {title.charAt(0).toUpperCase() +
                      title.slice(1).toLowerCase()}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
            {pages.slice(0, 5).map(({ title, link }) => (
              <Button
                key={title}
                onClick={() => {
                  handleCloseNavMenu(link);
                }}
                sx={{
                  px: "16px",
                  color: "white",
                  display: "block",
                  textTransform: "lowercase",
                  "&:first-letter": {
                    textTransform: "capitalize",
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
              ml: "30px",
              // ml: "55px",
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
          <Stack
            direction="row"
            sx={{ marginLeft: "60px", display: { xs: "none", lg: "flex" } }}
          >
            {isLoggedIn ? (
              <MenuItem sx={{ px: "12px" }} onClick={handleLogout}>
                <Typography textAlign="center">Вихід</Typography>
              </MenuItem>
            ) : (
              pages.slice(5, 6).map(({ title, link }) => (
                <MenuItem
                  sx={{ px: "12px" }}
                  key={title}
                  onClick={() => {
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
                {pages.slice(6).map(({ title, link }) => (
                  <MenuItem
                    key={title}
                    onClick={() => {
                      navigate(link);
                    }}
                    sx={{
                      px: "12px",
                      backgroundColor: (theme) =>
                        theme.palette.buttonColor.main,
                      borderRadius: "6px",
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
