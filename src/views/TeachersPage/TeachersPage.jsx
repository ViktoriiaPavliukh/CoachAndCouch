import { useIntl } from "react-intl";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
// import { FiberManualRecord as FiberManualRecordIcon } from "@mui/icons-material";
import { DescriptionImage } from "../../components/Teachers/DescriptionImage";

import { useNavigate } from "react-router-dom";

import { TeacherFilterResult } from "@/components/Teachers/TeacherFilterResult";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getCountries,
  getLanguages,
  getSpecializations,
} from "@/redux/admin/operations";
import { getAdverts } from "@/redux/marketplace/adverts/operations";

export function TeachersPage() {
  const intl = useIntl();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/about`);
  };
  useEffect(() => {
    dispatch(getAdverts());
    dispatch(getLanguages());
    dispatch(getSpecializations());
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <>
      <Box
        width="100%"
        sx={{
          maxWidth: { lg: "1320px", xl: "1800px", md: "648px", sm: "343px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mb: { lg: "60px", md: "60px", xs: "36px" },
            gap: "5%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              mt: { lg: "72px", xs: "36px" },
              flexDirection: "column",
              gap: { xs: "28px", md: "50px", lg: "40px" },
              width: "100%",
              justifyContent: { lg: "center" },
              // alignItems: "center",
            }}
          >
            <Typography
              variant="fontHeading"
              sx={{
                color: (theme) => theme.palette.textColor.title,
                fontSize: { xl: "70px", lg: "50px", md: "36px", xs: "32px" },
                lineHeight: { xs: "40px", md: "44px", lg: "60px", xl: "72px" },
                display: "inline-block",
              }}
            >
              {intl.formatMessage({ id: "findTeacher" })}
            </Typography>
            <List
              sx={{
                padding: "0",
              }}
            >
              <ListItem sx={{ padding: "0" }}>
                <ListItemText
                  primary={intl.formatMessage({ id: "list1" })}
                  primaryTypographyProps={{
                    sx: {
                      color: (theme) => theme.palette.textColor.fontColor,
                      fontSize: {
                        xl: "30px",
                        lg: "24px",
                        md: "20px",
                        xs: "18px",
                      },
                      lineHeight: {
                        xs: "28px",
                        lg: "32px",
                        xl: "36px",
                      },
                      fontStyle: "normal",
                      fontWeight: "400",
                    },
                  }}
                />
              </ListItem>
              <ListItem sx={{ padding: "0" }}>
                <ListItemText
                  primary={intl.formatMessage({ id: "list2" })}
                  primaryTypographyProps={{
                    sx: {
                      color: (theme) => theme.palette.textColor.fontColor,
                      fontSize: {
                        xl: "30px",
                        lg: "24px",
                        md: "20px",
                        xs: "18px",
                      },
                      lineHeight: {
                        xs: "28px",
                        lg: "32px",
                        xl: "36px",
                      },
                      fontStyle: "normal",
                      fontWeight: "400",
                    },
                  }}
                />
              </ListItem>
              <ListItem sx={{ padding: "0" }}>
                <ListItemText
                  primary={intl.formatMessage({ id: "list3" })}
                  primaryTypographyProps={{
                    sx: {
                      color: (theme) => theme.palette.textColor.fontColor,
                      fontSize: {
                        xl: "30px",
                        lg: "24px",
                        md: "20px",
                        xs: "18px",
                      },
                      lineHeight: {
                        xs: "28px",
                        lg: "32px",
                        xl: "36px",
                      },
                      fontStyle: "normal",
                      fontWeight: "400",
                    },
                  }}
                />
              </ListItem>
            </List>
            <Button
              type="button"
              variant="contained"
              onClick={handleClick}
              sx={{
                p: "12px 32px",
                maxWidth: { xs: "100%", sm: "375px", md: "328px" },
                borderRadius: "6px",
                transition: "background-color 0.3s",
                backgroundColor: (theme) => theme.palette.buttonColor.secondary,
                "&:hover": {
                  backgroundColor: (theme) =>
                    theme.palette.buttonColor.secondaryHover,
                },
              }}
            >
              <Typography
                variant="posterButton"
                sx={{
                  color: (theme) =>
                    theme.palette.buttonColor.fontColorSecondary,
                }}
              >
                {intl.formatMessage({ id: "learnMore" })}
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              width: { lg: "100%" },
              marginRight: "-280px",
            }}
          >
            <DescriptionImage />
          </Box>
        </Box>
        <TeacherFilterResult />
      </Box>
    </>
  );
}
