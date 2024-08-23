import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { lightTheme, darkTheme } from "../../../styles/theme";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomToolbar } from "./CustomToolbar";
import { Box, Typography, Modal, Button } from "@mui/material";
import { Clock } from "react-feather";
import { selectTheme } from "@/redux/theme/selectors";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { selectCurrentUser } from "@/redux/users/selectors";
import {
  fetchBookings,
  fetchTeacherBookings,
  createBooking,
} from "@/redux/marketplace/bookings/operations";
import {
  selectBookings,
  selectBookingLoading,
  selectBookingError,
} from "@/redux/marketplace/bookings/selectors";
import ConfirmModal from "./ConfirmModal";

const localizer = momentLocalizer(moment);
const eventsList = [];

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

export const MyCalendar = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectBookings);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);
  const theme = useSelector(selectTheme);
  const language = useSelector(selectCurrentLanguage);
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  const culture = language === "en" ? "en" : "ua";
  const defaultDate = new Date();
  defaultDate.setHours(7, 0, 0);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [teacherSlots, setTeacherSlots] = useState([]);

  const eventsList = bookings.map((booking) => ({
    start: new Date(booking.date),
    end: new Date(
      moment(booking.date)
        .add(booking.duration, "minutes")
        .add(1, "hour")
        .toISOString()
    ),
    student: booking.student,
  }));

  useEffect(() => {
    dispatch(fetchTeacherBookings()).then((action) => {
      if (action.payload) {
        setTeacherSlots(action.payload);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const startDate = moment().startOf("week").toISOString();
    const endDate = moment().endOf("week").toISOString();
    dispatch(fetchBookings({ startDate, endDate }));
  }, [dispatch]);

  const handleSlotSelection = ({ start, end }) => {
    const now = moment();

    if (moment(start).isBefore(now)) {
      return;
    }

    if (!currentUser.advert) {
      setOpenWarningModal(true);
      return;
    }

    const formattedStart = moment(start).toISOString();
    const formattedEnd = moment(end).toISOString();
    setSelectedSlots([{ start: formattedStart, end: formattedEnd }]);

    setOpenConfirmModal(true);
  };

  const handleSelectEvent = (event, e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setSelectedEvent(event);
  };

  const handleCreateBooking = () => {
    dispatch(createBooking({ timeslots: selectedSlots })).then(() => {
      dispatch(fetchTeacherBookings()).then((action) => {
        if (action.payload) {
          setTeacherSlots(action.payload);
        }
      });
    });
    setSelectedSlots([]);
  };

  const handleCloseModal = () => {
    setOpenWarningModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? "hidden" : "auto";
  }, [selectedEvent]);

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
    const isPast = moment(date).isBefore(today, "day");

    let color = "inherit";

    if (isToday) {
      color = !theme
        ? lightTheme.palette.primary.main
        : darkTheme.palette.primary.main;
    }

    return {
      style: {
        color: isPast ? "#FFF" : color,
        pointerEvents: isPast ? "none" : "auto",
        opacity: isPast ? 0.5 : 1,
        backgroundColor: isPast ? "#aaaaaa" : "transparent",
      },
    };
  };

  const slotPropGetter = (date) => {
    const isTeacherBooking = teacherSlots.some((slot) =>
      moment(slot.date).isSame(date, "minute")
    );

    return {
      style: {
        backgroundColor: isTeacherBooking ? "#e7f1d3" : "transparent",
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
        defaultDate={new Date()}
        scrollToTime={defaultDate}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{
          width: "100%",
          display: "flex",
          height: "100%",
          color: !theme ? "#6b7280" : "#9ca3af",
        }}
        timeslots={1}
        selectable
        popup={true}
        step={60}
        onSelectSlot={handleSlotSelection}
        onSelectEvent={handleSelectEvent}
        slotPropGetter={slotPropGetter}
        eventPropGetter={eventPropGetter}
        dayPropGetter={dayPropGetter}
        onSelecting={(slotInfo) => handleSlotSelection(slotInfo)}
      />
      <ConfirmModal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={handleCreateBooking}
        slot={selectedSlots[0]}
      />
      <Modal
        open={openWarningModal}
        onClose={handleCloseModal}
        aria-labelledby="teacher-only-warning"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography id="teacher-only-warning" variant="h6">
            Only teachers can add slots.
          </Typography>
          <Button
            type="button"
            variant="contained"
            onClick={handleCloseModal}
            sx={{ mt: "10px" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const eventPropGetter = (event) => {
  const eventStyle = {
    backgroundColor: event.student ? "#4185f4" : "transparent",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    height: "50px",
    padding: "10px 10px 60px",
  };

  return {
    style: eventStyle,
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
  const { start, end, student } = event;

  const studentInfo = student
    ? `${student.firstName} ${student.lastName}`
    : null;

  return studentInfo ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        backgroundColor: "#4185f4",
        color: "#fff",
        borderRadius: "4px",
        padding: "0px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{studentInfo}</Typography>
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Clock color="#e6e7eb" />
        <Typography sx={{ color: "#f3f4f6" }}>{`${moment(start).format(
          "HH:mm"
        )} - ${moment(end).format("HH:mm")}`}</Typography>
      </Box>
    </Box>
  ) : null;
};

CustomEventComponent.propTypes = {
  event: PropTypes.shape({
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
    student: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }).isRequired,
};
CustomDayComponent.propTypes = {
  date: PropTypes.object.isRequired,
};
