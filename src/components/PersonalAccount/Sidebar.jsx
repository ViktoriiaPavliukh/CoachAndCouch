import { LogOut } from "react-feather";
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
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        gap: "32px",
        paddingX: "16px",
      }}
    >
      {pages.slice(0, 9).map((item, index) => {
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
              variant="fontLink"
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
      <Box component={Link} to="/" sx={linkStyles} onClick={handleLogout}>
        <LogOut style={IconStyles} />
        <Typography variant="fontLink" noWrap sx={titleStyles}>
          {intl.formatMessage({ id: "personalAccount.logout" })}
        </Typography>
      </Box>
    </Box>
  );
};
