import React from 'react';
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
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { pages } from 'defaults';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const ExternalLink = ({ to, children, ...rest }) => {
  navigate();

  const handleClick = (event) => {
    event.preventDefault();
    window.open(to, '_blank');
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = link => {
    setAnchorElNav(null);
    navigate(link);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to=""
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Coach&#x26;Couch
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {
                handleCloseNavMenu();
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.slice(0, 5).map(({ title, link }) => (
                <MenuItem
                  key={title}
                  onClick={() => {
                    handleCloseNavMenu(link);
                  }}
                >
                  <Typography textAlign="center" >{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Coach&#x26;Couch
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.slice(0, 5).map(({ title, link }) => (
              <Button
                key={title}
                onClick={() => {
                  handleCloseNavMenu(link);
                }}
                sx={{ my: 2, color: 'white', display: 'block', textTransform: 'lowercase', '&:first-letter': {
                textTransform: 'capitalize',},
                }}
              >
                {title}
              </Button>
            ))}
          </Box>
          <Stack direction="row" sx={{ display: { xs: 'none', md: 'flex' }, gap: '0'}}>
            <ExternalLink to="https://www.instagram.com">
              <IconButton size="large" aria-label="Instagram" color="inherit" sx={{ color: 'white' }}>
                <InstagramIcon />
              </IconButton>
            </ExternalLink>
             <ExternalLink to="https://www.telegram.org">
              <IconButton size="large" aria-label="Telegram" color="inherit" sx={{ color: 'white' }}>
                <TelegramIcon />
              </IconButton>
            </ExternalLink>
             <ExternalLink to="https://www.facebook.com">
              <IconButton size="large" aria-label="Facebook" color="inherit" sx={{ color: 'white' }}>
                <FacebookRoundedIcon />
              </IconButton>
            </ExternalLink>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Box> {pages.slice(5, 6).map(({ title, link }) => (
                <MenuItem
                  key={title}
                  onClick={() => {
                    handleCloseNavMenu(link);
                  }}
                >
                  <Typography textAlign="center" >{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</Typography>
                </MenuItem>
              ))}
            </Box>
             <Box> {pages.slice(6).map(({ title, link }) => (
                <MenuItem
                  key={title}
                  onClick={() => {
                    handleCloseNavMenu(link);
                  }}
                  sx={{
                    backgroundColor: theme => theme.palette.buttonColor.main,
                    borderRadius: '6px'
                  }}
                >
                  <Typography textAlign="center" >{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</Typography>
                </MenuItem>
              ))}
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
