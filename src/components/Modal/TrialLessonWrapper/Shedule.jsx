import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";

export const Shedule = ({ day, hour, availableHours, scheduleChanged }) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const now = new Date();
  const shedule = Array.from({ length: 17 }, (_, i) => i + 7);
 
  const handlerSheduleClick = (h) => {
    if (selectedHour === h) {
      setSelectedHour(null);
      scheduleChanged(null); 
    } else {
      setSelectedHour(h);
      const date = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        h
      );
      scheduleChanged(date);
    }
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
        gap: { xs: "12px", md: "20px" },
        flexWrap: "nowrap",
      }}
    >
      {shedule.map((sh, idx) => (
        <Button
          disabled={isDisabled(sh)}
          onClick={() => {
            handlerSheduleClick(sh);
          }}
          sx={{
            minWidth: { xs: "40px", md: "57px", lg: "69px" },
            fontSize: { xs: "14px", md: "20px" },
            borderRadius: "4px",
            backgroundColor:
              selectedHour === sh
                ? (theme) => theme.palette.buttonColor.header
                : isDisabled(sh)
                ? (theme) => theme.palette.buttonColor.disabled
                : "transparent",
            padding: 0,
            maxWidth: { md: "50px" },
            color:
              selectedHour === sh
                ? (theme) => theme.palette.textColor.black
                : isDisabled(sh)
                ? (theme) => theme.palette.textColor.disabled
                : (theme) => theme.palette.textColor.title,
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.buttonColor.lightYellowHover,
              color: (theme) => theme.palette.textColor.black,
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
