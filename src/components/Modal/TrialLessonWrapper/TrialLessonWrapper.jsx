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
import { Box, Button, Grid, Typography, Stack, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

export const TrialLessonWrapper = ({
  id,
  teacherBookings,
  isFirstTimeBooking,
  onBackdropClose,
}) => {
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
        if (!slot.isBooked && slot.isActive) {
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

  // const sunday = endOfWeek(monday, { weekStartsOn: 1 });
  let formattedRange = `${format(monday, "dd")} - ${format(
    endOfWeek(monday, { weekStartsOn: 1 }),
    "dd"
  )} ${format(monday, "MMMM", { locale: getLocale() })}`;

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
          isFirstTimeBooking={isFirstTimeBooking}
        />
      )}
      <Box
        sx={{
          width: { xs: "87%", md: "93%", lg: "1208px" },
          height: "auto",
          maxHeight: { xs: "90vh", md: "60vh" },
          position: "absolute",
          top: { xs: "55%", md: "50%" },
          left: "50%",
          backgroundColor: (theme) => theme.palette.background.paper,
          transform: "translate(-50%,-50%)",
          display: isFormModalVisible ? "none" : "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          pt: { xs: "200px", md: "700px" },
          py: "32px",
          overflowY: "auto",
          zIndex: 150,
          px: { xs: "8px", md: "24px" },
        }}
      >
        <Stack
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", md: "58%" },
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column-reverse", md: "row" },
            }}
          >
            <Typography
              sx={{
                display: { md: "flex" },
                fontSize: { xs: "24px", md: "30px" },
                textAlign: "center",
              }}
            >
              {intl.formatMessage({ id: "chooseDate" })}
            </Typography>
            <Button
              sx={{
                display: { xs: "flex", md: "flex" },
                justifyContent: "center",
                alignSelf: { xs: "end", md: "unset" },
                alignItems: "center",
                color: (theme) => theme.palette.textColor.fontColor,
                p: 0,
                mt: "5px",
              }}
              onClick={onBackdropClose}
            >
              <CloseIcon />
            </Button>
          </Box>
        </Stack>
        <Divider
          sx={{
            my: { xs: "24px", md: "28px" },
            borderColor: (theme) => theme.palette.textColor.listItem,
            width: "100%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "10px", md: "30px" },
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: { xs: "2px", md: "20px" },
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              sx={btnArrow}
              onClick={() => shiftWeek(-1)}
              disabled={monday <= now}
            >
              <ChevronLeft />
            </Button>
            <Typography
              sx={{ fontSize: { xs: "20px", md: "24px", textAlign: "center" } }}
            >
              {formattedRange}
            </Typography>
            <Button sx={btnArrow} onClick={() => shiftWeek(+1)}>
              <ChevronRight />
            </Button>
            <Typography sx={{ fontSize: { xs: "20px", md: "24px" } }}>
              {currentYear}
            </Typography>
          </Box>
          <Grid
            container
            justifyContent="space-between"
            sx={{
              width: "100%",
            }}
          >
            {week.map((el, idx) => (
              <Grid
                item
                key={idx}
                sx={{ justifyContent: "center", textAlign: "center" }}
              >
                <Button
                  variant="text"
                  sx={{
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                    color: isSameDay(now, el)
                      ? (theme) => theme.palette.buttonColor.listItem
                      : (theme) => theme.palette.textColor.scheduleDay,
                    padding: 0,
                    minWidth: { xs: "40px", md: "50px", lg: "60px" },
                    maxWidth: { xs: "fit-content", md: "50px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontSize: { xs: "18px", md: "20px" },
                    }}
                  >
                    {getDayAbbreviation(el)}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: "18px", md: "20px" } }}>
                    {format(el, "dd", { locale: getLocale() })}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            sx={{ gap: { xs: "2px", md: "40px" } }}
          >
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
            variant="button"
            onClick={handleNextClick}
            sx={{
              borderRadius: "6px",
              mt: "24px",
              mb: "40px",
              p: "12px 32px",
              alignSelf: "center",
              color: (theme) => theme.palette.buttonColor.fontColor,
              backgroundColor: (theme) => theme.palette.buttonColor.greenYellow,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.buttonColor.greenYellowHover,
              },
            }}
          >
            {intl.formatMessage({ id: "next" })}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
