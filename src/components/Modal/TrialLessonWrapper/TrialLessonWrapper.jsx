import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { uk, enUS } from "date-fns/locale";
import {
  selectTeacherBookingsError,
  selectTeacherBookingsLoading,
} from "@/redux/marketplace/bookings/selectors";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { endOfWeek, format } from "date-fns";
import { Shedule } from "./Shedule";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "react-feather";
import FormTrial from "./FormTrial";
import { ukDayAbbreviations } from "@/defaults";

function getCurrentMonday() {
  const now = new Date();
  const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let mon = new Date(currentDay);
  mon.setDate(mon.getDate() - (mon.getDay() === 0 ? 7 : mon.getDay()) + 1);

  return mon;
}

export const TrialLessonWrapper = ({ id, teacherBookings }) => {
  const intl = useIntl();
  const currentLanguage = useSelector(selectCurrentLanguage);
  const loading = useSelector(selectTeacherBookingsLoading);
  const error = useSelector(selectTeacherBookingsError);
  const [selected, setSelected] = useState(null);
  const [monday, setMonday] = useState(getCurrentMonday());
  const [schedule, setSchedule] = useState(new Map());
  const [isFormModalVisible, setFormModalVisible] = useState(false);

  const getLocale = () => {
    return currentLanguage === "uk" ? uk : enUS;
  };

  const getDayAbbreviation = (day) => {
    const formattedDay = format(day, "EEE", { locale: getLocale() });
    if (currentLanguage === "uk") {
      const abbreviation = ukDayAbbreviations[formattedDay];
      return abbreviation || formattedDay;
    } else {
      return formattedDay;
    }
  };

  const getSelectedSlotId = () => {
    if (!selected) return null;

    const selectedSlot = teacherBookings.find((slot) => {
      const slotDate = new Date(slot.date);
      return (
        slotDate.getFullYear() === selected.getFullYear() &&
        slotDate.getMonth() === selected.getMonth() &&
        slotDate.getDate() === selected.getDate() &&
        slotDate.getHours() === selected.getHours()
      );
    });

    return selectedSlot;
  };

  useEffect(() => {
    if (teacherBookings.length > 0) {
      const newSchedule = new Map();
      teacherBookings.forEach((slot) => {
        if (!slot.isBooked) {
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
    const newMonday = new Date(monday);
    newMonday.setDate(newMonday.getDate() + 7 * value);
    setMonday(newMonday);
  };

  const getFormattedYear = () => {
    const sunday = endOfWeek(monday, { weekStartsOn: 1 });
    const mondayYear = monday.getFullYear();
    const sundayYear = sunday.getFullYear();

    return mondayYear === sundayYear
      ? mondayYear
      : `${mondayYear} - ${sundayYear}`;
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

  const handleNextClick = () => {
    if (selected) {
      setFormModalVisible(true);
    } else {
      alert("Please select a date and time before proceeding.");
    }
  };

  const handleCloseModal = () => {
    setFormModalVisible(false);
  };

  const sunday = endOfWeek(monday, { weekStartsOn: 1 });
  const formattedRange = `${format(monday, "dd")} - ${format(
    endOfWeek(monday, { weekStartsOn: 1 }),
    "dd"
  )} ${format(monday, "MMMM", { locale: getLocale() }).toLowerCase()}`;

  const currentYear = getFormattedYear();

  const btnArrow = {
    border: "none",
    padding: "0px",
    backgroundColor: "transparent",
    color: (theme) => theme.palette.textColor.fontColor,
  };

  return (
    <Box>
      {isFormModalVisible && (
        <FormTrial
          selected={selected}
          onClose={handleCloseModal}
          bookingDetails={getSelectedSlotId()}
        />
      )}
      <Box
        sx={{
          width: "800px",
          height: "80vh",
          position: "absolute",
          top: "55%",
          left: "50%",
          backgroundColor: (theme) => theme.palette.background.paper,
          transform: "translate(-50%,-50%)",
          display: isFormModalVisible ? "none" : "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "48px 48px 134px 48px",
          overflowY: "auto",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: "20px",
              alignSelf: "center",
            }}
          >
            <Button
              sx={btnArrow}
              onClick={() => shiftWeek(-1)}
              disabled={monday <= now}
            >
              <ChevronLeft />
            </Button>
            <Box>{formattedRange}</Box>
            <Button sx={btnArrow} onClick={() => shiftWeek(+1)}>
              <ChevronRight />
            </Button>
            <Box>{currentYear}</Box>
          </Box>
          <Grid container justifyContent="space-between" sx={{ width: "100%" }}>
            {week.map((el, idx) => (
              <Grid item key={idx}>
                <Button
                  variant="text"
                  sx={{
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                    color: isSameDay(now, el)
                      ? (theme) => theme.palette.primary.main
                      : (theme) => theme.palette.textColor.scheduleDay,
                    padding: 0,
                    minWidth: 0,
                    width: "50px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {getDayAbbreviation(el)}
                  </Typography>
                  <Typography>
                    {format(el, "dd", { locale: getLocale() })}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid container justifyContent="space-between" spacing={5}>
            {week.map((el, idx) => (
              <Grid item key={idx}>
                <Box sx={{ display: "block" }}>
                  <Shedule
                    day={el}
                    hour={getSelectedHour(el)}
                    availableHours={getAvailableHours(el)}
                    scheduleChanged={setSelected}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          <Button
            type="button"
            variant="contained"
            sx={{
              p: "12px 24px",
              alignSelf: "center",
              width: { xs: "100%", md: "fit-content" },
            }}
            onClick={handleNextClick}
          >
            {intl.formatMessage({ id: "next" })}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
