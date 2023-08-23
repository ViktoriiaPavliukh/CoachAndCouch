import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

export const Filter = ({ options, getOptionLabel, label }) => {
  return (
    <Autocomplete
      id={`${label}-filter`}
      options={options}
      getOptionLabel={(option) => option.title}
      filterOptions={filterOptions}
      sx={{ width: { md: 175, xs: 164 }, fontSize: "10px" }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

