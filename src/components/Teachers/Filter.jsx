import { PropTypes } from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

export const Filter = ({
  options,
  typeoption,
  label,
  onFilterChange,
  currentInputId,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option[typeoption] || query,
  });
  useEffect(() => {
    if (currentInputId === "") {
      setInputValue("") && setQuery("");
    }
  }, [currentInputId]);
  return (
    <Autocomplete
      id={`${label}-filter`}
      freeSolo
      options={options}
      clearOnBlur
      onChange={(event, newValue, reason) => {
        if (newValue && reason !== "reset") {
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
        setInputValue(newInputValue);
        setQuery(event.target.value);
      }}
      getOptionLabel={(option) => {
        return option[typeoption];
      }}
      filterOptions={filterOptions}
      sx={{
        minWidth: { xs: 180, sm: 343, md: 304, lg: 300, xl: 420 },
        fontSize: "10px",
      }}
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
  currentInputId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null, undefined, ""]),
  ]),
};
