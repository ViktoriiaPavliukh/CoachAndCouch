import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  advertByIdSelector,
  selectAdvertsIsLoading,
} from "@/redux/marketplace/adverts/advertsSelector";
import { getCurrentUser, sendMessageFromUser } from "@/redux/users/operations";
import {
  selectCurrentUser,
  selectUserIsLoading,
} from "@/redux/users/selectors";
import { useParams } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { Box, Button, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { MainImage } from "./MainImage";
import { LikeBtn } from "./LikeBtn";
import { MessageBtn } from "./MessageBtn";
import { CategoryList } from "./CategoryList";
import { ReviewList } from "./ReviewList";
import countriesCase from "@/helpers/countriesCase";
import countries from "../../defaults/countries/countries.json";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { getAdvertById } from "@/redux/marketplace/adverts/operations";
import Loader from "../Loader/Loader";
import { roundRating } from "@/helpers/roundRating";
import { Stack } from "@mui/system";
import { selectUser } from "@/redux/auth/selectors";

export function Card() {
  const [showModal, setShowModal] = useState(false);
  const [modalContentType, setModalContentType] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const en = useSelector(selectCurrentLanguage);
  const currentUser = useSelector(selectCurrentUser);
  const teacherId = useParams();
  const teacher = useSelector(advertByIdSelector);
  const isLoading = useSelector(selectAdvertsIsLoading);
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    dispatch(getAdvertById(teacherId.id));
  }, [dispatch, teacherId]);

  useEffect(() => {
    if (teacher) {
      setLikesCount(teacher.likes?.length || 0);
    }
  }, [teacher]);

  const onShowModalClick = (contentType) => {
    setModalContentType(contentType);
    setShowModal(true);
  };

  const handleLikeClick = () => {
    setLikesCount((prevLikesCount) =>
      teacher.likes?.some((like) => like.userId === currentUser.id)
        ? prevLikesCount - 1
        : prevLikesCount + 1
    );
  };

  const onBackdropClose = () => {
    setShowModal(false);
    setModalContentType(null);
  };

  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        py: "40px",
        px: { xs: "16px", md: "60px" },
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
                gap: "56px",
                mb: "57px",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <MainImage src={teacher.imagePath} />
              <Box
                sx={{
                  display: "flex",
                  width: { xs: "100%", lg: "36%" },
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: { xs: "100%", lg: "463px" },
                    mb: "20px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 0,
                    gap: "24px",
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="fontHeader">
                      {teacher.user.firstName}
                    </Typography>
                    <Typography variant="fontHeader">
                      {teacher.user.lastName}
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <LikeBtn
                      advertId={teacherId.id}
                      onLikeClick={handleLikeClick}
                    />
                    <Typography variant="posterDescription">
                      {" "}
                      {likesCount}
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <CircleIcon
                      fontSize="12px"
                      sx={{
                        color: (theme) => theme.palette.buttonColor.listItem,
                      }}
                    />
                    <Typography
                      variant="posterDescription"
                      sx={{ textWrap: "nowrap" }}
                    >
                      {intl.formatMessage({ id: "online" })}
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "20px",
                    gap: "12px",
                    width: { xs: "100%", lg: "463px" },
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: "16px",
                      backgroundColor: (theme) =>
                        theme.palette.buttonColor.listItem,
                      color: (theme) => theme.palette.textColor.black,
                      borderRadius: "8px",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    <Typography variant="posterDescription">
                      {intl.formatMessage({ id: "lessons" })}
                    </Typography>
                    <Typography variant="fontHeader">156</Typography>
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      py: "16px",
                      backgroundColor: (theme) =>
                        theme.palette.buttonColor.listItem,
                      color: (theme) => theme.palette.textColor.black,
                      borderRadius: "8px",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    <Typography variant="posterDescription">
                      {intl.formatMessage({ id: "rate" })}
                    </Typography>
                    <Typography variant="fontHeader">
                      {roundRating(teacher.user.rating)}
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      py: "16px",
                      backgroundColor: (theme) =>
                        theme.palette.buttonColor.listItem,
                      color: (theme) => theme.palette.textColor.black,
                      borderRadius: "8px",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    <Typography variant="posterDescription">
                      {intl.formatMessage({ id: "priceOfLesson" })}
                    </Typography>
                    <Typography variant="fontHeader">
                      {Math.ceil(teacher.price)}$
                    </Typography>
                  </Stack>
                </Box>
                <Typography variant="text">
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
                <Typography variant="text">
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
                {/* <Typography variant="posterCategory">
                  {intl.formatMessage({ id: "specialization" })}
                </Typography>
                <CategoryList
                  elements={
                    teacher.specializations &&
                    teacher.specializations.map((el) =>
                      en == "en" ? el.specializationEn : el.specializationUa
                    )
                  }
                /> */}
                {/* <Typography variant="text">
                  {intl.formatMessage({ id: "platforms" })}
                </Typography> */}
                <Box
                  sx={{
                    width: { xs: "100%" },
                    display: "flex",
                    flexDirection: "row",
                    gap: "24px",
                    mt: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={() => onShowModalClick("trialLesson")}
                    type="button"
                    variant="contained"
                    sx={{
                      p: "12px 24px",
                      borderRadius: "6px",
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="posterButton">
                      {intl.formatMessage({ id: "trialLessonBtn" })}
                    </Typography>
                  </Button>
                  <MessageBtn
                    onShowModalClick={() => onShowModalClick("sendMessage")}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: "56px",
                flexDirection: { xs: "column", lg: "row" },
              }}
            >
              <Stack
                sx={{
                  width: { xs: "100%", lg: "54%", xl: "49%" },
                }}
              >
                <Typography variant="fontHeader" component="p" mb="20px">
                  {intl.formatMessage({ id: "aboutMe" })}
                </Typography>
                <Typography
                  variant="text"
                  sx={{ mb: "40px", textAlign: "justify" }}
                >
                  {teacher.description}
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  width: { xs: "100%" },
                  flexDirection: "column",
                }}
              >
                <ReviewList
                  feedback={teacher.user.feedbacksToMe.length}
                  id={teacher.user.id}
                  advertId={teacher.id}
                />
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
    </Box>
  );
}
