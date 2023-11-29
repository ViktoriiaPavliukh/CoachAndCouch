import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import "react-calendar/dist/Calendar.css";
import { selectUser } from "../../redux/auth/selectors";
// import { enUS } from "date-fns/locale";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import Time from "./Time";
import Calendar from "react-calendar";
import { useState } from "react";
export const MainPage = () => {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const user = useSelector(selectUser);
  const intl = useIntl();

  return (
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
            <Typography>{intl.formatMessage({ id: "rate" })}</Typography>
            <Typography>{user.rating}</Typography>
            <Typography> Молодець! Так тримати</Typography>
          </Box>
        </Card>
      </Box>
      <Box>
        <Typography variant="h5" noWrap sx={{ paddingTop: "32px", mb: "16px", textTransform: "uppercase" }}>
          {intl.formatMessage({ id: "personalAccount.schedule" })}
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
              locale="en-US"
            />
          </Box>
        </Box>
      </Box>

      {date.length > 0 ? (
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
      <Time showTime={showTime} date={date} />
    </Box>
  );
};
