import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: (theme) => theme.palette.buttonColor.themeSwitch,
  },
  "& .MuiSwitch-switchBase": {
    color: theme.palette.buttonColor.themeSwitch,
  },
  "& .MuiSwitch-thumb": {
    color: theme.palette.buttonColor.themeSwitch,
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.buttonColor.themeSwitch,
    color: theme.palette.buttonColor.themeSwitch,
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.accent,
  },
}));
