import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomToolbar } from "./CustomToolbar";
import { Typography } from "@mui/material";
import { Clock } from "react-feather";
import { useState } from "react";
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
});
const dayFormat = (date) => {
  // const day = moment(date).format("DD");
  // const weekDay = moment(date).format("ddd").toUpperCase();
  // return `${day} ${weekDay}`;
  return moment(date).format("DD[\n]ddd").toUpperCase();
};

let formats = {
  timeGutterFormat: "HH:mm",
  dayFormat: dayFormat,
};

const handleSlotSelection = () => {
  return { style: { backgroundColor: "red" } };
};
// const handleSelectedEvent = () => {
//   <div className="modal">{console.log("hello")}</div>;
// };

export const MyCalendar = () => {
  const defaultDate = new Date();
  defaultDate.setHours(7, 0, 0);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleSelectEvent = (event, e) => {
    const boundingBox = e.target.getBoundingClientRect();
    const x = boundingBox.left + boundingBox.width;
    const y = boundingBox.top + boundingBox.height;

    setSelectedEvent(event);
    setPopupPosition({ x, y });
  };

  const handleClosePopup = (e) => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        formats={formats}
        components={{
          toolbar: (props) => <CustomToolbar {...props} />,
          timeGutterHeader: TimeGutterHeader,
          event: CustomEventComponent,
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
          className="popup"
          style={{
            position: "absolute",
            top: popupPosition.y,
            left: popupPosition.x,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            borderRadius: "6px",
            padding: "12px",
            // backgroundColor: (theme) => theme.palette.background.mainPage,
          }}
          onClick={handleClosePopup}
        >
          <h3>{selectedEvent.title}</h3>
          <p>{selectedEvent.desc}</p>
          <button onClick={handleClosePopup}>Close</button>
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
const dayPropGetter = (date) => {
  const today = moment().startOf("day");
  const isToday = moment(date).isSame(today, "day");

  let color = "inherit";

  if (isToday) {
    color = "#0e5b1d";
    // color = (theme) => theme.palette.buttonColor.greenDark;
  }
  return {
    style: {
      backgroundColor: "transparent",
      color: color,
    },
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
          {`${moment(start).format("hh:mm")} - ${moment(end).format("hh:mm")}`}
        </div>
      </div>
    </div>
  );
};

CustomEventComponent.propTypes = {
  event: PropTypes.object.isRequired,
};
