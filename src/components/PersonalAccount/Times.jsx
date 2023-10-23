import { PropTypes } from "prop-types";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
const time = ["08:00", "09:00", "10:00", "14:00", "15:00"];

function Times({ date }) {
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
          <Box key={uuidv4()}>
            <Button onClick={(e) => displayInfo(e)}> {times} </Button>
          </Box>
        );
      })}
      <Box>{info ? `Your appointment is set to ${event} ${date.toDateString()}` : null}</Box>
    </Box>
  );
}
Times.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
};
export default Times;
