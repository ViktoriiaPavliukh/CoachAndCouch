import PropTypes from "prop-types";
import { Button } from "@mui/material";

export const Shedule = ({ day, hour, availableHours, scheduleChanged }) => {
  const now = new Date();
  let shedule = [];
  for (let i = 10; i < 19; i++) {
    shedule.push(i);
  }

  const handlerSheduleClick = (h) => {
    const date = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h);
    scheduleChanged(date);
  };

  const isDisabled = (h) => {
    const date = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h);
    return date <= now || !availableHours.has(h);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {shedule.map((sh, idx) => (
        <Button
          disabled={isDisabled(sh)}
          onClick={() => {
            handlerSheduleClick(sh);
          }}
          sx={{
            minWidth: "50px",
            border: "none",
            backgroundColor: sh === hour ? "transparent" : "#e5e5e5",
            padding: 0,
            maxWidth: "50px",
            color: sh === hour ? "#000" : "#6b7280",
            "&:hover": {
              backgroundColor: "red",
              color: "white",
            },
          }}
          key={idx}
        >{`${sh.toString().padStart(2, "0")}:00`}</Button>
      ))}
    </div>
  );
};
Shedule.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  hour: PropTypes.number,
  availableHours: PropTypes.instanceOf(Set).isRequired,
  scheduleChanged: PropTypes.func.isRequired,
};
