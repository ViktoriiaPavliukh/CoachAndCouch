import { PropTypes } from "prop-types";
import { useIntl } from "react-intl";
import { lightTheme, darkTheme } from "../../../styles/theme";
import moment from "moment";
import "moment/locale/uk";
import { Divider, FormControl, MenuItem, Select } from "@mui/material";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "@/redux/theme/selectors";

export const CustomToolbar = ({
  date,
  label,
  onNavigate,
  onView,
  handleYearFilterChange,
}) => {
  const theme = useSelector(selectTheme);
  const [yearFilter, setYearFilter] = useState("");
  const yearCurrent = date.getFullYear();
  const yearsArray = Array.from(
    { length: 2 * 2 + 1 },
    (_, i) => yearCurrent - 2 + i
  );
  const intl = useIntl();
  const btnArrow = {
    border: "none",
    padding: "0px",
    color: !theme
      ? lightTheme.palette.textColor.fontColor
      : darkTheme.palette.textColor.fontColor,
  };

  const onHandleYearFilterChange = (event) => {
    const newYearFilter = event.target.value;
    setYearFilter(newYearFilter);
    handleYearFilterChange(newYearFilter);
  };
  useEffect(() => {
    setYearFilter(yearCurrent);
  }, [yearCurrent]);

  const formatLabel = () => {
    moment.locale("uk");
    const view = onView.name; // Check the view name (month, week, day, etc.)
    if (view === "month") {
      return moment(date).format("MMMM YYYY");
    } else if (view === "week") {
      const startOfWeek = moment(date).startOf("week").format("D MMM");
      const endOfWeek = moment(date).endOf("week").format("D MMM YYYY");
      return `${startOfWeek} - ${endOfWeek}`;
    } else {
      return label; // Default to the provided label for other views
    }
  };
  return (
    <div className="rbc-toolbar ">
      <div className="rbc-btn-group rbc-btn-group-flex">
        <div className="rbc-btn-group-arrows">
          <button
            type="button"
            onClick={() => onNavigate("PREV")}
            style={btnArrow}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("NEXT")}
            style={btnArrow}
          >
            <ChevronRight />
          </button>
        </div>
        <span
          className="rbc-toolbar-label"
          style={{
            color: !theme
              ? lightTheme.palette.textColor.fontColor
              : darkTheme.palette.textColor.fontColor,
          }}
        >
          {formatLabel()}
        </span>
        <FormControl sx={{ width: "80px", marginLeft: "20px" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={yearFilter}
            onChange={onHandleYearFilterChange}
            sx={{
              "& .MuiSelect-select": {
                padding: 0,
              },
              "& .MuiInputBase-input": {
                p: 0,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
                outline: "none",
              },
            }}
          >
            {yearsArray.map((year) => (
              <MenuItem value={year} key={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="rbc-btn-group rbc-btn-group-flex">
        <button
          type="button"
          onClick={() => onNavigate("TODAY")}
          style={btnArrow}
        >
          {intl.formatMessage({ id: "schedule.today" })}
        </button>
        <Divider
          orientation="vertical"
          flexItem
          style={{
            backgroundColor: !theme
              ? lightTheme.palette.textColor.fontColor
              : darkTheme.palette.textColor.fontColor,
          }}
        />
        <button type="button" onClick={() => onView("week")} style={btnArrow}>
          {intl.formatMessage({ id: "schedule.week" })}
        </button>
      </div>
    </div>
  );
};
CustomToolbar.propTypes = {
  date: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  onNavigate: PropTypes.func,
  onView: PropTypes.func,
  handleYearFilterChange: PropTypes.func,
};
