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
  ListItemText,
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
        flexDirection: "row",
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
    </Box>
  );
}
