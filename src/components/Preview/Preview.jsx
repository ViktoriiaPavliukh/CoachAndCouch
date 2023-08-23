import {
  Container,
  Box,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
} from "@mui/material";
import { FiberManualRecord as FiberManualRecordIcon } from "@mui/icons-material";
import { DescriptionImage } from "./DescriptionImage";
import { Filter } from "./Filter";
import { TeacherCard } from "./TeacherCard";
import {
  languageOptions,
  ratingOptions,
  lessonTimeOptions,
  hobbyOptions,
  countryOptions,
  specializationOptions,
  teacherCardData,
} from "@/defaults";

export function Preview() {
  const listItemStyles = {
    color: (theme) => theme.palette.textColor.grey,
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "16px",
  };
  return (
    <Container
      component="div"
      maxWidth="100vw"
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        justifyContent: "center",
        px: { xs: "16px" },
      }}
    >
      <Box
        maxWidth="1168px"
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
            }}
          >
            <Typography
              variant="fontHeading"
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: { lg: "50px", md: "36px", xs: "32px" },
                lineHeight: { xs: "40px", md: "44px", lg: "60px" },
                display: "inline-block",
              }}
            >
              Знайдіть ідеального викладача
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
                  <FiberManualRecordIcon
                    sx={{ color: (theme) => theme.palette.buttonColor.main }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Понад 1000 викладачів"
                  sx={listItemStyles}
                />
              </ListItem>
              <ListItem sx={{ padding: "0" }}>
                <ListItemIcon sx={{ minWidth: "35px" }}>
                  <FiberManualRecordIcon
                    sx={{ color: (theme) => theme.palette.buttonColor.main }}
                  />
                </ListItemIcon>
                <ListItemText primary="Понад 20 мов" sx={listItemStyles} />
              </ListItem>
              <ListItem sx={{ padding: "0" }}>
                <ListItemIcon sx={{ minWidth: "35px" }}>
                  <FiberManualRecordIcon
                    sx={{ color: (theme) => theme.palette.buttonColor.main }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Професійні викладачі та носії мови"
                  sx={listItemStyles}
                />
              </ListItem>
            </List>
            <Button
              type="button"
              variant="contained"
              sx={{
                p: "12px 53px",
                maxWidth: { xs: "100%", sm: "375px", md: "328px" },
                borderRadius: "8px",
                transition: "background-color 0.3s",
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
                Дізнатися більше
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
        <Stack
          direction="row"
          sx={{
            mb: { lg: "43px", md: "58px", xs: "36px" },
            display: "flex",
            maxWidth: { xs: "100%", md: "585px", sm: "500px", lg: "100%" },
            justifyContent: "center",
            flexWrap: { xs: "wrap", lg: "nowrap" },
            columnGap: { xs: "16px", md: "30px", lg: "24px" },
            rowGap: { xs: "16px", md: "20px" },
          }}
        >
          <Filter options={languageOptions} label="МОВА" />
          <Filter options={ratingOptions} label="РЕЙТИНГ" />
          <Filter options={lessonTimeOptions} label="ЧАС УРОКУ" />
          <Filter options={specializationOptions} label="СПЕЦІАЛІЗАЦІЯ" />
          <Filter options={countryOptions} label="КРАЇНА" />
          <Filter options={hobbyOptions} label="ХОБІ" />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center", mb: "115px" }}>
          <Grid
            container
            sx={{
              columnGap: { sm: "16px", lg: "24px" },
              rowGap: { xs: "32px", md: "48px" },
              justifyContent: "center",
            }}
          >
            {teacherCardData.map((teacher) => (
              <Grid key={teacher.id} item>
                <TeacherCard
                  picture={teacher.picture}
                  description={teacher.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
