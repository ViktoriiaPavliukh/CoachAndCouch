import moment from "moment";

const momentLocale = (language) => {
  if (language === "uk") {
    moment.updateLocale("uk", {
      week: {
        dow: 1,
        doy: 1, 
      },
      weekdays: [
        "Неділя",
        "Понеділок",
        "Вівторок",
        "Середа",
        "Четвер",
        "П'ятниця",
        "Субота",
      ],
      weekdaysShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      months: [
        "Січень",
        "Лютий",
        "Березень",
        "Квітень",
        "Травень",
        "Червень",
        "Липень",
        "Серпень",
        "Вересень",
        "Жовтень",
        "Листопад",
        "Грудень",
      ],
      monthsShort: [
        "Січ",
        "Лют",
        "Бер",
        "Кві",
        "Тра",
        "Чер",
        "Лип",
        "Сер",
        "Вер",
        "Жов",
        "Лис",
        "Гру",
      ],
    });
  } else {
    moment.locale("en");
  }
};

export default momentLocale;
