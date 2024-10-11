import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import moment from "moment";
import "moment/locale/uk";
import "moment/locale/en-gb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography, Button } from "@mui/material";
import { Clock } from "react-feather";
import { CancelModal } from "./CancelModal";
import { X } from "react-feather";

const CustomEventComponent = ({ event }) => {
  const { start, end, student, bookingId } = event;
  const intl = useIntl();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [eventToCancel, setEventToCancel] = useState(null);

  const studentInfo = student
    ? `${student.firstName}${student.lastName ? " " + student.lastName : ""}`
    : intl.formatMessage({ id: "noData" });

  const handleCancelEvent = (e) => {
    e.stopPropagation();
    setEventToCancel(event);
    setOpenCancelModal(true);
  };

  const onBackdropClose = () => {
    setOpenCancelModal(false);
  };

  const lesson = () => {
    return `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`;
  };

  return student ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#4185f4",
        color: "#fff",
        padding: "0px",
        cursor: "default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>{studentInfo}</Typography>
        <Button
          sx={{
            border: "none",
            backgroundColor: "transparent",
            minWidth: "24px",
            height: "24px",
            borderRadius: "50%",
            ml: "auto",
            p: "4px",
            "&:hover": { backgroundColor: "#9CA3AF" },
          }}
          onClick={handleCancelEvent}
        >
          <X style={{ color: "#fff", width: "16px", height: "16px" }} />
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Clock color="#e6e7eb" style={{ width: "12px" }} />
        <Typography sx={{ color: "#f3f4f6", fontSize: "12px" }}>
          {lesson()}
        </Typography>
      </Box>
      <CancelModal
        open={openCancelModal}
        onClose={onBackdropClose}
        event={eventToCancel}
        student={student}
        bookingId={bookingId}
        lesson={lesson()}
        setOpenCancelModal={setOpenCancelModal}
      />
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

export default CustomEventComponent;
