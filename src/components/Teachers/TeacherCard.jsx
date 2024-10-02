import { useIntl } from "react-intl";
import { PropTypes } from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Stack,
} from "@mui/material/";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircleIcon from "@mui/icons-material/Circle";
import { CategoryList } from "../Card/CategoryList";
import { TeacherImage } from "./TeacherImage";
import { useNavigate } from "react-router";
import { useState } from "react";
import useStatus from "@/hooks/useStatus";
import countries from "../../defaults/countries/countries.json";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import countriesCase from "@/helpers/countriesCase";
import { roundRating } from "@/helpers/roundRating";
import {
  favoriteAdvert,
  getAdverts,
} from "@/redux/marketplace/adverts/operations";
import { selectUser } from "@/redux/auth/selectors";

export function TeacherCard({ teacher }) {
  const user = useSelector(selectUser);
  const [isFavorite, setIsFavorite] = useState(false);
  const intl = useIntl();
  const en = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastVisit = teacher?.user?.lastVisit;
  const status = useStatus(lastVisit);
  console.log(teacher);
  const userLike =
    teacher?.likes?.some(
      (like) => like.user?.id === user?.id // Corrected here
    ) || false;

  const handleClick = () => {
    navigate(`/teachers/${teacher.id}`);
  };

  const handleBookLessonClick = () => {
    navigate(`/teachers/${teacher.id}`, {
      state: {
        showModal: true,
        modalContentType:
          !user || Object.keys(user).length === 0
            ? "signInOrRegister"
            : "trialLesson",
      },
    });
  };

  const handleFavoriteAdd = async (id) => {
    try {
      await dispatch(favoriteAdvert(id));
      await dispatch(getAdverts());
    } catch (error) {
      console.error("Failed to update favorite and fetch adverts:", error);
    }
  };

  return (
    <>
      <Card
        teacher={teacher}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "343px", lg: "400px" },
          minWidth: "100wv",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
          flexGrow: 1,
          height: "100%",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        <CardActionArea onClick={() => handleClick()}>
          <TeacherImage src={teacher.imagePath} />
          <img
            src={`https://flagcdn.com/w40/${teacher.user?.country?.alpha2.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w80/${teacher.user?.country?.alpha2.toLowerCase()}.png 2x`}
            width="40"
            height="36"
            alt="ua"
            style={{
              width: "52px",
              height: "36px",
              marginLeft: "4px",
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              px: "16px",
              py: 0,
              flexGrow: 1,
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box direction="column">
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "156%",
                  }}
                >
                  {teacher.user.firstName}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "156%",
                  }}
                >
                  {teacher.user.lastName}
                </Typography>
              </Box>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <CircleIcon
                  fontSize="12px"
                  sx={{
                    color:
                      status === intl.formatMessage({ id: "online" })
                        ? (theme) => theme.palette.buttonColor.listItem
                        : (theme) => theme.palette.textColor.grey,
                  }}
                />
                <Typography
                  variant="posterItem"
                  sx={{
                    textWrap: "nowrap",
                    color: (theme) => theme.palette.textColor.greyCard,
                  }}
                >
                  {status}
                </Typography>
              </Stack>
            </Stack>
            {Boolean(teacher.teachingLanguages.length) && (
              <CategoryList
                elements={
                  teacher.teachingLanguages &&
                  teacher.teachingLanguages.map((el) =>
                    en == "en" ? el.languageEn : el.languageUa
                  )
                }
              />
            )}
            <Stack
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                marginBottom: "12px",
              }}
            >
              <Typography
                variant="posterItem"
                sx={{ color: (theme) => theme.palette.textColor.greyCard }}
              >
                {intl.formatMessage({ id: "country" })}:&nbsp;
                {en == "en"
                  ? countriesCase(
                      countries.find(
                        (el) => el.alpha2 == teacher.user?.country?.alpha2
                      ).nameEng
                    )
                  : countriesCase(
                      countries.find(
                        (el) => el.alpha2 == teacher.user?.country?.alpha2
                      ).nameShort
                    )}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: "16px", pb: "12px" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <StarBorderPurple500OutlinedIcon
                    sx={{
                      fontSize: "18px",
                      color: (theme) => theme.palette.textColor.fontColor,
                    }}
                  />
                  <Typography variant="posterDescription">
                    {roundRating(teacher.user.rating)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "4px" }}>
                  <Button
                    disableTouchRipple
                    onClick={(event) => {
                      event.stopPropagation();
                      handleFavoriteAdd(teacher.id);
                    }}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                      backgroundColor: "transparent",
                      padding: 0,
                      gap: "10px",
                    }}
                  >
                    <FavoriteBorderOutlinedIcon
                      sx={{
                        fontSize: "16px",
                        color: (theme) => theme.palette.textColor.fontColor,
                      }}
                    />
                    <Typography
                      variant="posterDescription"
                      sx={{
                        color: (theme) => theme.palette.textColor.fontColor,
                      }}
                    >
                      {teacher.likes.length}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={handleBookLessonClick}
            variant="contained"
            sx={{
              width: "100vw",
              py: "12px",
              m: "8px",
              mt: "0",
              borderRadius: "8px",
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
            {intl.formatMessage({ id: "bookLesson" })}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
TeacherCard.propTypes = {
  teacher: PropTypes.object.isRequired,
};
