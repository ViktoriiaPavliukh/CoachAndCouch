import { PropTypes } from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useState } from "react";

export const Filter = ({ options, typeoption, label, onFilterChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option[typeoption] || query,
  });
  return (
    <Autocomplete
      id={`${label}-filter`}
      freeSolo
      options={options}
      clearOnBlur
      // value={value}
      onChange={(event, newValue) => {
        console.log(newValue?.id || "null");
        console.log(query);
        if (newValue) {
          onFilterChange(newValue.id);
        } else {
          onFilterChange("");
        }
      }}
      isOptionEqualToValue={(option, newValue) => {
        return option.id === newValue.id;
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        // if (reason === "reset") {
        //   setInputValue("");
        //   setQuery("");
        // } else {
        // console.log(event.target.value);
        setInputValue(newInputValue);
        setQuery(event.target.value);
        console.log(query);
        // }
      }}
      getOptionLabel={(option) => {
        return option[typeoption];
      }}
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
  onFilterChange: PropTypes.func,
};
