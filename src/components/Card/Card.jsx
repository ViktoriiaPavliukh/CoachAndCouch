import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  advertByIdSelector,
  selectAdvertsIsLoading,
} from "@/redux/marketplace/adverts/advertsSelector";
import { useParams } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { Box, Button, Container, Typography } from "@mui/material";
import { MainImage } from "./MainImage";
import { LikeBtn } from "./LikeBtn";
import { MessageBtn } from "./MessageBtn";
import { CategoryList } from "./CategoryList";
import { ReviewList } from "./ReviewList";
import userImage from "@assets/templates/avatar_1.webp";

import countriesCase from "@/helpers/countriesCase";
import countries from "../../defaults/countries/countries.json";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { getAdvertById } from "@/redux/marketplace/adverts/operations";
import Loader from "../Loader/Loader";
import { roundRating } from "@/helpers/roundRating";

export function Card() {
  const [showModal, setShowModal] = useState(false);
  const [modalContentType, setModalContentType] = useState(null);
  const en = useSelector(selectCurrentLanguage);
  const teacherId = useParams();
  const isLoading = useSelector(selectAdvertsIsLoading);
  const onShowModalClick = (contentType) => {
    setModalContentType(contentType);
    setShowModal(true);
  };

  const onBackdropClose = () => {
    setShowModal(false);
    setModalContentType(null);
  };
  const intl = useIntl();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdvertById(teacherId.id));
  }, [dispatch, teacherId]);

  const teacher = useSelector(advertByIdSelector);

  // const teacher = adverts.find((advert) => advert.id === +teacherId.id);
  return (
    <Container
      component="div"
      sx={{
        pt: 11,
        maxWidth: { lg: "1200px", md: "834px", sm: "375px" },
        pl: { lg: "30px", md: "20px", sm: "15px" },
        pr: { lg: "30px", md: "20px", sm: "15px" },
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        teacher && (
          <>
            <Box
              sx={{
                display: "flex",
                gap: "24px",
                mb: "40px",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <MainImage src={teacher.imagePath} />
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  paddingTop: "9.6px",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    mb: "20px",
                    alignItems: "center",
                    p: 0,
                  }}
                >
                  <Typography variant="posterName">
                    {teacher.user.firstName + " " + teacher.user.lastName}
                  </Typography>
                  <img
                    src={`https://flagcdn.com/w40/${teacher.user.country?.alpha2.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w80/${teacher.user.country?.alpha2.toLowerCase()}.png 2x`}
                    width="40"
                    height="36"
                    alt="ua"
                    style={{
                      width: "52px",
                      height: "36px",
                      marginLeft: "4px",
                      border: "0.2px solid rgba(0, 0, 0, 0.14)",
                    }}
                  />
                  <Box
                    sx={{
                      display: {
                        xs: "none",
                        lg: "flex",
                        alignItems: "center",
                        mb: "20px",
                      },
                    }}
                  >
                    <MessageBtn
                      onShowModalClick={() => onShowModalClick("sendMessage")}
                    />
                    <LikeBtn />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#0E5B1D",
                      marginRight: "12px",
                    }}
                  ></span>
                  <Typography
                    color="grey.700"
                    variant="posterItem"
                    sx={{ mr: 5.5 }}
                  >
                    {intl.formatMessage({ id: "online" })}
                  </Typography>
                  <Typography
                    variant="posterItem"
                    color="grey.700"
                    sx={{ mr: 0.5 }}
                  >
                    {intl.formatMessage({ id: "rate" })}:
                  </Typography>
                  <Typography variant="posterItem" sx={{ mr: 3.5 }}>
                    {roundRating(teacher.user.rating)}
                  </Typography>
                  <Typography
                    variant="posterItem"
                    color="grey.700"
                    sx={{ mr: 0.5 }}
                  >
                    {intl.formatMessage({ id: "lessons" })}:
                  </Typography>
                  <Typography variant="posterItem">156</Typography>
                </Box>
                <Typography variant="posterCategory" color="grey.600">
                  {intl.formatMessage({ id: "languagesTeaching" })}
                </Typography>
                <CategoryList
                  elements={
                    teacher.teachingLanguages &&
                    teacher.teachingLanguages.map((el) =>
                      en == "en" ? el.languageEn : el.languageUa
                    )
                  }
                />
                <Typography variant="posterCategory" color="grey.600">
                  {intl.formatMessage({ id: "specialization" })}
                </Typography>
                <CategoryList
                  elements={
                    teacher.specializations &&
                    teacher.specializations.map((el) =>
                      en == "en" ? el.specializationEn : el.specializationUa
                    )
                  }
                />
                <Typography variant="posterCategory" color="grey.600">
                  {intl.formatMessage({ id: "country" })}
                </Typography>
                <CategoryList
                  elements={
                    teacher.user.country && en == "en"
                      ? countriesCase(
                          countries.find(
                            (el) => el.alpha2 === teacher.user.country?.alpha2
                          ).nameEng
                        ).split(",")
                      : countriesCase(
                          countries.find(
                            (el) => el.alpha2 === teacher.user.country?.alpha2
                          ).nameShort
                        ).split(",")
                  }
                />
                <Typography variant="posterCategory" color="grey.600">
                  {intl.formatMessage({ id: "platforms" })}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", lg: "none" },
                alignItems: "center",
                mb: "20px",
              }}
            >
              <MessageBtn
                onShowModalClick={() => onShowModalClick("sendMessage")}
              />
              <LikeBtn />
            </Box>
            <Box mb="40px">
              <Typography
                variant="posterTitle"
                component="p"
                color="grey.600"
                mb="36px"
              >
                {intl.formatMessage({ id: "aboutMe" })}
              </Typography>
              <Typography variant="posterDescription">
                {teacher.description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", lg: "row" },
                width: "100%",
                gap: "5%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: { xs: "100%", lg: "572px" },
                  flexDirection: "column",
                }}
              >
                <Typography variant="posterTitle" color="grey.600" mb="36px">
                  {intl.formatMessage({ id: "feedback" })} (
                  {teacher.user.feedbacksToMe.length})
                </Typography>
                <ReviewList
                  // elements={teacher.user.feedbacksToMe}
                  id={teacher.user.id}
                  userImage={userImage}
                  advertId={teacher.id}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", lg: "50%" },
                  display: "flex",
                  flexDirection: "column",
                  ml: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", md: "row" },
                    gap: 4,
                    alignItems: "center",
                    mb: 8,
                  }}
                >
                  <Button
                    onClick={() => onShowModalClick("trialLesson")}
                    type="button"
                    variant="contained"
                    sx={{ p: "12px 24px", width: { xs: "100%", md: "328px" } }}
                  >
                    <Typography variant="posterButton">
                      {intl.formatMessage({ id: "trialLessonBtn" })}
                    </Typography>
                  </Button>
                  <Typography variant="posterPrice">
                    {Math.ceil(teacher.price)} $
                  </Typography>
                </Box>
              </Box>
            </Box>
            {showModal && (
              <Modal
                id={teacher.id}
                onBackdropClose={onBackdropClose}
                contentType={modalContentType}
              />
            )}
          </>
        )
      )}
    </Container>
  );
}
