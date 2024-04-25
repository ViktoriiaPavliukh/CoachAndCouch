import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  List,
  ListItem,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AboutUsImage } from "./AboutUsImage";
import { themeReducer } from "@/redux/theme/slice";

export function AboutUsPage() {
  const intl = useIntl();
  const [pathname, setPathname] = useState("");
  const path = useLocation().pathname;
  useEffect(() => {
    setPathname(path);
  }, [path]);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        paddingX: { md: "60px", xs: "16px" },
        paddingY: { xs: "50px", lg: "90px", xl: "110px" },
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
                  sx={{ color: (theme) => theme.palette.buttonColor.listItem }}
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
                  sx={{ color: (theme) => theme.palette.buttonColor.listItem }}
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
                  sx={{ color: (theme) => theme.palette.buttonColor.listItem }}
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
          gap: { xs: "35px", md: "77px", lg: "60px", xl: "90px" },
          // maxWidth: { md: "60%", lg: "100%" },
          flexWrap: "wrap",
        }}
      >
        <Card
          sx={{
            width: { xs: "80%", md: "45%", lg: "22%", xl: "22%" },
            py: { xs: "32px", xl: "44px" },
            px: "30px",
            maxHeight: { xs: "152px", md: "158px", xl: "218px" },
            borderRadius: "8px",
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
                  lg: "48",
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
              викладачів мають міжнародні сертифікати
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: { xs: "80%", md: "45%", lg: "22%", xl: "22%" },
            py: { xs: "32px", xl: "44px" },
            px: "30px",
            maxHeight: { xs: "152px", md: "158px", xl: "218px" },
            borderRadius: "8px",
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
                  lg: "48",
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
              уроків проводиться щогодини
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: { xs: "80%", md: "45%", lg: "22%", xl: "22%" },
            py: { xs: "32px", xl: "44px" },
            px: "30px",
            maxHeight: { xs: "152px", md: "158px", xl: "218px" },
            borderRadius: "8px",
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
                  lg: "48",
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
              реєстрацій на пробний урок щотижня
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: { xs: "80%", md: "45%", lg: "22%", xl: "22%" },
            py: { xs: "32px", xl: "44px" },
            px: "30px",
            maxHeight: { xs: "152px", md: "158px", xl: "218px" },
            borderRadius: "8px",
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
                  lg: "48",
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
              задоволених учнів за 5 років
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
