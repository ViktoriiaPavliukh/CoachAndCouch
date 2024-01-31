import { LogOut, Settings } from "react-feather";
import * as FeatherIcons from "react-feather";
import { useIntl } from "react-intl";
import { logoutUser } from "../../redux/auth/operations";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { selectUser } from "@/redux/auth/selectors";
import { pages } from "@/defaults";

const linkStyles = {
  display: "flex",
  gap: "16px",
  padding: "8px 12px",
  textDecoration: "none",
};
const titleStyles = {
  color: (theme) => theme.palette.textColor.sidebar,
  "&:hover": { color: "#004305" },
};

const IconStyles = {
  color: (theme) => theme.palette.textColor.sidebar,
  size: 24,
};
const activeLinks = {
  color: (theme) => theme.palette.primary.main,
};

const activeTitleStyles = {
  ...titleStyles,
  ...activeLinks,
};
const activeIconStyles = {
  ...IconStyles,
  ...activeLinks,
};

export const Sidebar = () => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        gap: "16px",
        justifyContent: "space-between",
        width: "316px",
        height: "100vh",
        background: (theme) => theme.palette.background.sidebar,
        pt: "40px",
        pb: "40px",

        pl: "60px",
      }}
    >
      <Box>
        {pages.slice(0, 8).map((item, index) => {
          const IconComponent = FeatherIcons[item.iconFeatherName];
          return (
            <Box component={Link} to={item.link} sx={linkStyles} key={index}>
              {IconComponent && (
                <IconComponent
                  style={
                    location.pathname === `/user/${user.id}/${item.link}`
                      ? activeIconStyles
                      : IconStyles
                  }
                />
              )}
              <Typography
                variant="posterSubtitle"
                noWrap
                sx={
                  location.pathname === `/user/${user.id}/${item.link}`
                    ? activeTitleStyles
                    : titleStyles
                }
              >
                {item.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ mb: "0px" }}>
        <Box component={Link} to="settings" sx={linkStyles}>
          <Settings
            style={
              location.pathname === `/user/${user.id}/settings`
                ? activeIconStyles
                : IconStyles
            }
          />
          <Typography
            variant="posterSubtitle"
            noWrap
            sx={
              location.pathname === `/user/${user.id}/settings`
                ? activeTitleStyles
                : titleStyles
            }
          >
            {intl.formatMessage({ id: "personalAccount.settings" })}
          </Typography>
        </Box>
        <Box component={Link} to="/" sx={linkStyles} onClick={handleLogout}>
          <LogOut style={IconStyles} />
          <Typography variant="posterSubtitle" noWrap sx={titleStyles}>
            {intl.formatMessage({ id: "personalAccount.logout" })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
