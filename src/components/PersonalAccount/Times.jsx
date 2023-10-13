import React from "react";
import { useState } from "react";
import { Box, Button } from "@mui/material";

const time = ["08:00", "09:00", "10:00", "14:00", "15:00"];

function Times(props) {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);

  function displayInfo(e) {
    setInfo(true);
    setEvent(e.target.innerText);
  }

  return (
    <Box>
      {time.map((times) => {
        return (
          <Box>
            <Button onClick={(e) => displayInfo(e)}> {times} </Button>
          </Box>
        );
      })}
      <Box>
        {info
          ? `Your appointment is set to ${event} ${props.date.toDateString()}`
          : null}
      </Box>
    </Box>
  );
}

export default Times;
