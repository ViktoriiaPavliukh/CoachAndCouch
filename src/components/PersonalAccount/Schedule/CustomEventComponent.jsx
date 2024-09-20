import React, { useEffect, useState} from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import moment from "moment";
import "moment/locale/uk";
import "moment/locale/en-gb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography, Button } from "@mui/material";
import { Clock } from "react-feather";
import { CancelModal } from "./CancelModal";
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
    alert("Need action on Backend side");
    setEventToCancel(event);
  };

  const onBackdropClose = () => {
    setOpenCancelModal(false);
    console.log(openCancelModal);
    console.log("Closing cancel modal");
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
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{studentInfo}</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {isHovered ? (
          <Button
            onClick={handleCancelEvent}
            sx={{
              color: "#fff",
              "&:hover": {
                color: "#ff0000",
              },
            }}
          >
            {intl.formatMessage({ id: "cancelBtn" })}
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Clock color="#e6e7eb" />
            <Typography sx={{ color: "#f3f4f6" }}>
              {`${moment(start).format("HH:mm")} - ${moment(end).format(
                "HH:mm"
              )}`}
            </Typography>
          </Box>
        )}
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

export default CustomEventComponent;
