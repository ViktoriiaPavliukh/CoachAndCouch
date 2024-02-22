import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, FormControlLabel } from "@mui/material";
import { Stack } from "@mui/system";
import { useIntl } from "react-intl";
import { changeTheme } from "@/redux/theme/slice";
import { GreenSwitch } from "../GreenSwitch/GreenSwitch";

export const Settings = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const isDarkTheme = useSelector((state) => state.theme.value);

  const handleChange = () => {
    setChecked(event.target.checked);
    dispatch(changeTheme());
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: { xs: "91%", md: "84%", lg: "61%", xl: "46%" },
        margin: "0 auto",
        mt: { xs: "45px", md: "105px", lg: "158px", xl: "186px" },
        padding: { xs: "96px" },
        backgroundColor: (theme) => theme.palette.background.sidebar,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: {
            xs: "20px",
            sm: "20px",
            md: "300px",
            lg: "600px",
            xl: "300px",
          },
        }}
      >
        <Typography> {intl.formatMessage({ id: "theme" })}</Typography>
        <FormControlLabel
          control={
            <GreenSwitch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={checked ? "Dark" : "Light"}
        />
      </Stack>
    </Box>
  );
};
