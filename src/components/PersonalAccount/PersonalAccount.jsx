import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PersonalImage } from "./PersonalImage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { advertsSelector } from "@/redux/marketplace/adverts/advertsSelector";
import { getAdverts } from "@/redux/marketplace/adverts/operations";
import homeIcon from "../../assets/icons/interface-dashboard-layout-circle--app-application-dashboard-home-layout-circle.svg";
import mouse from "../../assets/icons/computer-mouse--computer-device-electronics-mouse.svg";
import notepad from "../../assets/icons/interface-content-note-pad-text--content-notes-book-notepad-notebook.svg";
import checklist from "../../assets/icons/interface-file-clipboard-check--checkmark-edit-task-edition-checklist-check-success-clipboard-form.svg";
import settings from "../../assets/icons/interface-setting-cog--work-loading-cog-gear-settings-machine.svg";
import envelope from "../../assets/icons/mail-send-envelope--envelope-email-message-unopened-sealed-close.svg";


const linkStyles = {
  display: "flex",
  gap: "16px",
  textDecoration: "none",
  color: "#384C5E",
  fontSize: "22px",
  fontWeight: "300",
  lineHeight: "24px"
};

export function PersonalAccount() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdverts());
  }, [dispatch]);
  const adverts = useSelector(advertsSelector);
  console.log(adverts);

  return (
    <Container
      component="div"
      sx={{
        pt: 11,
        maxWidth: { lg: "1200px", md: "834px", sm: "375px" },
        pl: { lg: "30px", md: "20px", sm: "15px" },
        pr: { lg: "30px", md: "20px", sm: "15px" },
      }}
    >
      <Box>
        <PersonalImage />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "44px",
          }}
        >
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={homeIcon} alt="Home Icon" />
            <Typography variant="h6" noWrap>
              Головна
            </Typography>
          </Box>
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={mouse} alt="lessons" />
            <Typography variant="h6" noWrap>
              Мої заняття
            </Typography>
          </Box>
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={checklist} alt="enquiry" />
            <Typography variant="h6" noWrap>
              Моя анкета
            </Typography>
          </Box>
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={notepad} alt="schedule" />
            <Typography variant="h6" noWrap>
              Розклад
            </Typography>
          </Box>
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={envelope} alt="mails" />
            <Typography variant="h6" noWrap>
              Повідомлення
            </Typography>
          </Box>
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={settings} alt="settings" />
            <Typography variant="h6" noWrap>
              Налаштування
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
