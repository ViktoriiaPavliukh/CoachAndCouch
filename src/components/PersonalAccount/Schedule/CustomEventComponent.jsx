import React, { useEffect, useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";

const CustomEventComponent = ({ event }) => {
  const { start, end, student } = event;
  const intl = useIntl();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [eventToCancel, setEventToCancel] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const studentInfo = student
    ? `${student.firstName}${student.lastName ? " " + student.lastName : ""}`
    : "No student info";

  const handleCancelEvent = (e) => {
    e.stopPropagation();
    setEventToCancel(event);
    setOpenCancelModal(true);
  };

  const onBackdropClose = () => {
    setOpenCancelModal(false);
  };

  const onConfirm = () => {
    alert("need backend action");
    setOpenCancelModal(false);
  };

  const lesson = () => {
    return `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`;
  };


  return student ? (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        backgroundColor: "#4185f4",
        color: "#fff",
        borderRadius: "4px",
        padding: "0px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
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
        onConfirm={onConfirm}
        lesson={lesson()}
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
