import { TextField, Box, MenuItem, Typography, Button, Stack } from "@mui/material";
import {
  languageOptions,
  ratingOptions,
  lessonTimeOptions,
  hobbyOptions,
  countryOptions,
  specializationOptions,
  //teacherCardData,
} from "@/defaults";

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
          p: "40px",
          borderRadius: "12px",
        }}
      >
        <Typography variant="posterTitle">АНКЕТА ВИКЛАДАЧА</Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            maxWidth: "900px",
            flexWrap: "wrap",
            justifyContent: "space-between",
            mt: "40px",
            mb: "20px",
            "& > :not(style)": { width: "49%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Ім'я" variant="outlined" />
          <TextField id="outlined-basic" label="Прізвище" variant="outlined" />
        </Box>
        <Box
          component="form"
          sx={{
            display: "flex",
            maxWidth: "900px",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "20px",
            "& > :not(style)": { m: 0, width: "31%" },
          }}
          noValidate
          autoComplete="off"
        >
          {/* <div> */}
          <TextField
            id="outlined-select-language"
            select
            label="Країна"
            // defaultValue="Україна"
            // helperText="Виберіть країну проживання"
          >
            {countryOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="outlined-select-age" select label="Дата народження">
            {countryOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="outlined-select-sex" select label="Стать">
            {countryOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-languages"
            select
            label="Мови викладання"
          >
            {languageOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-specialization"
            select
            label="Спеціалізація"
          >
            {specializationOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="outlined-select-hobbies" select label="Захоплення">
            {hobbyOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="outlined-select-time" select label="Час роботи">
            {countryOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="outlined-select-platforms" select label="Платформи">
            {countryOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-certificates"
            select
            label="Сертифікати"
          >
            {countryOptions.map((option) => (
              <MenuItem key={option.code} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}
        >
          <Button variant="contained">Опублікувати</Button>
          <Button variant="outlined">Зберегти чернетку</Button>
        </Stack>
      </Box>
    </Box>
  );
}
