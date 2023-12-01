import { FormattedMessage } from "react-intl";

export const pages = [
  {
    title: <FormattedMessage id="header.teachers" />,
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
    link: "about",
  },
  {
    title: <FormattedMessage id="header.profile" />,
    link: "user",
  },
  {
    title: <FormattedMessage id="header.login" />,
    link: "login",
  },
  {
    title: <FormattedMessage id="header.registration" />,
    link: "registration",
  },
];
