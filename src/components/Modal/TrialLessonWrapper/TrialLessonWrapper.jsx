import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherSlots } from "@/redux/marketplace/bookings/operations";
import {
  selectTeacherBookings,
  selectTeacherBookingsError,
  selectTeacherBookingsLoading,
} from "@/redux/marketplace/bookings/selectors";
import { endOfWeek, format } from "date-fns";
import { Shedule } from "./Shedule";
import { Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "react-feather";

function getCurrentMonday() {
  const now = new Date();
  const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let mon = new Date(currentDay);
  mon.setDate(mon.getDate() - (mon.getDay() === 0 ? 7 : mon.getDay()) + 1);

  return mon;
}

export const TrialLessonWrapper = ({ id, teacherBookings }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectTeacherBookingsLoading);
  const error = useSelector(selectTeacherBookingsError);
  const [selected, setSelected] = useState(null);
  const [monday, setMonday] = useState(getCurrentMonday());
  const [schedule, setSchedule] = useState(new Map());

  useEffect(() => {
    if (teacherBookings.length > 0) {
      const newSchedule = new Map();
      teacherBookings.forEach((slot) => {
        const date = new Date(slot.date);
        if (!isNaN(date)) {
          const day = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          ).getTime();
          let hours = newSchedule.get(day);
          if (!hours) {
            hours = new Set();
            newSchedule.set(day, hours);
          }
          hours.add(date.getHours());
        }
      });
      setSchedule(newSchedule);
    }
  }, [teacherBookings]);

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
    const availableHours = schedule.get(d.getTime()) ?? new Set();
    return availableHours;
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
    color: "#000",
  };

  return (
    <div
      style={{
        width: "800px",
        height: "80vh",
        position: "absolute",
        top: "55%",
        left: "50%",
        backgroundColor: "white",
        transform: "translate(-50%,-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "48px 48px 134px 48px",
        overflowY: "auto",
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
            <ChevronLeft />
          </button>
          <div>{formattedRange}</div>
          <button style={btnArrow} onClick={() => shiftWeek(+1)}>
            <ChevronRight />
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
            justifyContent: "space-between",
            gap: "39px",
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
