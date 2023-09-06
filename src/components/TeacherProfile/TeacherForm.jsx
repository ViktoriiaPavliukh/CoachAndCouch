import { TextField, Box, MenuItem, Typography } from "@mui/material";
import { countryOptions } from "../../defaults/index";

import tablesBg from "@assets/images/tables.jpeg";

// const currencies = [
//   {
//     value: "Ім'я",
//     label: "Ім'я",
//   },
//   {
//     value: "Прізвіще",
//     label: "€",
//   },
//   {
//     value: "BTC",
//     label: "฿",
//   },
//   {
//     value: "JPY",
//     label: "¥",
//   },
// ];

export function TeacherForm() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${tablesBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
        }}
      >
        <Typography>АНКЕТА ВИКЛАДАЧА</Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "349px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Ім'я" variant="outlined" />
          <TextField id="outlined-basic" label="Прізвіще" variant="outlined" />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "274px" },
          }}
          noValidate
          autoComplete="off"
        >
          {/* <div> */}
          <TextField
            id="outlined-select-language"
            select
            label="Країна"
            defaultValue="Україна"
            // helperText="Виберіть країну проживання"
          >
            {countryOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-age"
            select
            label="Вік"
            // helperText="Виберіть країну проживання"
          >
            {countryOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          {/* <TextField
              id="outlined-select-currency-native"
              select
              label="Native select"
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="filled-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
              variant="filled"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="filled-select-currency-native"
              select
              label="Native select"
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
              variant="filled"
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="standard-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
              variant="standard"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency-native"
              select
              label="Native select"
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
              variant="standard"
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField> */}
          {/* </div> */}
        </Box>
      </Box>
    </Box>
  );
}
