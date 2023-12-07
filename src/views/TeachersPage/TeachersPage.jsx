import { useIntl } from "react-intl";
import {
  // Container,
  Box,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
  Pagination,
} from "@mui/material";
import { FiberManualRecord as FiberManualRecordIcon } from "@mui/icons-material";
import { DescriptionImage } from "../../components/Teachers/DescriptionImage";
import { Filter } from "../../components/Teachers/Filter";
import { TeacherCard } from "../../components/Teachers/TeacherCard";
import { priceOptions } from "@/defaults";
import usePagination from "../../hooks/usePagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { advertsSelector, selectAdvertsIsLoading } from "@/redux/marketplace/adverts/advertsSelector";
import { getAdverts } from "@/redux/marketplace/adverts/operations";
import { useNavigate } from "react-router-dom";
import { countriesSelector, languagesSelector, specializationsSelector } from "@/redux/admin/adminSelector";
import { getCountries, getLanguages, getSpecializations } from "@/redux/admin/operations";

import Loader from "../../components/Loader/Loader";

export function TeachersPage() {
  const intl = useIntl();
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/about`);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdverts());
    dispatch(getLanguages());
    dispatch(getSpecializations());
    dispatch(getCountries());
  }, [dispatch]);
  const adverts = useSelector(advertsSelector);
  const isLoading = useSelector(selectAdvertsIsLoading);
  console.log(adverts);
  const languages = useSelector(languagesSelector);
  const countries = useSelector(countriesSelector);
  const specializations = useSelector(specializationsSelector);
  let [page, setPage] = useState(1);
  const PER_PAGE = 9;
  const count = Math.ceil(adverts.length / PER_PAGE);
  const items = usePagination(adverts, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    items.jump(p);
  };

  const listItemStyles = {
    color: (theme) => theme.palette.textColor.grey,
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "16px",
  };
  return (
    // <Container
    //   component="div"
    //   maxWidth="100vw"
    //   sx={{
    //     backgroundColor: "background.paper",
    //     display: "flex",
    //     justifyContent: "center",
    //   }}
    // >
    <>
      <Box
        maxWidth="1168px"
        width="100%"
        // minWidth="320px"
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
            mt: { lg: "80px", md: "64px", xs: "36px" },
            mb: { lg: "95px", md: "61px", xs: "36px" },
            gap: { md: "18px", lg: "63px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              mt: { lg: "80px", xs: "0px" },
              flexDirection: "column",
              gap: { xs: "28px", md: "50px", lg: "60px" },
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
                <ListItemIcon sx={{ minWidth: "35px", padding: "0" }}>
                  <FiberManualRecordIcon sx={{ color: (theme) => theme.palette.primary.accent }} />
                </ListItemIcon>
                <ListItemText primary={intl.formatMessage({ id: "list1" })} sx={listItemStyles} />
              </ListItem>
              <ListItem sx={{ padding: "0" }}>
                <ListItemIcon sx={{ minWidth: "35px" }}>
                  <FiberManualRecordIcon sx={{ color: (theme) => theme.palette.primary.accent }} />
                </ListItemIcon>
                <ListItemText primary={intl.formatMessage({ id: "list2" })} sx={listItemStyles} />
              </ListItem>
              <ListItem sx={{ padding: "0" }}>
                <ListItemIcon sx={{ minWidth: "35px" }}>
                  <FiberManualRecordIcon sx={{ color: (theme) => theme.palette.primary.accent }} />
                </ListItemIcon>
                <ListItemText primary={intl.formatMessage({ id: "list3" })} sx={listItemStyles} />
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
                  backgroundColor: (theme) => theme.palette.buttonColor.darkHover,
                },
              }}
            >
              <Typography variant="posterButton" sx={{ color: (theme) => theme.palette.buttonColor.fontColor }}>
                {intl.formatMessage({ id: "learnMore" })}
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: { md: "376px", lg: "fit-content" },
            }}
          >
            <DescriptionImage />
          </Box>
        </Box>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Stack
              direction="row"
              sx={{
                mb: { lg: "43px", md: "58px", xs: "36px" },
                display: "flex",
                maxWidth: { xs: "100%", md: "100%", sm: "500px", lg: "1200px" },
                justifyContent: "center",
                flexWrap: { xs: "wrap", lg: "wrap" },
                columnGap: { xs: "16px", md: "30px", lg: "24px" },
                rowGap: { xs: "16px", md: "20px" },
              }}
            >
              <Filter
                options={languages}
                typeoption="languageUa"
                keyfield="id"
                label={intl.formatMessage({ id: "language" })}
              />
              <Filter options={countries} typeoption="alpha2" label={intl.formatMessage({ id: "country" })} />
              <Filter options={priceOptions} typeoption="title" label={intl.formatMessage({ id: "price" })} />
              <Filter
                options={specializations}
                typeoption="specializationUa"
                label={intl.formatMessage({ id: "specialization" })}
              />
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "center", mb: "115px" }}>
              <Grid
                container
                sx={{
                  flexDirection: { sm: "column", md: "row" },
                  columnGap: { md: "14px", lg: "59px" },
                  rowGap: { xs: "32px", md: "48px" },
                  justifyContent: "center",
                }}
              >
                {items &&
                  items.currentData().map((teacher) => {
                    return (
                      <Grid item key={teacher.id}>
                        <TeacherCard teacher={teacher} />
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>
            <Pagination
              sx={{ marginBottom: "50px" }}
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </>
        )}
      </Box>
    </>

    // </Container>
  );
}
