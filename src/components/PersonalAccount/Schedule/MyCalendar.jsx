import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomToolbar } from "./CustomToolbar";
import { Typography } from "@mui/material";
import { Clock } from "react-feather";
const localizer = momentLocalizer(moment);
const eventsList = [
  {
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2024, 2, 23),
    end: new Date(2024, 2, 23),
  },
  {
    title: "Long Event",
    start: new Date(2024, 2, 26),
    end: new Date(2024, 2, 36),
  },

  {
    title: "DTS STARTS",
    start: new Date(2024, 2, 11, 0, 0, 0),
    end: new Date(2024, 2, 11, 0, 0, 0),
  },

  {
    title: "DTS ENDS",
    start: new Date(2024, 2, 25, 0, 0, 0),
    end: new Date(2024, 2, 30, 0, 0, 0),
  },

  {
    title: "Some Event",
    start: new Date(2024, 2, 20, 0, 0, 0),
    end: new Date(2024, 2, 20, 0, 0, 0),
  },
  {
    title: "Conference",
    start: new Date(2024, 2, 11),
    end: new Date(2024, 2, 13),
    desc: "Big conference for important people",
  },
  {
    title: "Meeting",
    start: new Date(2024, 2, 20, 10, 30, 0, 0),
    end: new Date(2024, 2, 20, 12, 30, 0, 0),
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
    start: new Date(2024, 3, 17, 19, 30, 0),
    end: new Date(2024, 3, 18, 2, 0, 0),
  },
  {
    title: "Multi-day Event",
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
];

moment.locale("ua", {
  week: {
    dow: 1,
    doy: 1,
  },
});
const dayFormat = (date) => {
  return `${moment(date).format("DD")}\n${moment(date)
    .format("ddd")
    .toUpperCase()}`;
};

const eventFormat = ({ start, end }, culture, localizer) =>
  `${localizer.format(start, "hh:mm", culture)} - ${localizer.format(
    end,
    "hh:mm",
    culture
  )}`;

let formats = {
  timeGutterFormat: "hh:mm",
  dayFormat: dayFormat,
  eventTimeRangeFormat: eventFormat,
};

const handleSlotSelection = () => {
  return { style: { backgroundColor: "red" } };
};
export const MyCalendar = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        formats={formats}
        components={{
          // dateCellWrapper: DateCellWrapper,
          toolbar: (props) => <CustomToolbar {...props} />,
          timeGutterHeader: TimeGutterHeader,
          event: CustomEventComponent,
        }}
        defaultView={Views.WEEK}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{
          width: "100%",
          display: "flex",
          paddingTop: "20px",
          height: "90vh",
        }}
        timeslots={2}
        selectable={true}
        popup
        onSelectSlot={handleSlotSelection}
        slotPropGetter={slotPropGetter}
        eventPropGetter={eventPropGetter}
        dayPropGetter={dayPropGetter}
      />
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
// const DateCellWrapper = ({ children }) => {
//   const style = {
//     backgroundColor: "red",
//   };

//   return <div style={style}>{children}</div>;
// };

const TimeGutterHeader = () => {
  const intl = useIntl();
  return (
    <Typography sx={(theme) => ({ ...theme.typography.text })}>
      {intl.formatMessage({ id: "schedule.week" })}
    </Typography>
  );
};

const CustomEventComponent = ({ event }) => {
  console.log(event);
  const { start, end, title } = event;
  return (
    <div>
      <div>{title}</div>
      <div style={{ display: "flex", gap: "7px", marginTop: "7px" }}>
        <Clock />
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
