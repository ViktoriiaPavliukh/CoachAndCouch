import { endOfWeek, format } from "date-fns";
import { Shedule } from "./Shedule";
import { Button } from "@mui/material";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

function getCurrentMonday() {
  const now = new Date();
  const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let mon = new Date(currentDay);
  mon.setDate(mon.getDate() - (mon.getDay() == 0 ? 7 : mon.getDay()) + 1);

  return mon;
}

// api/teacher/<id>/get-free-schedule/<week> <- monday
const response = [
  "2024-04-11 17:00",
  "2024-04-14 18:00",
  "2024-04-12 19:00",
  "2024-04-11 21:00",
];

export const TrialLessonWrapper = () => {
  const [selected, setSelected] = useState();
  const [monday, setMonday] = useState(getCurrentMonday());

  // request...
  const schedule = new Map();
  for (const d of response) {
    const date = new Date(d);
    const day = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();

    let hours = schedule.get(day);
    if (!hours) {
      hours = new Set();
      schedule.set(day, hours);
    }

    hours.add(date.getHours());
  }

  const now = new Date();
  let week = [];

  for (let i = 0; i < 7; i++) {
    let day = new Date(monday);
    day.setDate(day.getDate() + i);
    week.push(day);
  }

  const shiftWeek = (value) => {
    const date = new Date(monday);
    date.setDate(date.getDate() + 7 * value);
    setMonday(date);
  };

  const getSelectedHour = (d) => {
    if (!selected) return null;
    if (isSameDay(selected, d)) return selected.getHours();
    return null;
  };

  const getAvailableHours = (d) => {
    return schedule.get(d.getTime()) ?? new Set();
  };

  const isSameDay = (a, b) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  const sunday = endOfWeek(monday, { weekStartsOn: 1 });
  const formattedRange = `${format(monday, "dd")} - ${format(
    sunday,
    "dd"
  )} ${format(monday, "MMMM").toLowerCase()}`;

  const btnArrow = {
    border: "none",
    padding: "0px",
    backgroundColor: "transparent",
    // color: !theme
    //   ? lightTheme.palette.textColor.fontColor
    //   : darkTheme.palette.textColor.fontColor,
  };

  console.log(week);

  return (
    <div
      style={{
        width: "800px",
        height: "600px",
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: "white",
        transform: "translate(-50%,-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "48px 48px 134px 48px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            gap: "20px",
            alignSelf: "center",
          }}
        >
          <button
            style={btnArrow}
            onClick={() => shiftWeek(-1)}
            disabled={monday <= now}
          >
            <ChevronLeft color="#000" />
          </button>
          <div>{formattedRange}</div>
          <button style={btnArrow} onClick={() => shiftWeek(+1)}>
            {" "}
            <ChevronRight color="#000" />
          </button>
          <div>{format(now, "yyyy")}</div>
        </div>

        <ul
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {week.map((el, idx) => (
            <li key={idx}>
              <button
                style={{
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                  // backgroundColor: isSameDay(now, el) ? "green" : "transparent",
                  color: isSameDay(now, el) ? "#0E5B1D" : "#4b5563",
                  padding: 0,
                  width: "50px",
                }}
              >
                <p>{format(el, "EE")}</p>
                <p>{format(el, "dd")}</p>
              </button>
            </li>
          ))}
        </ul>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            // width: "450px",
            justifyContent: "space-between",
            gap: "39px",
            // height: "250px",
            // overflowY: "scroll",
          }}
        >
          {week.map((el, idx) => (
            <li key={idx} style={{ display: "block" }}>
              <Shedule
                day={el}
                hour={getSelectedHour(el)}
                availableHours={getAvailableHours(el)}
                scheduleChanged={setSelected}
              />
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant="contained"
          sx={{
            p: "12px 24px",
            alignSelf: "center",
            width: { xs: "100%", md: "fit-content" },
          }}
        >
          Далі
        </Button>
      </div>
    </div>
  );
};
