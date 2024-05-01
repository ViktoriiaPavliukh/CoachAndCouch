import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Stack,
  Button,
  MenuItem,
  Box,
  List,
  ListItem,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AboutUsImage } from "./AboutUsImage";
import { ProfileImage } from "./ProfileImage";
import { ChatImage } from "./ChatImage";
import { TeacherProfileImage } from "./TeacherProfileImage";
import { AllTeachersImage } from "./AllTeachersImage";
import { LargeLogoUp, LargeLogoDown } from "./LargeLogo";
import { selectUser } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import { pages } from "@/defaults";
import { themeReducer } from "@/redux/theme/slice";

export function AboutUsPage() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [pathname, setPathname] = useState("");
  const path = useLocation().pathname;
  const navigate = useNavigate();
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
    </Box>
  );
}
