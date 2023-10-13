import { useState } from "react";
import { Box } from "@mui/material";

import Times from "./Times";

import React from "react";

function Time(props) {
  return <Box>{props.showTime ? <Times date={props.date} /> : null}</Box>;
}

export default Time;
