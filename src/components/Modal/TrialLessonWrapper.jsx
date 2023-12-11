import { format } from "date-fns";
// import { useEffect, useState } from "react";

export const TrialLessonWrapper = () => {
  const [week, setWeek] = useState([]);
  // const currentDay = new Date();
  const getWeek = (currentMonday) => {
    let newWeek = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date(currentMonday);
      day.setDate(day.getDate() + i);
      newWeek.push(day);
    }
    return setWeek([...newWeek]);
  };

  const getMonday = (currentDay, nextWeek) => {
    let mon = currentDay;
    return mon.setDate(mon.getDate() - (mon.getDay() == 0 ? 7 : mon.getDay()) + nextWeek);
  };
  setWeek(getWeek(getMonday(new Date(), 0)));

  // let currentDay = new Date();
  // console.log(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()));
  let mon = new Date();
  let nextWeek = 0;
  mon.setDate(mon.getDate() - (mon.getDay() == 0 ? 7 : mon.getDay()) + nextWeek);
  // console.log(mon);

  let shedule = [];
  for (let i = 0; i < 24; i++) {
    shedule.push(i);
  }

  const handlerNextWeek = () => {
    mon = getMonday(new Date(), 7);
    setWeek(getWeek(mon));
  };
  console.log(week);
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
        <button>prev</button> <div>{format(new Date(), "MMM yyyy")}</div>
        <button onClick={handlerNextWeek()}>next</button>
        <ul style={{ display: "flex", gap: "10px", backgroundColor: "green" }}>
          {week?.map((el, idx) => (
            <li key={idx}>
              <button>{format(el, "dd")}</button>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {shedule.map((sh, idx) => (
                  <button key={idx}>{`${sh.toString().padStart(2, "0")}:00`}</button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
