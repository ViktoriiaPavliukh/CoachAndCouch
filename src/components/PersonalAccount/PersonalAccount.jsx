import { useState } from "react";
import { useNavigate } from "react-router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import { enUS } from "date-fns/locale";
import { Container, Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { PersonalImage } from "./PersonalImage";
import { useDispatch, useSelector } from "react-redux";
import homeIcon from "../../assets/icons/interface-dashboard-layout-circle--app-application-dashboard-home-layout-circle.svg";
import mouse from "../../assets/icons/computer-mouse--computer-device-electronics-mouse.svg";
import notepad from "../../assets/icons/interface-content-note-pad-text--content-notes-book-notepad-notebook.svg";
import checklist from "../../assets/icons/interface-file-clipboard-check--checkmark-edit-task-edition-checklist-check-success-clipboard-form.svg";
import settings from "../../assets/icons/interface-setting-cog--work-loading-cog-gear-settings-machine.svg";
import envelope from "../../assets/icons/mail-send-envelope--envelope-email-message-unopened-sealed-close.svg";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import Time from "./Time";

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
  const user = useSelector(selectUser);
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

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
        height: "90vh",
      }}
    >
      <Box>
        <PersonalImage />
        <Typography
          gutterBottom
          variant="fontTitle"
          sx={{ display: "flex", paddingTop: "32px" }}
        >
          {user.name}
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
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={homeIcon} alt="Home Icon" />
            <Typography variant="fontLink" noWrap>
              Головна
            </Typography>
          </Box>
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={mouse} alt="lessons" />
            <Typography variant="fontLink" noWrap>
              Мої заняття
            </Typography>
          </Box>
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={checklist} alt="enquiry" />
            <Typography variant="fontLink" noWrap>
              Моя анкета
            </Typography>
          </Box>
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={notepad} alt="schedule" />
            <Typography variant="fontLink" noWrap>
              Розклад
            </Typography>
          </Box>
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={envelope} alt="mails" />
            <Typography variant="fontLink" noWrap>
              Повідомлення
            </Typography>
          </Box>
          <Box component={Link} to="/" sx={linkStyles}>
            <img src={settings} alt="settings" />
            <Typography variant="fontLink" noWrap>
              Налаштування
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", gap: "40px" }}>
          <Card
            sx={{
              display: "flex",
              p: "24px",
              border: "1px solid #C1D9EA",
              borderRadius: "12px",
              gap: "32px",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "359px",
            }}
          >
            <Avatar sx={{ bgcolor: green[500] }} aria-label="rate"></Avatar>
            <Box>
              <Typography>РЕЙТИНГ</Typography>
              <Typography>95%</Typography>
              <Typography> Молодець! Так тримати</Typography>
            </Box>
          </Card>
          <Card
            sx={{
              display: "flex",
              p: "24px",
              border: "1px solid #C1D9EA",
              borderRadius: "12px",
              gap: "32px",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "359px",
            }}
          >
            <Avatar sx={{ bgcolor: green[500] }} aria-label="rate"></Avatar>
            <Box>
              <Typography>Відвідуваність</Typography>
              <Typography>85%</Typography>
              <Typography> Добре! Є трохи пропусків</Typography>
            </Box>
          </Card>
        </Box>
        <Box>
          <Typography
            variant="h5"
            noWrap
            sx={{ paddingTop: "32px", mb: "16px" }}
          >
            РОЗКЛАД
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "40px" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Card
                sx={{
                  display: "flex",
                  p: "24px",
                  border: "1px solid #C1D9EA",
                  borderRadius: "12px",
                  width: "359px",
                  height: "fit-content",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography>24</Typography>
                  <Box>
                    <Typography>Англійська мова</Typography>
                    <Typography>14:00-15:00</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Calendar
                onChange={setDate}
                value={date}
                onClickDay={() => setShowTime(true)}
                locale={enUS}
              />
            </Box>
          </Box>
        </Box>

        {/* {date.length > 0 ? (
          <p>
            <span>Start:</span>
            {date[0].toDateString()}
            &nbsp; &nbsp;
            <span>End:</span>
            {date[1].toDateString()}
          </p>
        ) : (
          <p>
            <span>Default selected date:</span>
            {date.toDateString()}
          </p>
        )}
        <Time showTime={showTime} date={date} /> */}
      </Box>
    </Container>
  );
}

