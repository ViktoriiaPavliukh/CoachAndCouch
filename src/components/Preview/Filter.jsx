import { PropTypes } from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.typeoption,
});

export const Filter = ({ options, typeoption, label }) => {
  return (
    <Autocomplete
      id={`${label}-filter`}
      options={options}
      getOptionLabel={(options) => options[typeoption]}
      filterOptions={filterOptions}
      sx={{ minWidth: { md: 274, xs: 180 }, fontSize: "10px" }}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option[typeoption]}
          </li>
        );
      }}
    />
  );
};

Filter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      typeoption: PropTypes.string,
      time: PropTypes.number,
    })
  ),
  typeoption: PropTypes.string,
  label: PropTypes.string,
  getOptionLabel: PropTypes.string,
};
