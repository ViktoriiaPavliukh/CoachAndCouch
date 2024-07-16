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
import { CategoryList } from "../Card/CategoryList";
import { TeacherImage } from "./TeacherImage";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import countries from "../../defaults/countries/countries.json";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import countriesCase from "@/helpers/countriesCase";
import { roundRating } from "@/helpers/roundRating";
import {
  favoriteAdvert,
  getAdverts,
} from "@/redux/marketplace/adverts/operations";
// import { selectUser } from "@/redux/auth/selectors";

export function TeacherCard({ teacher }) {
  // const user = useSelector(selectUser);
  // console.log(user);

  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContentType, setModalContentType] = useState(null);

  const intl = useIntl();
  const en = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();

  const onShowModalClick = (contentType) => {
    setModalContentType(contentType);
    setShowModal(true);
  };

  const onBackdropClose = () => {
    setShowModal(false);
    setModalContentType(null);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // e.preventDefault();

    navigate(`/teachers/${teacher.id}`);
  };
  const handleFavoriteAdd = async (id) => {
    try {
      await dispatch(favoriteAdvert(id));
      await dispatch(getAdverts());
    } catch (error) {
      console.error("Failed to update favorite and fetch adverts:", error);
    }
  };

  // const setBg = () => {
  //   return "#" + Math.floor(Math.random() * 16777215).toString(16);
  // };

  return (
    <>
      <Card
        teacher={teacher}
        sx={{
          width: { xs: "343px", lg: "400px" },
          minWidth: "100wv",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
          flexGrow: 1,
          height: "100%",
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
        </CardActionArea>
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              gap: "24px",
              mb: "8px",
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography
                // gutterBottom
                // variant="posterDescription"
                sx={{ fontWeight: "700", letterSpacing: "-0.003px" }}
              >
                {teacher.user.firstName + " " + teacher.user.lastName}
              </Typography>
            </Stack>

            <Typography>ID:&nbsp;{teacher.id}</Typography>
          </Stack>
          <Typography
            variant="posterItem"
            sx={{ color: (theme) => theme.palette.textColor.grey }}
          >
            {intl.formatMessage({ id: "languagesTeaching" })}:
          </Typography>
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
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="posterItem"
              sx={{ color: (theme) => theme.palette.textColor.grey }}
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
              height: "21px",
            }}
          >
            <Box style={{ display: "flex", gap: "12px", pt: "4px" }}>
              <Box sx={{ display: "flex", gap: "4px" }}>
                <StarBorderPurple500OutlinedIcon
                  sx={{
                    fontSize: "16px",
                    color: (theme) => theme.palette.textColor.darkGrey,
                  }}
                />
                <Typography variant="posterItem">
                  {roundRating(teacher.user.rating)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "4px" }}>
                <Button
                  disableTouchRipple
                  onClick={() => handleFavoriteAdd(teacher.id)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    backgroundColor: "transparent",
                    padding: 0,
                    gap: "4px",
                  }}
                >
                  {!isFavorite && (
                    <FavoriteBorderOutlinedIcon
                      sx={{
                        fontSize: "16px",
                        color: (theme) => theme.palette.textColor.darkGrey,
                      }}
                    />
                  )}
                  {isFavorite && (
                    <FavoriteIcon
                      sx={{
                        fontSize: "16px",
                        fill: "#7ab02e",
                      }}
                    />
                  )}
                  <Typography
                    variant="posterItem"
                    sx={{
                      color: "rgba(0, 0, 0, 0.87)",
                    }}
                  >
                    {teacher.likes.length}
                  </Typography>
                </Button>
              </Box>
              <Box sx={{ display: "flex", gap: "4px" }}>
                <Typography
                  variant="posterItem"
                  sx={{ color: (theme) => theme.palette.textColor.darkGrey }}
                >
                  {intl.formatMessage({ id: "lessons" })}:
                </Typography>
                <Typography variant="posterItem">156</Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                color="grey.700"
                variant="posterStatus"
                sx={{ display: "inline-block" }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#0E5B1D",
                    mr: "4px",
                  }}
                />
                {intl.formatMessage({ id: "online" })}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => onShowModalClick("trialLesson")}
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
            {intl.formatMessage({ id: "trialLessonBtn" })}
          </Button>
        </CardActions>
      </Card>
      {showModal && (
        <Modal
          onBackdropClose={onBackdropClose}
          contentType={modalContentType}
          isOpen={showModal}
        />
      )}
    </>
  );
}
TeacherCard.propTypes = {
  teacher: PropTypes.object.isRequired,
};
