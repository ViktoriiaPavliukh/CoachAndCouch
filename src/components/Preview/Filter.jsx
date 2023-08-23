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
      // getOptionLabel={getOptionLabel}
      getOptionLabel={option => option.title}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
        />
      )}
    />
  );
};

