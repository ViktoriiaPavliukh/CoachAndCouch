import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Stack,
  MenuItem,
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { AboutUsImage } from "./AboutUsImage";
import { ProfileImage } from "./ProfileImage";
import { ChatImage } from "./ChatImage";
import { FillFormImage } from "./FillFormImage";
import { PaymentImage } from "./PaymentImage";
import { TeacherProfileImage } from "./TeacherProfileImage";
import { AllTeachersImage } from "./AllTeachersImage";
import { Line } from "./Line";
import { ChatIcon } from "./ChatIcon";
import { LargeLogoUp, LargeLogoDown } from "./LargeLogo";
import { selectUser } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import { pages } from "@/defaults";
import { themeReducer } from "@/redux/theme/slice";

export function AboutUsPage() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [pathname, setPathname] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContentType, setModalContentType] = useState(null);
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const onShowModalClick = (contentType) => {
    setModalContentType(contentType);
    setShowModal(true);
  };

  const onBackdropClose = () => {
    setShowModal(false);
    setModalContentType(null);
  };
  useEffect(() => {
    setPathname(path);
  }, [path]);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const toHomePage = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          px: { md: "60px", xs: "16px" },
          pt: { xs: "50px", lg: "90px", xl: "110px" },
          mb: { xs: "100px", md: "115px", lg: "130px", xl: "178px" },
          maxWidth: "xl",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: "0", lg: "129px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Typography
              variant="title"
              sx={{
                fontSize: { xl: "72px", lg: "60px", md: "48px", xs: "40px" },
                lineHeight: { xs: "120%", md: "48px", lg: "60px", xl: "72px" },
              }}
            >
              Coach&Couch -
            </Typography>
            <Typography
              variant="text"
              sx={{
                fontSize: { xs: "14px", md: "16px", xl: "20px" },
                lineHeight: { xs: "16px", md: "24px", xl: "28px" },
              }}
            >
              {intl.formatMessage({ id: "aboutText1" })}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                pt: "16px",
                fontSize: "40px",
              }}
            >
              <Typography
                variant="text"
                sx={{
                  fontSize: { xs: "18px", xl: "24px" },
                  lineHeight: { xs: "24px", xl: "34px" },
                }}
              >
                {intl.formatMessage({ id: "aboutText2" })}
              </Typography>
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  p: "0",
                }}
              >
                <ListItem sx={{ display: "flex", gap: "12px", p: "0" }}>
                  <CheckCircleIcon
                    fontSize="large"
                    sx={{
                      color: (theme) => theme.palette.buttonColor.listItem,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", md: "16px", xl: "20px" },
                      lineHeight: { xs: "20px", md: "24px", xl: "28px" },
                    }}
                  >
                    {intl.formatMessage({ id: "aboutList1" })}{" "}
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: "flex", gap: "12px", p: "0" }}>
                  <CheckCircleIcon
                    fontSize="large"
                    sx={{
                      color: (theme) => theme.palette.buttonColor.listItem,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", md: "16px", xl: "20px" },
                      lineHeight: { xs: "20px", md: "24px", xl: "28px" },
                    }}
                  >
                    {intl.formatMessage({ id: "aboutList2" })}
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: "flex", gap: "12px", p: "0" }}>
                  <CheckCircleIcon
                    fontSize="large"
                    sx={{
                      color: (theme) => theme.palette.buttonColor.listItem,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", md: "16px", xl: "20px" },
                      lineHeight: { xs: "20px", md: "24px", xl: "28px" },
                    }}
                  >
                    {intl.formatMessage({ id: "aboutList3" })}
                  </Typography>
                </ListItem>
              </List>
            </Box>
            <Typography
              sx={{
                pt: "16px",
                fontSize: { xs: "18px", xl: "24px" },
                lineHeight: { xs: "24px", xl: "34px" },
              }}
              variant="text"
            >
              {intl.formatMessage({ id: "aboutText3" })}
            </Typography>
          </Box>
          <AboutUsImage />
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: "35px", md: "50px 63px", lg: "60px", xl: "90px" },
            mb: { xs: "96px", md: "114px", lg: "130px", xl: "176px" },
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: { xs: "80%", md: "45%", lg: "21%", xl: "22%" },
              py: { xs: "32px", xl: "44px" },
              px: "30px",
              maxHeight: { xs: "152px", md: "158px", xl: "218px" },
              borderRadius: "8px",
              background: (theme) => theme.palette.background.card,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "36px",
                    lg: "48px",
                    xl: "60px",
                  },
                  lineHeight: "111%",
                  color: (theme) => theme.palette.buttonColor.listItem,
                }}
              >
                100%
              </Typography>
              <Typography
                variant="posterPopupTitle"
                sx={{
                  fontSize: { xs: "14px", md: "16px", xl: "20px" },
                  lineHeight: { xs: "143%", md: "150%", xl: "140%" },
                }}
              >
                {intl.formatMessage({ id: "aboutCard1" })}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: { xs: "80%", md: "45%", lg: "21%", xl: "22%" },
              py: { xs: "32px", xl: "44px" },
              px: "30px",
              maxHeight: { xs: "152px", md: "158px", xl: "218px" },
              borderRadius: "8px",
              background: (theme) => theme.palette.background.card,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "36px",
                    lg: "48px",
                    xl: "60px",
                  },
                  lineHeight: "111%",
                  color: (theme) => theme.palette.buttonColor.listItem,
                }}
              >
                8+
              </Typography>
              <Typography
                variant="posterPopupTitle"
                sx={{
                  fontSize: { xs: "14px", md: "16px", xl: "20px" },
                  lineHeight: { xs: "143%", md: "150%", xl: "140%" },
                }}
              >
                {intl.formatMessage({ id: "aboutCard2" })}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: { xs: "80%", md: "45%", lg: "21%", xl: "22%" },
              py: { xs: "32px", xl: "44px" },
              px: "30px",
              maxHeight: { xs: "152px", md: "158px", xl: "218px" },
              borderRadius: "8px",
              background: (theme) => theme.palette.background.card,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "36px",
                    lg: "48px",
                    xl: "60px",
                  },
                  lineHeight: "111%",
                  color: (theme) => theme.palette.buttonColor.listItem,
                }}
              >
                250+
              </Typography>
              <Typography
                variant="posterPopupTitle"
                sx={{
                  fontSize: { xs: "14px", md: "16px", xl: "20px" },
                  lineHeight: { xs: "143%", md: "150%", xl: "140%" },
                }}
              >
                {intl.formatMessage({ id: "aboutCard3" })}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: { xs: "80%", md: "45%", lg: "21%", xl: "22%" },
              py: { xs: "32px", xl: "44px" },
              px: "30px",
              maxHeight: { xs: "152px", md: "158px", xl: "218px" },
              borderRadius: "8px",
              background: (theme) => theme.palette.background.card,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "36px",
                    lg: "48px",
                    xl: "60px",
                  },
                  lineHeight: "111%",
                  color: (theme) => theme.palette.buttonColor.listItem,
                }}
              >
                1500+
              </Typography>
              <Typography
                variant="posterPopupTitle"
                sx={{
                  fontSize: { xs: "14px", md: "16px", xl: "20px" },
                  lineHeight: { xs: "143%", md: "150%", xl: "140%" },
                }}
              >
                {intl.formatMessage({ id: "aboutCard3" })}
              </Typography>
            </CardContent>
          </Card>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            gap: "40px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "24px", md: "36px", lg: "48px", xl: "60px" },
            }}
          >
            {" "}
            {intl.formatMessage({ id: "aboutTitle1" })}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "16px", md: "18px", xl: "24px" },
              maxWidth: { md: "494px", lg: "703px", xl: "937px" },
            }}
          >
            {intl.formatMessage({ id: "aboutText4" })}
          </Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            textAlign: "center",
            justifyContent: "center",
            alignItems: "stretch",
            marginTop: { xs: "50px", lg: "60px", xl: "90px" },
            gap: { xs: "35px", md: "40px", lg: "60px 40px", xl: "60px 70px" },
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "left",
              width: { xs: "100%", lg: "48%" },
              borderRadius: "10px",
              background: (theme) => theme.palette.background.card,
            }}
          >
            <CardContent sx={{ p: { xs: "18px", md: "23px", xl: "38px" } }}>
              <ProfileImage />
              <Typography
                sx={{
                  fontSize: {
                    xs: "18px",
                    md: "20px",
                    xl: "24px",
                  },
                  lineHeight: "140%",
                  color: (theme) => theme.palette.buttonColor.listItem,
                  mt: { xl: "24px", md: "18px", xs: "12px" },
                }}
              >
                {intl.formatMessage({ id: "userProfile" })}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "14px", md: "16px", xl: "20px" },
                  lineHeight: "150%",
                  pt: "4px",
                }}
              >
                {intl.formatMessage({ id: "userProfileDetails" })}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "left",
              borderRadius: "10px",
              width: { xs: "100%", lg: "48%" },
              background: (theme) => theme.palette.background.card,
            }}
          >
            <CardContent sx={{ p: { xs: "18px", md: "23px", xl: "38px" } }}>
              <ChatImage />
              <Typography
                sx={{
                  fontSize: {
                    xs: "18px",
                    md: "20px",
                    xl: "24px",
                  },
                  lineHeight: "140%",
                  color: (theme) => theme.palette.buttonColor.listItem,
                  mt: { xl: "24px", md: "18px", xs: "12px" },
                }}
              >
                {intl.formatMessage({ id: "chat" })}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "14px", md: "16px", xl: "20px" },
                  lineHeight: "150%",
                  pt: "4px",
                }}
              >
                {intl.formatMessage({ id: "chatDetails" })}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "left",
              borderRadius: "10px",
              width: { xs: "100%", lg: "48%" },
              background: (theme) => theme.palette.background.card,
            }}
          >
            <CardContent sx={{ p: { xs: "18px", md: "23px", xl: "38px" } }}>
              <TeacherProfileImage />
              <Typography
                sx={{
                  fontSize: {
                    xs: "18px",
                    md: "20px",
                    xl: "24px",
                  },
                  lineHeight: "140%",
                  color: (theme) => theme.palette.buttonColor.listItem,
                  mt: { xl: "24px", md: "18px", xs: "12px" },
                }}
              >
                {intl.formatMessage({ id: "teacherProfile" })}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "14px", md: "16px", xl: "20px" },
                  lineHeight: "150%",
                  pt: "4px",
                }}
              >
                {intl.formatMessage({ id: "teacherProfileDetails" })}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "left",
              borderRadius: "10px",
              width: { xs: "100%", lg: "48%" },
              background: (theme) => theme.palette.background.card,
            }}
          >
            <CardContent sx={{ p: { xs: "18px", md: "23px", xl: "38px" } }}>
              <AllTeachersImage />
              <Typography
                sx={{
                  fontSize: {
                    xs: "18px",
                    md: "20px",
                    xl: "24px",
                  },
                  lineHeight: "140%",
                  color: (theme) => theme.palette.buttonColor.listItem,
                  mt: { xl: "24px", md: "18px", xs: "12px" },
                }}
              >
                {intl.formatMessage({ id: "allTeachers" })}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "14px", md: "16px", xl: "20px" },
                  lineHeight: "150%",
                  pt: "4px",
                }}
              >
                {intl.formatMessage({ id: "allTeachersDetails" })}
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: (theme) => theme.palette.primary.main,
          width: "100%",
        }}
      >
        <LargeLogoUp />
        <Box
          sx={{
            pt: { xs: "98px", md: "108px", lg: "44px", xl: "66px" },
            mb: { xs: "86px", md: "96px", lg: "54px" },
            width: { xs: "91%", md: "82%", lg: "63%", xl: "60%" },
            color: (theme) => theme.palette.textColor.header,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack sx={{ display: "inline" }}>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "36px", lg: "48px", xl: "60px" },
                display: "inline",
              }}
            >
              {intl.formatMessage({ id: "aboutGreenPoster1" })}
            </Typography>
            <Typography
              variant="span"
              sx={{
                fontSize: { xs: "24px", md: "36px", lg: "48px", xl: "60px" },
                color: (theme) => theme.palette.textColor.lightYellow,
                display: "inline",
              }}
            >
              Coach&Couch
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: { xs: "24px", md: "36px", lg: "48px", xl: "60px" },
            }}
          >
            {intl.formatMessage({ id: "aboutGreenPoster2" })}
          </Typography>
          <Box
            display="flex"
            sx={{
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: "35px", md: "60px" },
              pt: { xs: "50px", lg: "60px" },
            }}
          >
            {!isLoggedIn && (
              <Box display="flex" flexDirection="row">
                {pages.slice(13).map(({ title, link }) => (
                  <MenuItem
                    key={title}
                    onClick={() => {
                      navigate(link);
                    }}
                    sx={{
                      py: "12px",
                      px: "12px",
                      minWidth: "152px",
                      color: (theme) =>
                        pathname === "/registration" || pathname === "/"
                          ? theme.palette.textColor.black
                          : theme.palette.textColor.black,
                      backgroundColor: (theme) =>
                        pathname === "/registration" || pathname === "/"
                          ? theme.palette.buttonColor.header
                          : theme.palette.buttonColor.header,
                      borderRadius: "6px",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: (theme) =>
                          theme.palette.primary.accent,
                      },
                      textTransform: "uppercase",
                    }}
                  >
                    <Typography sx={{ textAlign: "center", margin: "0 auto" }}>
                      {title}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
            )}
            {isLoggedIn ? (
              <MenuItem
                onClick={toHomePage}
                sx={{
                  py: "12px",
                  px: "12px",
                  minWidth: "200px",
                  borderColor: (theme) => theme.palette.primary.accent,
                  borderRadius: "6px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.accent,
                    color: (theme) => theme.palette.textColor.black,
                  },
                }}
              >
                <Typography sx={{ textAlign: "center", margin: "0 auto" }}>
                  {intl.formatMessage({ id: "learnMore" })}
                </Typography>
              </MenuItem>
            ) : (
              pages.slice(12, 13).map(({ title, link }) => (
                <MenuItem
                  sx={{
                    py: "12px",
                    px: "12px",
                    minWidth: "152px",
                    transition: "color 0.3s",
                    borderRadius: "6px",
                    color: (theme) =>
                      pathname === "/login"
                        ? theme.palette.textColor.header
                        : theme.palette.textColor.header,
                    backgroundColor: () =>
                      pathname === "/login" ? null : null,
                    borderColor: (theme) => theme.palette.primary.accent,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    "&:hover": {
                      color: (theme) => theme.palette.primary.ac,
                    },
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                  key={title}
                  onClick={() => {
                    navigate(link);
                  }}
                >
                  <Typography sx={{ textAlign: "center", margin: "0 auto" }}>
                    {intl.formatMessage({ id: "header.login" })}
                  </Typography>
                </MenuItem>
              ))
            )}
          </Box>
        </Box>
        <LargeLogoDown />
      </Stack>
      <Stack
        sx={{
          maxWidth: "xl",
          px: { md: "60px", xs: "16px" },
          pt: { xs: "100px", md: "114px", lg: "130px", xl: "180px" },
          mb: { xs: "100px", md: "115px", lg: "130px", xl: "178px" },
          gap: { xs: "22px", md: "33px", xl: "40px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <Typography
          sx={{
            width: { xs: "91%", md: "64%" },
            textAlign: "center",
            fontSize: {
              xs: "24px",
              md: "36px",
              lg: "48px",
              xl: "60px",
            },
          }}
        >
          {intl.formatMessage({ id: "aboutTrial" })}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            width: { xs: "91%", md: "64%", xl: "50%" },
            fontSize: {
              xs: "16px",
              md: "18px",
            },
          }}
        >
          {intl.formatMessage({ id: "aboutTrial2" })}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", lg: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                pt: { xs: "50px", lg: "0" },
                width: "100%",
                mb: { xs: "24px" },
              }}
            >
              <ChatIcon />
              <Box>
                <List sx={{ p: 0 }}>
                  <ListItem sx={{ p: 0 }}>
                    <DoneIcon
                      sx={{
                        color: (theme) => theme.palette.textColor.green,
                      }}
                    />
                    <Typography
                      sx={{
                        pl: "10px",
                        fontSize: { xs: "14px", md: "18px", xl: "20px" },
                        lineHeight: "140%",
                      }}
                    >
                      {intl.formatMessage({ id: "forChildren" })}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ p: 0 }}>
                    <DoneIcon
                      sx={{
                        color: (theme) => theme.palette.textColor.green,
                      }}
                    />
                    <Typography
                      sx={{
                        pl: "10px",
                        fontSize: { xs: "14px", md: "18px", xl: "20px" },
                        lineHeight: "140%",
                      }}
                    >
                      {intl.formatMessage({ id: "forBasic" })}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ p: 0 }}>
                    <DoneIcon
                      sx={{
                        color: (theme) => theme.palette.textColor.green,
                      }}
                    />
                    <Typography
                      sx={{
                        pl: "10px",
                        fontSize: { xs: "14px", md: "18px", xl: "20px" },
                        lineHeight: "140%",
                      }}
                    >
                      {intl.formatMessage({ id: "forSpeaking" })}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ p: 0 }}>
                    <CloseIcon
                      sx={{
                        color: (theme) => theme.palette.textColor.red,
                      }}
                    />
                    <Typography
                      sx={{
                        pl: "10px",
                        fontSize: { xs: "14px", md: "18px", xl: "20px" },
                        lineHeight: "140%",
                      }}
                    >
                      {intl.formatMessage({ id: "forBusiness" })}
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Stack>
            <Card
              sx={{
                display: "flex",
                minWidth: "343px",
                background: (theme) => theme.palette.background.card,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "134px", md: "167px", lg: "187px" },
                }}
                image="src/assets/images/imgGirl.png"
                alt="French Girl"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    pl: "16px",
                    pr: "10px",
                    py: "20px",
                    gap: "10px",
                    flexDirection: "column",
                    minWidth: { xs: "177px", md: "222px" },
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      gap: "10px",
                      flexDirection: "row",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "16px", md: "18px", xl: "20px" },
                        lineHeight: "140%",
                      }}
                    >
                      Lolly Pops
                    </Typography>
                    <img
                      src={`https://flagcdn.com/w40/fr.png`}
                      srcSet={`https://flagcdn.com/w80/fr.png 2x`}
                      alt="fr flag"
                      style={{
                        width: "28px",
                        height: "20px",
                        borderRadius: "4px",
                      }}
                    />
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: { xs: "6px", md: "7px" },
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        px: "10px",
                        py: "4px",
                        backgroundColor: (theme) =>
                          theme.palette.background.language,
                        borderRadius: "16px",
                        fontSize: { xs: "9px", md: "12px", xl: "15px" },
                        lineHeight: "143%",
                      }}
                    >
                      {intl.formatMessage({ id: "english" })}
                    </Typography>
                    <Typography
                      sx={{
                        px: "10px",
                        py: "4px",
                        backgroundColor: (theme) =>
                          theme.palette.background.language,
                        borderRadius: "16px",
                        fontSize: { xs: "9px", md: "12px", xl: "15px" },
                        lineHeight: "143%",
                      }}
                    >
                      {intl.formatMessage({ id: "polish" })}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "9px", md: "12px", xl: "15px" },
                        lineHeight: "143%",
                        pt: "10px",
                      }}
                    >
                      {intl.formatMessage({ id: "more" })}
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{ display: "flex", flexDirection: "row", gap: "25px" }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "10px", md: "12px", xl: "14px" },
                        lineHeight: "143%",
                      }}
                    >
                      {intl.formatMessage({ id: "rate" })}: 3.37
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "10px", md: "12px", xl: "14px" },
                        lineHeight: "143%",
                      }}
                    >
                      {intl.formatMessage({ id: "lessons" })}: 156
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: { xs: "16px", md: "18px", xl: "20px" },
                      color: (theme) => theme.palette.buttonColor.listItem,
                    }}
                  >
                    40$
                  </Typography>
                </CardContent>
              </Box>
            </Card>
            <Stack
              sx={{
                mt: "18px",
                display: "flex",
                justifyContent: { xs: "center" },
                alignItems: { xs: "center" },
                flexDirection: { xs: "column", md: "row-reverse" },
                gap: { md: "18px" },
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  minWidth: "343px",
                  background: (theme) => theme.palette.background.card,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "134px", md: "167px", lg: "187px" },
                  }}
                  image="src/assets/images/imgUa.png"
                  alt="Girl"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      pl: "16px",
                      pr: "10px",
                      py: "20px",
                      gap: "10px",
                      flexDirection: "column",
                      minWidth: { xs: "177px", md: "222px" },
                    }}
                  >
                    <Stack
                      sx={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "16px", md: "18px", xl: "20px" },
                          lineHeight: "140%",
                        }}
                      >
                        Elina Kim
                      </Typography>
                      <img
                        src={`https://flagcdn.com/w40/ua.png`}
                        srcSet={`https://flagcdn.com/w80/ua.png 2x`}
                        alt="ua flag"
                        style={{
                          width: "28px",
                          height: "20px",
                          borderRadius: "4px",
                        }}
                      />
                    </Stack>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: { xs: "6px", md: "7px" },
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          px: "10px",
                          py: "4px",
                          backgroundColor: (theme) =>
                            theme.palette.background.language,
                          borderRadius: "16px",
                          fontSize: { xs: "9px", md: "12px", xl: "15px" },
                          lineHeight: "143%",
                        }}
                      >
                        {intl.formatMessage({ id: "spanish" })}
                      </Typography>
                      <Typography
                        sx={{
                          px: "10px",
                          py: "4px",
                          backgroundColor: (theme) =>
                            theme.palette.background.language,
                          borderRadius: "16px",
                          fontSize: { xs: "9px", md: "12px", xl: "15px" },
                          lineHeight: "143%",
                        }}
                      >
                        {intl.formatMessage({ id: "polish" })}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "9px", md: "12px", xl: "15px" },
                          lineHeight: "143%",
                          pt: "10px",
                        }}
                      >
                        {intl.formatMessage({ id: "more" })}
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "25px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "12px", xl: "14px" },
                          lineHeight: "143%",
                        }}
                      >
                        {intl.formatMessage({ id: "rate" })}: 4.01
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "12px", xl: "14px" },
                          lineHeight: "143%",
                        }}
                      >
                        {intl.formatMessage({ id: "lessons" })}: 13
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: { xs: "16px", md: "18px", xl: "20px" },
                        color: (theme) => theme.palette.buttonColor.listItem,
                      }}
                    >
                      15$
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
              <PaymentImage />
            </Stack>
          </Box>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: { xs: "22px", md: "31px", xl: "40px" },
              alignItems: "center",
            }}
          >
            <Line />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: "20px", lg: "32px", xl: "35px" },
                maxWidth: {
                  xs: "283px",
                  md: "579px",
                  lg: "448px",
                  xl: "574px",
                },
              }}
            >
              <Stack>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.buttonColor.listItem,
                    fontSize: { xs: "18px", md: "20px", xl: "24px" },
                    lineHeight: { xs: "156%", md: "140%", xl: "133%" },
                  }}
                >
                  {intl.formatMessage({ id: "chooseTeacherTitle" })}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px", xl: "20px" },
                    lineHeight: { xs: "143%", md: "150%", xl: "140%" },
                    pt: "6px",
                  }}
                >
                  {intl.formatMessage({ id: "chooseTeacherText" })}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.buttonColor.listItem,
                    fontSize: { xs: "18px", md: "20px", xl: "24px" },
                    lineHeight: { xs: "156%", md: "140%", xl: "133%" },
                  }}
                >
                  {intl.formatMessage({ id: "checkAdvertTitle" })}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px", xl: "20px" },
                    lineHeight: { xs: "143%", md: "150%", xl: "140%" },
                    pt: "6px",
                  }}
                >
                  {intl.formatMessage({ id: "checkAdvertText" })}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.buttonColor.listItem,
                    fontSize: { xs: "18px", md: "20px", xl: "24px" },
                    lineHeight: { xs: "156%", md: "140%", xl: "133%" },
                  }}
                >
                  {intl.formatMessage({ id: "setTrialTitle" })}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px", xl: "20px" },
                    lineHeight: { xs: "143%", md: "150%", xl: "140%" },
                    pt: "6px",
                  }}
                >
                  {intl.formatMessage({ id: "setTrialText" })}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.buttonColor.listItem,
                    fontSize: { xs: "18px", md: "20px", xl: "24px" },
                    lineHeight: { xs: "156%", md: "140%", xl: "133%" },
                  }}
                >
                  {intl.formatMessage({ id: "payLessonTitle" })}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px", xl: "20px" },
                    lineHeight: { xs: "143%", md: "150%", xl: "140%" },
                    pt: "6px",
                  }}
                >
                  {intl.formatMessage({ id: "payLessonText" })}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: (theme) => theme.palette.primary.main,
          width: "100%",
        }}
      >
        <LargeLogoUp />
        <Box
          sx={{
            pt: { xs: "98px", md: "108px", lg: "44px", xl: "66px" },
            mb: { xs: "86px", md: "96px", lg: "54px" },
            width: { xs: "91%", md: "82%", lg: "63%", xl: "45%" },
            color: (theme) => theme.palette.textColor.header,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: "22px", md: "17px", xl: "20px" },
          }}
        >
          <Stack sx={{ display: "inline" }}>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "36px", lg: "48px", xl: "60px" },
                display: "inline",
              }}
            >
              {intl.formatMessage({ id: "orderTrialText1" })}
            </Typography>
            <Typography
              variant="span"
              sx={{
                fontSize: { xs: "24px", md: "36px", lg: "48px", xl: "60px" },
                color: (theme) => theme.palette.textColor.lightYellow,
                display: "inline",
              }}
            >
              з Elina Olexandrivna за 7 $!
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: { xs: "16px", md: "18px", xl: "20px" },
              px: { md: "12%", lg: "13%" },
            }}
          >
            {intl.formatMessage({ id: "orderTrialText2" })}
          </Typography>
          <Button
            onClick={() => onShowModalClick("trialLesson")}
            variant="contained"
            sx={{
              py: "12px",
              px: "30px",
              borderRadius: "6px",
              color: (theme) => theme.palette.buttonColor.fontColor,
              fontSize: "14px",
              fontWeight: "400",
              transition: "background-color 0.3s",
              backgroundColor: (theme) => theme.palette.buttonColor.lightYellow,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.buttonColor.lightYellowHover,
              },
            }}
          >
            {intl.formatMessage({ id: "orderTrialButton" })}
          </Button>
          {showModal && (
            <Modal
              onBackdropClose={onBackdropClose}
              contentType={modalContentType}
            />
          )}
        </Box>
        <LargeLogoDown />
      </Stack>
      <Stack
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: { xs: "50px", lg: "60px", xl: "90px" },
          px: { md: "60px", xs: "16px" },
          mb: { xs: "100px", md: "114px", lg: "130px", xl: "168px" },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pt: { xs: "78px", md: "114px", lg: "130px", xl: "180px" },
            gap: { xs: "22px", md: "33px" },
          }}
        >
          <Typography
            sx={{
              width: "100%",
              fontSize: { xs: "24px", md: "36px", lg: "48px" },
            }}
          >
            {intl.formatMessage({ id: "header.becomeTeacher" })}
          </Typography>
          <Typography
            sx={{
              width: "100%",
              fontSize: { xs: "16px", md: "18px", xl: "24px" },
              lineHeight: { xs: "24px", xl: "34px" },
              // width: { xs: "91%", md: "79%", lg: "52%", xl: "60%" },
            }}
          >
            {intl.formatMessage({ id: "aboutText4" })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { lg: "20%", xl: "10%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              pt: "16px",
              fontSize: "40px",
              maxWidth: { xl: "677px" },
            }}
          >
            <Typography
              variant="text"
              sx={{
                fontSize: { xs: "18px", xl: "24px" },
                lineHeight: { xs: "24px", xl: "34px" },
              }}
            >
              {intl.formatMessage({ id: "aboutListTitle" })}
            </Typography>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: "10px", xl: "12px" },
                p: "0",
              }}
            >
              <ListItem sx={{ display: "flex", gap: "12px", p: "0" }}>
                <CheckCircleIcon
                  fontSize="large"
                  sx={{
                    color: (theme) => theme.palette.buttonColor.listItem,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px", xl: "20px" },
                    lineHeight: { xs: "20px", md: "24px", xl: "28px" },
                  }}
                >
                  {intl.formatMessage({ id: "aboutList4" })}{" "}
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", gap: "12px", p: "0" }}>
                <CheckCircleIcon
                  fontSize="large"
                  sx={{
                    color: (theme) => theme.palette.buttonColor.listItem,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px", xl: "20px" },
                    lineHeight: { xs: "20px", md: "24px", xl: "28px" },
                  }}
                >
                  {intl.formatMessage({ id: "aboutList5" })}
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", gap: "12px", p: "0" }}>
                <CheckCircleIcon
                  fontSize="large"
                  sx={{
                    color: (theme) => theme.palette.buttonColor.listItem,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px", xl: "20px" },
                    lineHeight: { xs: "20px", md: "24px", xl: "28px" },
                  }}
                >
                  {intl.formatMessage({ id: "aboutList6" })}
                </Typography>
              </ListItem>
            </List>
            <Box
              sx={{
                mt: { xs: "22px", md: "33px", xl: "40px" },
                fontSize: { xs: "18px", xl: "24px" },
                lineHeight: { xs: "24px", xl: "34px" },
              }}
            >
              <Typography
                sx={{
                  display: "inline",
                  fontSize: { xs: "18px", xl: "24px" },
                  lineHeight: { xs: "24px", xl: "34px" },
                }}
              >
                {intl.formatMessage({ id: "aboutText5" })}
              </Typography>
              <Typography
                sx={{
                  display: "inline",
                  fontSize: { xs: "18px", xl: "24px" },
                  lineHeight: { xs: "24px", xl: "34px" },
                  color: (theme) => theme.palette.buttonColor.listItem,
                }}
              >
                {intl.formatMessage({ id: "aboutText6" })}
              </Typography>
              <Typography
                sx={{
                  display: "inline",
                  fontSize: { xs: "18px", xl: "24px" },
                  lineHeight: { xs: "24px", xl: "34px" },
                }}
              >
                {intl.formatMessage({ id: "aboutText7" })}
              </Typography>
            </Box>
            <Button
              onClick={() => onShowModalClick("trialLesson")}
              variant="contained"
              sx={{
                width: "fit-content",
                py: "12px",
                px: "30px",
                borderRadius: "6px",
                color: (theme) => theme.palette.buttonColor.fontColor,
                fontSize: "14px",
                fontWeight: "400",
                transition: "background-color 0.3s",
                backgroundColor: (theme) =>
                  theme.palette.buttonColor.greenYellow,
                "&:hover": {
                  backgroundColor: (theme) =>
                    theme.palette.buttonColor.greenYellowHover,
                },
              }}
            >
              {intl.formatMessage({ id: "fillAdv" })}
            </Button>
          </Box>
          <Box sx={{ position: "relative" }}>
            <FillFormImage />
            <List
              sx={{
                padding: "0",
                position: "absolute",
                right: "0",
                top: { lg: "0", xs: "44px" },
              }}
            >
              <ListItem sx={{ padding: "0" }}>
                <CircleIcon
                  sx={{
                    fontSize: "small",
                    color: (theme) => theme.palette.buttonColor.lightYellow,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "10px", md: "18px", xl: "20px" },
                    lineHeight: { xs: "156%" },
                    ml: { xs: "6px", md: "10px", xl: "12px" },
                  }}
                >
                  {intl.formatMessage({ id: "pricePerLesson" })}
                </Typography>
              </ListItem>
              <ListItem sx={{ padding: "0" }}>
                <CircleIcon
                  sx={{
                    fontSize: "small",
                    color: (theme) => theme.palette.buttonColor.lightYellow,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "10px", md: "18px", xl: "20px" },
                    lineHeight: { xs: "156%" },
                    ml: { xs: "6px", md: "10px", xl: "12px" },
                  }}
                >
                  {intl.formatMessage({ id: "languagesTeaching" })}
                </Typography>
              </ListItem>
              <ListItem sx={{ padding: "0" }}>
                <CircleIcon
                  sx={{
                    fontSize: "small",
                    color: (theme) => theme.palette.buttonColor.lightYellow,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "10px", md: "18px", xl: "20px" },
                    lineHeight: { xs: "156%" },
                    ml: { xs: "6px", md: "10px", xl: "12px" },
                  }}
                >
                  {intl.formatMessage({ id: "specialization" })}
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
