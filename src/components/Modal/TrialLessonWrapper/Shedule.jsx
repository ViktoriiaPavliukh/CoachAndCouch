import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useState } from "react";

export const Shedule = ({ day }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHour, setHour] = useState("");
  console.log(isSelected);
  let shedule = [];
  for (let i = 0; i < 24; i++) {
    shedule.push(i);
  }
  const handlerSheduleClick = (day, hour) => {
    setIsSelected((prev) => !prev.isSelected);
    setHour(hour);
    console.log("your reservation on:", day.toJSON(), `${hour.toString().padStart(2, "0")}:00`);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {shedule.map((sh, idx) => (
        <Button
          onClick={() => {
            handlerSheduleClick(day, sh);
          }}
          sx={{
            minWidth: "50px",
            border: "none",
            backgroundColor: isSelected && sh == isHour ? "lime" : "transparent",
            padding: 0,
            maxWidth: "50px",
            color: "gray",
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
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
};
