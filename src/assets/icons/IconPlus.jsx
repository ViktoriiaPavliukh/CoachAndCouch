import React from "react";
import { useTheme } from "@mui/material/styles";

const IconPlus = () => {
  const theme = useTheme();
  const iconColor = theme.palette.mode === "dark" ? "#FFFFFF" : "#000000";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="fe:plus">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 13V20C13 20.2652 12.8946 20.5196 12.7071 20.7071C12.5196 20.8946 12.2652 21 12 21C11.7348 21 11.4804 20.8946 11.2929 20.7071C11.1054 20.5196 11 20.2652 11 20V13H4C3.73478 13 3.48043 12.8946 3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929C3.48043 11.1054 3.73478 11 4 11H11V4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V11H20C20.2652 11 20.5196 11.1054 20.7071 11.2929C20.8946 11.4804 21 11.7348 21 12C21 12.2652 20.8946 12.5196 20.7071 12.7071C20.5196 12.8946 20.2652 13 20 13H13Z"
          fill={iconColor}
        />
      </g>
    </svg>
  );
};

export default IconPlus;
