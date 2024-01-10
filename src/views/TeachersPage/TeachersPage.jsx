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

  const listItemStyles = {
    color: (theme) => theme.palette.textColor.fontColor,
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "32px",
  };

  return (
    <>
      <Box
        maxWidth="1168px"
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
            }}
          >
            <Typography
              variant="fontHeading"
              sx={{
                color: (theme) => theme.palette.textColor.title,
                fontSize: { lg: "50px", md: "36px", xs: "32px" },
                lineHeight: { xs: "40px", md: "44px", lg: "60px" },
                display: "inline-block",
              }}
            >
              {intl.formatMessage({ id: "findTeacher" })}
            </Typography>
            <Box sx={{ display: { md: "none" }, pb: "8px" }}>
              <DescriptionImage />
            </Box>
            <List
              sx={{
                padding: "0",
              }}
            >
              <ListItem sx={{ padding: "0" }}>
                <ListItemText
                  primary={intl.formatMessage({ id: "list1" })}
                  sx={listItemStyles}
                />
              </ListItem>
              <ListItem sx={{ padding: "0" }}>
                <ListItemText
                  primary={intl.formatMessage({ id: "list2" })}
                  sx={listItemStyles}
                />
              </ListItem>
              <ListItem sx={{ padding: "0" }}>
                <ListItemText
                  primary={intl.formatMessage({ id: "list3" })}
                  sx={listItemStyles}
                />
              </ListItem>
            </List>
            <Button
              type="button"
              variant="contained"
              onClick={handleClick}
              sx={{
                p: "12px 53px",
                maxWidth: { xs: "100%", sm: "375px", md: "328px" },
                borderRadius: "8px",
                transition: "background-color 0.3s",
                backgroundColor: (theme) => theme.palette.buttonColor.main,
                "&:hover": {
                  backgroundColor: (theme) =>
                    theme.palette.buttonColor.darkHover,
                },
              }}
            >
              <Typography
                variant="posterButton"
                sx={{ color: (theme) => theme.palette.buttonColor.fontColor }}
              >
                {intl.formatMessage({ id: "learnMore" })}
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: { md: "376px", lg: "fit-content" },
              marginRight: "-200px",
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
