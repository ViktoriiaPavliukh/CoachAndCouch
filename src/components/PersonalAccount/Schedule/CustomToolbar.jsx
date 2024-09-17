import { PropTypes } from "prop-types";
import { useIntl } from "react-intl";
import { lightTheme, darkTheme } from "../../../styles/theme";
import moment from "moment";
import "moment/locale/uk";
import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  IconButton,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
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
    color: !theme
      ? lightTheme.palette.textColor.fontColor
      : darkTheme.palette.textColor.fontColor,
  };

  const onHandleYearFilterChange = (event) => {
    const newYearFilter = event.target.value;
    setYearFilter(newYearFilter);
    console.log("Selected Year:", newYearFilter);
    handleYearFilterChange(newYearFilter);
  };

  useEffect(() => {
    setYearFilter(yearCurrent);
  }, [yearCurrent]);

  const formatLabel = () => {
    moment.locale("uk");
    const view = onView.name;
    if (view === "month") {
      return moment(date).format("MMMM YYYY");
    } else if (view === "week") {
      const startOfWeek = moment(date).startOf("week").format("D MMM");
      const endOfWeek = moment(date).endOf("week").format("D MMM YYYY");
      return `${startOfWeek} - ${endOfWeek}`;
    } else {
      return label;
    }
  };

  return (
    <Box sx={{ display: "flex", mb: "46px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box sx={{ display: "flex", gap: "20px" }}>
          <IconButton onClick={() => onNavigate("PREV")} sx={btnArrow}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={() => onNavigate("NEXT")} sx={btnArrow}>
            <ChevronRight />
          </IconButton>
        </Box>
        <Typography
          sx={{
            color: !theme
              ? lightTheme.palette.textColor.fontColor
              : darkTheme.palette.textColor.fontColor,
          }}
        >
          {formatLabel()}
        </Typography>
        <FormControl sx={{ width: "80px", marginLeft: "20px" }}>
          <Select
            labelId="year-select-label"
            id="year-select"
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
      </Box>
    </Box>
  );
};

CustomToolbar.propTypes = {
  date: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  onNavigate: PropTypes.func,
  onView: PropTypes.func,
  handleYearFilterChange: PropTypes.func,
};
