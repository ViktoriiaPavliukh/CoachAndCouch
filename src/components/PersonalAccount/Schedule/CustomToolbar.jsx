import { PropTypes } from "prop-types";
import { useIntl } from "react-intl";

import { Divider, FormControl, MenuItem, Select } from "@mui/material";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useEffect, useState } from "react";

export const CustomToolbar = ({ date, label, onNavigate }) => {
  const [yearFilter, setYearFilter] = useState("");
  const yearCurrent = date.getFullYear();
  const yearsArray = Array.from(
    { length: 2 * 2 + 1 },
    (_, i) => yearCurrent - 2 + i
  );

  const intl = useIntl();
  const btnArrow = { border: "none", padding: "0px" };
  const navigate = (action) => {
    console.log(action);
    onNavigate(action);
  };

  const handleYearFilterChange = (event) => {
    setYearFilter(event.target.value); // Обробник подій для оновлення стану фільтра року
  };
  useEffect(() => {
    setYearFilter(yearCurrent);
  }, [yearCurrent]);

  return (
    <div className="rbc-toolbar ">
      <div className="rbc-btn-group rbc-btn-group-flex">
        <div className="rbc-btn-group-arrows">
          <button
            type="button"
            onClick={() => navigate("PREV")}
            style={btnArrow}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => navigate("NEXT")}
            style={btnArrow}
          >
            <ChevronRight />
          </button>
        </div>
        <span className="rbc-toolbar-label">{label}</span>
        <FormControl sx={{ width: "80px", marginLeft: "20px" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={yearFilter}
            onChange={handleYearFilterChange}
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
          onClick={() => navigate("TODAY")}
          style={btnArrow}
        >
          {intl.formatMessage({ id: "schedule.today" })}
        </button>
        <Divider
          orientation="vertical"
          flexItem
          style={{ backgroundColor: "#000" }}
        />
        <button type="button" onClick={() => navigate("week")} style={btnArrow}>
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
};
