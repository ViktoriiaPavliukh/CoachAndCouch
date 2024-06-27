import { useIntl } from "react-intl";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
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
            pb: { lg: "60px", xs: "40px" },
            mb: {xs: "20px", lg: "40px"},
            gap: "5%",
            width: "100%",
            backgroundColor: (theme) => theme.palette.background.mainPage,
          }}
        >
          <Box
            sx={{
              display: "flex",
              mt: { lg: "0", xs: "40px" },
              flexDirection: "column",
              gap: { xs: "40px" },
              width: "100%",
              justifyContent: { lg: "center" },
              paddingX: { md: "60px", xs: "16px" },
            }}
          >
            <Typography
              variant="fontHeading"
              sx={{
                color: (theme) => theme.palette.textColor.title,
                fontSize: { xl: "72px", lg: "50px", md: "36px", xs: "30px" },
                lineHeight: { xs: "120%", md: "44px", lg: "60px", xl: "72px" },
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
              marginRight: { lg: "0", xl: "0" },
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
