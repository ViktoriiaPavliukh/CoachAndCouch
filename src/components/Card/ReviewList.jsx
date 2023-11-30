import { PropTypes } from "prop-types";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addFeedback } from "@/redux/user/operations";
import Loader from "../Loader/Loader";
import { selectAdvertsIsLoading } from "@/redux/marketplace/adverts/advertsSelector";
import { selectToken } from "@/redux/auth/selectors";
import { toast } from "react-toastify";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { useIntl } from "react-intl";

export function ReviewList({ elements, id, userImage }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAdvertsIsLoading);
  const token = useSelector(selectToken);
  const en = useSelector(selectCurrentLanguage);
  const reviewHandleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      mark: Number(e.target.mark?.value),
      message: e.target.message?.value,
    };
    console.log(feedback, id);
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
    dispatch(addFeedback({ id, feedback }));
    e.target.reset();
  };
  console.log(elements);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginBottom: "30px",
        }}
      >
        {elements.map((e) => (
          <ListItem key={e.id} sx={{ display: "flex", gap: "24px" }}>
            <img
              src={userImage}
              alt={e.fromUser.firstName + " " + e.fromUser.lastName}
              style={{ width: "85px", height: "85px", borderRadius: "50%" }}
            />
            <Box>
              <Typography component="p" variant="posterCategory" color="primary.main" sx={{ mb: "8px" }}>
                {e.fromUser.firstName + " " + e.fromUser.lastName}
              </Typography>
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
          <textarea style={{ height: "200px", borderRadius: "4px", padding: "12px" }} name="message"></textarea>
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
};
