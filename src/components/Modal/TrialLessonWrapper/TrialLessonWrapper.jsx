import { format } from "date-fns";
import { Shedule } from "./Shedule";
import { Button } from "@mui/material";
import { useState } from "react";

function getCurrentMonday() {
  const now = new Date();
  const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let mon = new Date(currentDay);
  mon.setDate(mon.getDate() - (mon.getDay() == 0 ? 7 : mon.getDay()) + 1);

  return mon;
}

// api/teacher/<id>/get-free-schedule/<week> <- monday
const response = ["2023-12-18 17:00", "2023-12-18 18:00", "2023-12-18 19:00", "2023-12-17 21:00"];

export const TrialLessonWrapper = () => {
  const [selected, setSelected] = useState();
  const [monday, setMonday] = useState(getCurrentMonday());

  // request...
  const schedule = new Map();
  for (const d of response) {
    const date = new Date(d);
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

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
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: "white",
        transform: "translate(-50%,-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px",
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
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", gap: "20px", alignSelf: "center" }}>
          <button onClick={() => shiftWeek(-1)} disabled={monday <= now}>
            prev
          </button>
          <div>{format(monday, "MMM yyyy")}</div>
          <button onClick={() => shiftWeek(+1)}>next</button>
          <button onClick={() => setMonday(getCurrentMonday())}>today</button>
        </div>

        <ul style={{ display: "flex", justifyContent: "space-between", width: "435px" }}>
          {week.map((el, idx) => (
            <li key={idx}>
              <button
                style={{
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: isSameDay(now, el) ? "green" : "transparent",
                  color: isSameDay(now, el) ? "white" : "inherit",
                  padding: 0,
                  width: "50px",
                }}
              >
                {format(el, "dd")}
              </button>
            </li>
          ))}
        </ul>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",

            width: "450px",
            justifyContent: "space-between",
            height: "250px",
            overflowY: "scroll",
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
          sx={{ p: "12px 24px", alignSelf: "center", width: { xs: "100%", md: "fit-content" } }}
        >
          Далі
        </Button>
      </div>
    </div>
  );
};
