import { FormattedMessage } from "react-intl";

export const pages = [
  {
    title: <FormattedMessage id="header.teachers" default="shjddd" />,
    link: "/",
  },
  // {
  //   title: "Бізнес",
  //   link: "",
  // },
  // {
  //   title: "Для дітей",
  //   link: "",
  // },
  {
    title: <FormattedMessage id="header.becomeTeacher" />,
    link: "teacherform",
  },
  {
    title: <FormattedMessage id="header.aboutUs" />,
    link: "home",
  },
  {
    title: "Особистий кабінет",
    link: "user",
  },
  // {
  //   title: "Контакти",
  //   link: "home",
  // },
  {
    title: "Вхід",
    link: "login",
  },
  {
    title: "Реєстрація",
    link: "registration",
  },

  // { title: "Головна", link: "home" },
];
