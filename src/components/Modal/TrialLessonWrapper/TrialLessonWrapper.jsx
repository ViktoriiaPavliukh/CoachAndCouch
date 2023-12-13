import { format } from "date-fns";
import { Shedule } from "./Shedule";
import { Button } from "@mui/material";

export const TrialLessonWrapper = () => {
  let currentDay = new Date();
  console.log(currentDay.getDate());
  // console.log(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()));
  let mon = new Date();
  let nextWeek = 0;
  mon.setDate(mon.getDate() - (mon.getDay() == 0 ? 7 : mon.getDay()) + nextWeek);
  // console.log(mon);

  let week = [];

  for (let i = 0; i < 7; i++) {
    let day = new Date(mon);
    day.setDate(day.getDate() + i + 1);
    week.push(day);
  }
  const handlerNextWeek = () => {};
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
          <button>prev</button>
          <div>{format(new Date(), "MMM yyyy")}</div>
          <button onClick={handlerNextWeek}>next</button>
        </div>

        <ul style={{ display: "flex", justifyContent: "space-between", width: "435px" }}>
          {week.map((el, idx) => (
            <li key={idx}>
              <button
                style={{
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: currentDay.getDate() === el.getDate() ? "green" : "transparent",
                  color: currentDay.getDate() === el.getDate() ? "white" : "inherit",
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
              <Shedule day={el} />
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
