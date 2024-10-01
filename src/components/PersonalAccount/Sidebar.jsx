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
  color: (theme) => theme.palette.textColor.sidebar,
  "&:hover": { color: (theme) => theme.palette.textColor.linkHover },
};

const activeLinks = {
  color: (theme) => theme.palette.textColor.links,
};

const activeLinkStyles = {
  ...linkStyles,
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
        justifyContent: "space-between",
        width: "316px",
        height: "100vh",
        background: (theme) => theme.palette.background.sidebar,
        p: "40px 40px 40px 60px",
        mb: "0",
      }}
    >
      <Box>
        {pages.slice(0, 5).map((item, index) => {
          const IconComponent = FeatherIcons[item.iconFeatherName];
          return (
            <Box
              component={Link}
              to={item.link}
              sx={
                location.pathname === `/user/${user.id}/${item.link}`
                  ? activeLinkStyles
                  : linkStyles
              }
              key={index}
            >
              {IconComponent && <IconComponent />}
              <Typography
                variant="posterSubtitle"
                noWrap
                sx={{ textTransform: "none" }}
              >
                {item.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ mb: "0px" }}>
        <Box
          component={Link}
          to="settings"
          sx={
            location.pathname === `/user/${user.id}/settings`
              ? activeLinkStyles
              : linkStyles
          }
        >
          <Settings />
          <Typography variant="posterSubtitle" noWrap>
            {intl.formatMessage({ id: "personalAccount.settings" })}
          </Typography>
        </Box>
        <Box component={Link} to="/" sx={linkStyles} onClick={handleLogout}>
          <LogOut />
          <Typography variant="posterSubtitle" noWrap>
            {intl.formatMessage({ id: "personalAccount.logout" })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
