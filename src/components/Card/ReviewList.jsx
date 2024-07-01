import { PropTypes } from "prop-types";
import {
  Box,
  Button,
  List,
  ListItem,
  Input,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addFeedback } from "@/redux/users/operations";
import { selectToken, selectUser } from "@/redux/auth/selectors";
import { toast } from "react-toastify";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { useIntl } from "react-intl";
import format from "date-fns/format";
import { useState } from "react";
import { getAdvertById } from "@/redux/marketplace/adverts/operations";
import { advertByIdSelector } from "@/redux/marketplace/adverts/advertsSelector";
import mainImage from "@assets/icons/noPhoto.png";

export function ReviewList({ id, advertId, feedback }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const totalStars = 5;
  const reviews = useSelector(advertByIdSelector).user.feedbacksToMe;
  const [showAll, setShowAll] = useState(false);
  const defaultShow = 3;
  const showAllByDefault = reviews.length <= defaultShow;
  const elementsToShow =
    showAll || showAllByDefault ? reviews : reviews.slice(0, defaultShow);
  const [message, setMessage] = useState("");
  const intl = useIntl();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const en = useSelector(selectCurrentLanguage);
  const userId = useSelector(selectUser).id;

  const capitalizeFirstLetter = (text) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const reviewHandleSubmit = (e) => {
    e.preventDefault();
    if (rating === null) {
      if (en === "en") {
        toast.error("Please, enter the rating", {
          icon: false,
        });
      } else {
        toast.error("Введіть будь-ласка рейтинг", {
          icon: false,
        });
      }
      return;
    }
    if (message === "") {
      if (en === "en") {
        toast.error("Please, leave the comment", {
          icon: false,
        });
      } else {
        toast.error(" Залиште будь-ласка коментар", {
          icon: false,
        });
      }
      return;
    }
    const feedback = {
      mark: rating,
      message: message,
    };

    if (!token) {
      if (en === "en") {
        toast.error("Only authorized users can post reviews", {
          icon: false,
        });
      } else {
        toast.error("Лише авторизовані користувачі можуть залишати відгуки", {
          icon: false,
        });
      }
      return;
    }
    if (userId === id) {
      if (en === "en") {
        toast.error("The user cannot write feedback to himself", {
          icon: false,
        });
      } else {
        toast.error("Ви не можете написати відгук самі собі", {
          icon: false,
        });
      }
      return;
    }

    dispatch(addFeedback({ id, feedback })).then(() =>
      dispatch(getAdvertById(advertId))
    );

    e.target.reset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "56px",
        width: "100%",
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Stack direction="column" sx={{ width: { xs: "100%", lg: "36%" } }}>
        <Typography variant="fontHeader" mb="20px">
          {intl.formatMessage({ id: "feedback" })} ({feedback})
        </Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "44px",
            marginBottom: "30px",
            width: { xs: "100%" },
            p: 0,
          }}
        >
          {showAllByDefault ? null : (
            <Button
              sx={{
                backgroundColor: "transparent",
                border: "none",
                textDecoration: "none",
                textTransform: "none",
                color: (theme) => theme.palette.textColor.fontColor,
                position: "absolute",
                bottom: "-40px",
                transform: "translateX(-50%)",
                left: "50%",
                textAlign: "center",
              }}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {capitalizeFirstLetter(
                intl.formatMessage({ id: showAll ? "hide" : "showAll" })
              )}
            </Button>
          )}
          {[...elementsToShow]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((e) => (
              <ListItem
                key={e.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 0,
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", gap: "24px", width: "100%" }}>
                  <img
                    src={e.fromUser.photoPath || mainImage}
                    alt={e.fromUser.firstName + " " + e.fromUser.lastName}
                    style={{
                      width: "85px",
                      height: "85px",
                      borderRadius: "50%",
                    }}
                  />
                  <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Box
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                    >
                      <Typography
                        component="p"
                        variant="text"
                        sx={{ mb: "8px", p: 0 }}
                      >
                        {e.fromUser.firstName +
                          " " +
                          (e.fromUser.lastName || "")}
                      </Typography>
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "top",
                          pt: "3px",
                          gap: "4px",
                        }}
                      >
                        <StarBorderOutlinedIcon
                          fontSize="16px"
                          sx={{
                            mt: "2px",
                            color: (theme) => theme.palette.background.yellow,
                          }}
                        />
                        <Typography
                          variant="text"
                          sx={{
                            display: "flex",
                            fontSize: "14px",
                            lineHeight: "calc(20 / 14)",
                            marginBottom: "8px",
                          }}
                        >
                          {e.mark}
                        </Typography>
                      </Stack>
                    </Box>
                    <Typography variant="posterDescription">
                      {e.message}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    lineHeight: "calc(20 / 14)",
                    color: "grey.600",
                    alignSelf: "flex-end",
                  }}
                >
                  {format(new Date(e.createdAt), "dd.MM.yyyy HH:mm")}
                </Typography>
              </ListItem>
            ))}
        </List>
      </Stack>
      <form
        id="reviewForm"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "left",
          marginBottom: "30px",
          width: { xs: "100%", lg: "67%" },
        }}
        onSubmit={(e) => reviewHandleSubmit(e)}
      >
        <Box>
          <Typography component="p" variant="fontHeader">
            {intl.formatMessage({ id: "titleRewiewForm" })}
          </Typography>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              gap: "2px",
              pt: "5px",
            }}
          >
            <Typography component="p" variant="posterItem">
              {intl.formatMessage({ id: "shareReview" })}
            </Typography>
            <InfoOutlinedIcon fontSize="12px" />
          </Stack>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <label> {intl.formatMessage({ id: "reviewMark" })}</label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "40px",
            }}
          >
            {[...Array(totalStars)].map((star, index) => {
              const currentRating = index + 1;
              const isLastStar = index === totalStars - 1;

              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    className="starRating"
                    value={currentRating}
                    onChange={() => {
                      setRating(currentRating);
                    }}
                  />
                  <span
                    className="star"
                    style={{
                      paddingRight: isLastStar ? "0" : "15px",
                      margin: "0",
                      color:
                        currentRating <= (hover || rating)
                          ? "#ffc107"
                          : "#e4e5e9",
                    }}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  >
                    &#9733;
                  </span>
                </label>
              );
            })}
            {rating && (
              <span>
                {rating}/{totalStars}
              </span>
            )}
          </div>
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          {/* <Input
            disableUnderline
            sx={{
              height: "200px",
              borderRadius: "4px",
              padding: "12px 16px",
              border: "1px solid #D1D5DB",
              color: (theme) => theme.palette.textColor.fontColor,
              backgroundColor: (theme) => theme.palette.background,
              alignItems: "start",
            }}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            inputProps={{ style: { textAlign: "start" } }}
          /> */}
          <TextField
            variant="outlined"
            multiline
            label={intl.formatMessage({ id: "reviewMessage" })}
            rows={8}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              sx: {
                borderRadius: "4px",
                padding: "12px 16px",
                border: "1px solid #D1D5DB",
                color: (theme) => theme.palette.textColor.fontColor,
                backgroundColor: (theme) => theme.palette.background,
                alignItems: "start",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#D1D5DB",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D1D5DB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#D1D5DB",
                  },
                },
              },
              style: { textAlign: "start" },
            }}
            fullWidth
          />
        </div>
        <Button
          type="submit"
          sx={{ alignSelf: "start", p: "12px 32px" }}
          variant="contained"
        >
          <Typography variant="posterButton">
            {intl.formatMessage({ id: "sendBtn" })}
          </Typography>
        </Button>
      </form>
    </Box>
  );
}

ReviewList.propTypes = {
  userImage: PropTypes.string,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      // name: PropTypes.string,
      message: PropTypes.string,
      // image: PropTypes.string,
    })
  ),
  id: PropTypes.number,
  advertId: PropTypes.number,
};
