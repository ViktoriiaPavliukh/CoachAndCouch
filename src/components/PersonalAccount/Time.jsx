import { Box } from "@mui/material";
import { PropTypes } from "prop-types";
import Times from "./Times";

function Time({ showTime, date }) {
  return <Box>{showTime ? <Times date={date} /> : null}</Box>;
}
Time.propTypes = {
  showTime: PropTypes.bool,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
};
export default Time;
