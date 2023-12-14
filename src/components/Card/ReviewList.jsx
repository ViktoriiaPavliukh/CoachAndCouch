import { PropTypes } from "prop-types";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addFeedback } from "@/redux/user/operations";

import { selectToken, selectUser } from "@/redux/auth/selectors";
import { toast } from "react-toastify";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { useIntl } from "react-intl";

import format from "date-fns/format";
import { useState } from "react";
import { getAdvertById } from "@/redux/marketplace/adverts/operations";

export function ReviewList({ elements, id, userImage, advertId }) {
  const [showAll, setShowAll] = useState(false);
  const defaultShow = 3;
  const showAllByDefault = elements.length <= defaultShow;
  const elementsToShow = showAll || showAllByDefault ? elements : elements.slice(0, defaultShow);

  const [updateFeedback, setFeedback] = useState({ mark: "", message: "" });
  console.log(updateFeedback);
  const intl = useIntl();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const en = useSelector(selectCurrentLanguage);
  const userId = useSelector(selectUser).id;
  const reviewHandleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      mark: Number(e.target.mark?.value),
      message: e.target.message?.value,
    };
    console.log(feedback);

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
    dispatch(addFeedback({ id, feedback }));
    dispatch(getAdvertById(advertId));
    e.target.reset();
  };
  // console.log(elements);

  return (
    <>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginBottom: "30px",
        }}
      >
        {showAllByDefault ? null : (
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              textDecoration: "underline",
              textAlign: "end",
              color: "#757575",
              position: "absolute",
              top: "-55px",
              right: 0,
            }}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "hide" : "Show all feedbacks"}
          </button>
        )}
        {[...elementsToShow]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((e) => (
            <ListItem key={e.id} sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: "24px", width: "100%" }}>
                <img
                  src={userImage}
                  alt={e.fromUser.firstName + " " + e.fromUser.lastName}
                  style={{ width: "85px", height: "85px", borderRadius: "50%" }}
                />
                <Box>
                  <Box
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="p" variant="posterCategory" color="primary.main" sx={{ mb: "8px" }}>
                      {e.fromUser.firstName + " " + e.fromUser.lastName}
                    </Typography>
                    <span
                      style={{
                        fontSize: "14px",
                        lineHeight: "calc(20 / 14)",
                        color: "grey.600",
                        marginBottom: "8px",
                      }}
                    >
                      ({e.mark})
                    </span>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: "calc(20 / 14)",
                      color: "grey.600",
                    }}
                  >
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
      <form
        id="reviewForm"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          alignItems: "left",
          padding: "8px 16px",
          marginBottom: "30px",
        }}
        onSubmit={reviewHandleSubmit}
      >
        <Typography
          component="p"
          variant="posterCategory"
          color="primary.main"
          sx={{ mb: "0px", mr: "auto", ml: "auto" }}
        >
          {/* Залиште свій відгук про викладача */}
          {intl.formatMessage({ id: "titleRewiewForm" })}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <label> {intl.formatMessage({ id: "reviewMark" })}</label>
          <input
            type="number"
            style={{ height: "30px", borderRadius: "4px", padding: "12px" }}
            name="mark"
            min="1"
            max="5"
            defaultValue={updateFeedback.mark}
            onChange={(e) => setFeedback({ ...updateFeedback, mark: e.target.value })}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <label>{intl.formatMessage({ id: "reviewMessage" })}</label>
          <textarea
            style={{ height: "200px", borderRadius: "4px", padding: "12px" }}
            name="message"
            defaultValue={updateFeedback.message}
            onChange={(e) => setFeedback({ ...updateFeedback, message: e.target.value })}
          ></textarea>
        </div>
        <Button type="submit" sx={{ alignSelf: "center", p: "10px 18px" }} variant="contained">
          <Typography variant="posterButton">{intl.formatMessage({ id: "sendBtn" })}</Typography>
        </Button>
      </form>
    </>
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
