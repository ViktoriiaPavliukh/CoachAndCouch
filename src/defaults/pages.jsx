import { FormattedMessage } from "react-intl";

export const pages = [
  {
    title: <FormattedMessage id="personalAccount.profile" />,
    link: "profile",
    iconFeatherName: "FileText",
  },
  {
    title: <FormattedMessage id="personalAccount.schedule" />,
    link: "schedule",
    iconFeatherName: "Calendar",
  },
  {
    title: <FormattedMessage id="personalAccount.messages" />,
    link: "messages",
    iconFeatherName: "MessageSquare",
  },
  {
    title: <FormattedMessage id="personalAccount.likes" />,
    link: "likes",
    iconFeatherName: "Heart",
  },
  {
    title: <FormattedMessage id="personalAccount.advertisements" />,
    link: "advertisements",
    iconFeatherName: "Tablet",
  },
  {
    title: <FormattedMessage id="personalAccount.settings" />,
    link: "settings",
    iconFeatherName: "Settings",
  },
  {
    title: <FormattedMessage id="header.teachers" />,
    link: "/",
    iconFeatherName: null,
  },
  {
    title: <FormattedMessage id="header.becomeTeacher" />,
    link: "teacherform",
    iconFeatherName: null,
  },
  {
    title: <FormattedMessage id="header.aboutUs" />,
    link: "about",
    iconFeatherName: null,
  },
  {
    title: <FormattedMessage id="header.login" />,
    link: "login",
    iconFeatherName: null,
  },
  {
    title: <FormattedMessage id="header.registration" />,
    link: "registration",
    iconFeatherName: null,
  },
];
