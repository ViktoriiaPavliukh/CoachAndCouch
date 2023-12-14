import { LogOut } from "react-feather";
import * as FeatherIcons from "react-feather";
import sidebarPages from "../../defaults/sidebar/sidebarPages.json";
import { useIntl } from "react-intl";
import { logoutUser } from "../../redux/auth/operations";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { selectUser } from "@/redux/auth/selectors";

const linkStyles = {
  display: "flex",
  gap: "16px",
  padding: "12px",
  textDecoration: "none",
};
const titleStyles = {
  color: "#384C5E",
  fontSize: "22px",
  fontWeight: "300",
  lineHeight: "24px",
};

const IconStyles = {
  color: "#384C5E",
  size: 24,
};
const activeLinks = {
  color: "#24BF2A",
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
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "44px",
        paddingLeft: "16px",
      }}
    >
      {sidebarPages.map((item, index) => {
        const IconComponent = FeatherIcons[item.icon];
        return (
          <Box component={Link} to={item.page} sx={linkStyles} key={index}>
            {IconComponent && (
              <IconComponent
                style={
                  location.pathname === `/user/${user.id}/${item.page}`
                    ? activeIconStyles
                    : IconStyles
                }
              />
            )}
            <Typography
              variant="fontLink"
              noWrap
              sx={
                location.pathname === `/user/${user.id}/${item.page}`
                  ? activeTitleStyles
                  : titleStyles
              }
            >
              {intl.formatMessage({ id: `personalAccount.${item.page}` })}
            </Typography>
          </Box>
        );
      })}
      <Box component={Link} sx={linkStyles} onClick={handleLogout}>
        <LogOut style={IconStyles} />
        <Typography variant="fontLink" noWrap sx={titleStyles}>
          {intl.formatMessage({ id: "personalAccount.logout" })}
        </Typography>
      </Box>
    </Box>
  );
};
{
  /* <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "44px",
        paddingLeft: "16px",
      }}
    >
      <Box component={Link} to="profile" sx={linkStyles}>
        <FileText
          style={
            location.pathname === `/user/${user.id}/profile`
              ? activeIconStyles
              : IconStyles
          }
        />
        <Typography
          variant="fontLink"
          noWrap
          sx={
            location.pathname === `/user/${user.id}/profile`
              ? activeTitleStyles
              : titleStyles
          }
        >
          {intl.formatMessage({ id: "personalAccount.profile" })}
        </Typography>
      </Box>
      <Box component={Link} to="lessons" sx={linkStyles}>
        <Edit2
          style={
            location.pathname === `/user/${user.id}/lessons`
              ? activeIconStyles
              : IconStyles
          }
        />
        <Typography
          variant="fontLink"
          noWrap
          sx={
            location.pathname === `/user/${user.id}/lessons`
              ? activeTitleStyles
              : titleStyles
          }
        >
          {intl.formatMessage({ id: "personalAccount.lessons" })}
        </Typography>
      </Box>
      <Box component={Link} to="schedule" sx={linkStyles}>
        <Calendar
          style={
            location.pathname === `/user/${user.id}/schedule`
              ? activeIconStyles
              : IconStyles
          }
        />
        <Typography
          variant="fontLink"
          noWrap
          sx={
            location.pathname === `/user/${user.id}/schedule`
              ? activeTitleStyles
              : titleStyles
          }
        >
          {intl.formatMessage({ id: "personalAccount.schedule" })}
        </Typography>
      </Box>
      <Box component={Link} to="messages" sx={linkStyles}>
        <MessageSquare
          style={
            location.pathname === `/user/${user.id}/messages`
              ? activeIconStyles
              : IconStyles
          }
        />

        <Typography
          variant="fontLink"
          noWrap
          sx={
            location.pathname === `/user/${user.id}/messages`
              ? activeTitleStyles
              : titleStyles
          }
        >
          {intl.formatMessage({ id: "personalAccount.messages" })}
        </Typography>
      </Box>
      <Box component={Link} to="likes" sx={linkStyles}>
        <Heart
          style={
            location.pathname === `/user/${user.id}/likes`
              ? activeIconStyles
              : IconStyles
          }
        />
        <Typography
          variant="fontLink"
          noWrap
          sx={
            location.pathname === `/user/${user.id}/likes`
              ? activeTitleStyles
              : titleStyles
          }
        >
          {intl.formatMessage({ id: "personalAccount.likes" })}
        </Typography>
      </Box>
      <Box component={Link} to="advertisements" sx={linkStyles}>
        <Tablet
          style={
            location.pathname === `/user/${user.id}/advertisements`
              ? activeIconStyles
              : IconStyles
          }
        />
        <Typography
          variant="fontLink"
          noWrap
          sx={
            location.pathname === `/user/${user.id}/advertisements`
              ? activeTitleStyles
              : titleStyles
          }
        >
          {intl.formatMessage({ id: "personalAccount.advertisements" })}
        </Typography>
      </Box>
      <Box component={Link} to="feedback" sx={linkStyles}>
        <Smile
          style={
            location.pathname === `/user/${user.id}/feedback`
              ? activeIconStyles
              : IconStyles
          }
        />
        <Typography
          variant="fontLink"
          noWrap
          sx={
            location.pathname === `/user/${user.id}/feedback`
              ? activeTitleStyles
              : titleStyles
          }
        >
          {intl.formatMessage({ id: "personalAccount.feedback" })}
        </Typography>
      </Box>
      <Box component={Link} to="main" sx={linkStyles}>
        <Grid
          style={
            location.pathname === `/user/${user.id}/main`
              ? activeIconStyles
              : IconStyles
          }
        />
        <Typography
          variant="fontLink"
          noWrap
          sx={
            location.pathname === `/user/${user.id}/main`
              ? activeTitleStyles
              : titleStyles
          }
        >
          {intl.formatMessage({ id: "dashboard" })}
        </Typography>
      </Box>
      <Box component={Link} to="settings" sx={linkStyles}>
        <Settings
          style={
            location.pathname === `/user/${user.id}/settings`
              ? activeIconStyles
              : IconStyles
          }
        />
        <Typography
          variant="fontLink"
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
      <Box component={Link} sx={linkStyles} onClick={handleLogout}>
        <LogOut style={IconStyles} />
        <Typography variant="fontLink" noWrap sx={titleStyles}>
          {intl.formatMessage({ id: "personalAccount.logout" })}
        </Typography>
      </Box>
    </Box> */
}
