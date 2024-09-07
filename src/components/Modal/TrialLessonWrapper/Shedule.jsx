import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";

export const Shedule = ({ day, hour, availableHours, scheduleChanged }) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const now = new Date();
  let shedule = [];
  for (let i = 7; i < 24; i++) {
    shedule.push(i);
  }

  const handlerSheduleClick = (h) => {
    const date = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h);
    scheduleChanged(date);
    setSelectedHour(h);
  };

  const isDisabled = (h) => {
    const date = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h);
    return date <= now || !availableHours.has(h);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {shedule.map((sh, idx) => (
        <Button
          disabled={isDisabled(sh)}
          onClick={() => {
            handlerSheduleClick(sh);
          }}
          sx={{
            minWidth: "50px",
            border: "none",
            backgroundColor:
              selectedHour === sh
                ? (theme) => theme.palette.primary.main
                : isDisabled(sh)
                ? (theme) => theme.palette.buttonColor.disabled
                : "transparent",
            padding: 0,
            maxWidth: "50px",
            color:
              selectedHour === sh
                ? (theme) => theme.palette.textColor.header
                : isDisabled(sh)
                ? (theme) => theme.palette.textColor.disabled
                : (theme) => theme.palette.textColor.title,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.main,
              color: "white",
            },
          }}
          key={idx}
        >{`${sh.toString().padStart(2, "0")}:00`}</Button>
      ))}
    </Box>
  );
};
Shedule.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  hour: PropTypes.number,
  availableHours: PropTypes.instanceOf(Set).isRequired,
  scheduleChanged: PropTypes.func.isRequired,
};
