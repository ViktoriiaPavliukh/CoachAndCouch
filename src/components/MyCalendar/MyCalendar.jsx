import PropTypes from "prop-types";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Children, cloneElement } from "react";
const localizer = momentLocalizer(moment);
const eventsList = [
  {
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2023, 12, 0),
    end: new Date(2023, 12, 1),
  },
  {
    title: "Long Event",
    start: new Date(2023, 12, 7),
    end: new Date(2023, 12, 10),
  },

  {
    title: "DTS STARTS",
    start: new Date(2023, 12, 13, 0, 0, 0),
    end: new Date(2023, 12, 20, 0, 0, 0),
  },

  {
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    title: "Some Event",
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 9, 0, 0, 0),
  },
  {
    title: "Conference",
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: "Big conference for important people",
  },
  {
    title: "Meeting",
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    title: "Lunch",
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    title: "Meeting",
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    title: "Happy Hour",
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    title: "Dinner",
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    title: "Birthday Party",
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    title: "Birthday Party 2",
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    title: "Birthday Party 3",
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    title: "Late Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
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

const handleSlotSelection = ({ start, end, action }) => {
  return { style: { backgroundColor: "red" } };
};
export const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      components={{
        dateCellWrapper: DateCellWrapper,
      }}
      defaultView={Views.WEEK}
      events={eventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ width: "100%", display: "flex", paddingTop: "20px", height: "75vh" }}
      timeslots={2}
      selectable={true}
      popup
      onSelectSlot={handleSlotSelection}
      slotPropGetter={slotPropGetter}
    />
  </div>
);

const slotPropGetter = (date) => {
  const CURRENT_DATE = moment().toDate();
  let backgroundColor;

  if (moment(date).isBefore(CURRENT_DATE, "month")) {
    backgroundColor = "#f7f8f9";
  }

  var style = {
    backgroundColor,
  };
  return {
    style: style,
  };
};
const DateCellWrapper = ({ children }) => {
  console.log("DateCellWrapper");
  const style = {
    backgroundColor: "#000",
  };

  return <div style={style}>{children}</div>;
};

DateCellWrapper.propTypes = {
  children: PropTypes.any.isRequired,
};
