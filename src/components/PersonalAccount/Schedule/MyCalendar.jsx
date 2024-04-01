import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { lightTheme, darkTheme } from "../../../styles/theme";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomToolbar } from "./CustomToolbar";
import { Typography } from "@mui/material";
import { Clock } from "react-feather";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "@/redux/theme/selectors";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";

const localizer = momentLocalizer(moment);
const eventsList = [
  {
    title: "DTS STARTS",
    start: new Date(2024, 2, 28, 15, 0, 0),
    end: new Date(2024, 2, 28, 16, 30, 0),
  },

  {
    title: "DTS ENDS",
    start: new Date(2024, 2, 30, 12, 0, 0),
    end: new Date(2024, 2, 30, 13, 0, 0),
  },

  {
    title: "Some Event",
    start: new Date(2024, 2, 27, 11, 0, 0),
    end: new Date(2024, 2, 27, 12, 0, 0),
    desc: "Most important meal of the day",
  },

  {
    title: "Meeting",
    start: new Date(2024, 3, 6, 10, 30, 0, 0),
    end: new Date(2024, 3, 3, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    title: "Lunch",
    start: new Date(2024, 3, 12, 12, 0, 0, 0),
    end: new Date(2024, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    title: "Meeting",
    start: new Date(2024, 3, 12, 14, 0, 0, 0),
    end: new Date(2024, 3, 12, 15, 0, 0, 0),
  },
  {
    title: "Happy Hour",
    start: new Date(2024, 3, 12, 17, 0, 0, 0),
    end: new Date(2024, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    title: "Dinner",
    start: new Date(2024, 3, 12, 20, 0, 0, 0),
    end: new Date(2024, 3, 12, 21, 0, 0, 0),
  },
  {
    title: "Birthday Party",
    start: new Date(2024, 3, 13, 7, 0, 0),
    end: new Date(2024, 3, 13, 10, 30, 0),
  },
  {
    title: "Birthday Party 2",
    start: new Date(2024, 3, 13, 7, 0, 0),
    end: new Date(2024, 3, 13, 10, 30, 0),
  },
  {
    title: "Birthday Party 3",
    start: new Date(2024, 3, 13, 7, 0, 0),
    end: new Date(2024, 3, 13, 10, 30, 0),
  },
  {
    title: "Late Night Event",
    start: new Date(2024, 2, 27, 19, 30, 0),
    end: new Date(2024, 2, 2, 2, 0, 0),
  },
  {
    title: "Multi-day Event",
    start: new Date(2015, 2, 20, 19, 30, 0),
    end: new Date(2015, 2, 22, 2, 0, 0),
  },
];

moment.locale("ua", {
  week: {
    dow: 1,
    doy: 1,
  },
  weekdays: [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П'ятниця",
    "Субота",
  ],
  weekdaysShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  months: [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ],
  monthsShort: [
    "Січ",
    "Лют",
    "Бер",
    "Кві",
    "Тра",
    "Чер",
    "Лип",
    "Сер",
    "Вер",
    "Жов",
    "Лис",
    "Гру",
  ],
});

let formats = {
  timeGutterFormat: "HH:mm",
};

const handleSlotSelection = () => {
  return { style: { backgroundColor: "red" } };
};
export const MyCalendar = () => {
  const theme = useSelector(selectTheme);
  const language = useSelector(selectCurrentLanguage);
  const culture = language === "en" ? "en" : "ua";
  const defaultDate = new Date();
  defaultDate.setHours(7, 0, 0);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleNoScroll = () => {
    document.body.style.overflow = selectedEvent ? "hidden" : "auto";
  };
  const handleSelectEvent = (event, e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setSelectedEvent(event);
    setPopupPosition({ x: left + 100, y: top - 100 });
    handleNoScroll();
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedEvent(null);
    }
  };
  const dayPropGetter = (date) => {
    const today = moment().startOf("day");
    const isToday = moment(date).isSame(today, "day");

    let color = "inherit";

    if (isToday) {
      color = !theme
        ? lightTheme.palette.primary.main
        : darkTheme.palette.primary.main;
    }
    return {
      style: {
        backgroundColor: "transparent",
        color: color,
      },
    };
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        formats={formats}
        culture={culture}
        components={{
          toolbar: (props) => <CustomToolbar {...props} />,
          timeGutterHeader: TimeGutterHeader,
          event: CustomEventComponent,
          week: {
            header: CustomDayComponent,
          },
        }}
        defaultView={Views.WEEK}
        scrollToTime={defaultDate}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{
          width: "100%",
          display: "flex",
          height: "90vh",
          color: !theme ? "#6b7280" : "#9ca3af",
        }}
        timeslots={2}
        selectable={true}
        popup={true}
        onSelectSlot={handleSlotSelection}
        onSelectEvent={handleSelectEvent}
        slotPropGetter={slotPropGetter}
        eventPropGetter={eventPropGetter}
        dayPropGetter={dayPropGetter}
      />
      {selectedEvent && (
        <div
          onClick={handleOverlayClick}
          style={{
            background: "transparent",
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: "100",
            top: 0,
            left: 0,
          }}
        >
          <div
            className="popup"
            style={{
              position: "absolute",
              top: popupPosition.y,
              left: popupPosition.x,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              borderRadius: "6px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              backgroundColor: !theme
                ? lightTheme.palette.background.mainPage
                : darkTheme.palette.background.mainPage,
            }}
            onClick={handleClosePopup}
          >
            <h3
              style={{
                fontWeight: "500",
                fontSize: "24px",
                lineHeight: "1.17",
              }}
            >
              {selectedEvent.title}
            </h3>
            <p
              style={{
                fontWeight: "400",
                fontSize: "18px",
                lineHeight: "1.56",
              }}
            >{`${moment(selectedEvent.start).format("hh:mm")}-${moment(
              selectedEvent.end
            ).format("hh:mm")}`}</p>
            {selectedEvent.desc && (
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "18px",
                  lineHeight: "1.55556",
                }}
              >
                {selectedEvent.desc}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const eventPropGetter = () => {
  const eventStyle = {
    backgroundColor: "#60a6fa",
    border: "none",
    outline: "none",
    padding: "8px",
  };

  return {
    style: eventStyle,
  };
};

const slotPropGetter = (date) => {
  const CURRENT_DATE = moment().toDate();
  let backgroundColor;

  if (moment(date).isBefore(CURRENT_DATE, "month")) {
    backgroundColor = "#fff";
  }

  var style = {
    backgroundColor,
  };
  return {
    style: style,
  };
};

const TimeGutterHeader = () => {
  const intl = useIntl();
  return (
    <Typography sx={(theme) => ({ ...theme.typography.text })}>
      {intl.formatMessage({ id: "schedule.week" })}
    </Typography>
  );
};
const CustomDayComponent = ({ date }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "34px",
        gap: "3px",
        marginBottom: "12px",
      }}
    >
      <div>{moment(date).format("DD")}</div>
      <div>{moment(date).format("ddd").toUpperCase()}</div>
    </div>
  );
};
const CustomEventComponent = ({ event }) => {
  const { start, end, title } = event;
  return (
    <div>
      <div>{title}</div>
      <div
        style={{
          display: "flex",
          gap: "7px",
          marginTop: "7px",
          color: "#e5e7eb",
          fontSize: "14px",
          lineHeight: "1.42857",
        }}
      >
        <Clock color="#e5e7eb" />
        <div>
          {`${moment(start).format("hh:mm")}-${moment(end).format("hh:mm")}`}
        </div>
      </div>
    </div>
  );
};

CustomEventComponent.propTypes = {
  event: PropTypes.object.isRequired,
};
CustomDayComponent.propTypes = {
  date: PropTypes.object.isRequired,
};
