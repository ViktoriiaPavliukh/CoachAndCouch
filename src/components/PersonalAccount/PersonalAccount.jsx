import "react-calendar/dist/Calendar.css";
// import { enUS } from "date-fns/locale";
import { useIntl } from "react-intl";
import { Container, Box, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { PersonalImage } from "./PersonalImage";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import homeIcon from "../../assets/icons/interface-dashboard-layout-circle--app-application-dashboard-home-layout-circle.svg";
import mouse from "../../assets/icons/computer-mouse--computer-device-electronics-mouse.svg";
import notepad from "../../assets/icons/interface-content-note-pad-text--content-notes-book-notepad-notebook.svg";
import checklist from "../../assets/icons/interface-file-clipboard-check--checkmark-edit-task-edition-checklist-check-success-clipboard-form.svg";
import settings from "../../assets/icons/interface-setting-cog--work-loading-cog-gear-settings-machine.svg";
// import envelope from "../../assets/icons/mail-send-envelope--envelope-email-message-unopened-sealed-close.svg";
import logout from "../../assets/icons/logout.svg";
import { selectUser } from "../../redux/auth/selectors";

const linkStyles = {
  display: "flex",
  gap: "16px",
  padding: "12px",
  textDecoration: "none",
  color: "#384C5E",
  fontSize: "22px",
  fontWeight: "300",
  lineHeight: "24px",
};

export function PersonalAccount() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const intl = useIntl();
  // console.log(user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <Container
      component="div"
      sx={{
        pt: 11,
        maxWidth: { lg: "1200px", md: "834px", sm: "375px" },
        pl: { lg: "30px", md: "20px", sm: "15px" },
        pr: { lg: "30px", md: "20px", sm: "15px" },
        display: "flex",
        gap: "122px",
        height: "100%",
        pb: "79px",
      }}
    >
      <Box>
        <PersonalImage advertImagePath={user.advert?.imagePath} />
        <Typography
          gutterBottom
          variant="fontTitle"
          sx={{ display: "flex", paddingTop: "32px" }}
        >
          {user.firstName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "44px",
            paddingLeft: "16px",
          }}
        >
          <Box component={Link} to="main" sx={linkStyles}>
            <img src={homeIcon} alt="Home Icon" />
            <Typography variant="fontLink" noWrap>
              {intl.formatMessage({ id: "dashboard" })}
            </Typography>
          </Box>
          <Box component={Link} to="lessons" sx={linkStyles}>
            <img src={mouse} alt="lessons" />
            <Typography variant="fontLink" noWrap>
              {intl.formatMessage({ id: "personalAccount.lessons" })}
            </Typography>
          </Box>
          <Box component={Link} to="enquiry" sx={linkStyles}>
            <img src={checklist} alt="enquiry" />
            <Typography variant="fontLink" noWrap>
              {intl.formatMessage({ id: "personalAccount.profile" })}
            </Typography>
          </Box>
          <Box component={Link} to="schedule" sx={linkStyles}>
            <img src={notepad} alt="schedule" />
            <Typography variant="fontLink" noWrap>
              {intl.formatMessage({ id: "personalAccount.schedule" })}
            </Typography>
          </Box>
          {/* <Box component={Link} to="messages" sx={linkStyles}>
            <img src={envelope} alt="messages" />
            <Typography variant="fontLink" noWrap>
              Повідомлення
            </Typography>
          </Box> */}
          <Box component={Link} to="settings" sx={linkStyles}>
            <img src={settings} alt="settings" />
            <Typography variant="fontLink" noWrap>
              {intl.formatMessage({ id: "personalAccount.settings" })}
            </Typography>
          </Box>
          <Box component={Link} sx={linkStyles} onClick={handleLogout}>
            <img src={logout} alt="logout" />
            <Typography variant="fontLink" noWrap>
              {intl.formatMessage({ id: "personalAccount.logout" })}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Outlet />
    </Container>
  );
}
