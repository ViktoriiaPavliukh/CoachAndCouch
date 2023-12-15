import { PropTypes } from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useState } from "react";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.typeoption,
});

export const Filter = ({ options, typeoption, label }) => {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  console.log(value);
  return (
    <Autocomplete
      id={`${label}-filter`}
      options={options}
      // value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
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
