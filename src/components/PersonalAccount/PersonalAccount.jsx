import "react-calendar/dist/Calendar.css";

import { useIntl } from "react-intl";

import {
  Container,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { PersonalImage } from "./PersonalImage";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { useState } from "react";
import {
  Calendar,
  Edit2,
  FileText,
  Grid,
  Heart,
  LogOut,
  MessageSquare,
  Settings,
  Smile,
  Tablet,
} from "react-feather";

const linkStyles = {
  display: "flex",
  gap: "16px",
  padding: "12px",
  textDecoration: "none",
};
const titleStyles = {
  color: "#384C5E",
  fontSize: "22px",
  fontWeight: "300",
  lineHeight: "24px",
};

const IconStyles = {
  color: "#384C5E",
  size: 24,
};
const activeLinks = {
  color: "#24BF2A",
};

const activeTitleStyles = {
  ...titleStyles,
  ...activeLinks,
};
const activeIconStyles = {
  ...IconStyles,
  ...activeLinks,
};

export function PersonalAccount() {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const intl = useIntl();
  const location = useLocation();
  console.log(location);
  console.log(user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <Container
      component="div"
      sx={{
        pt: 11,
        maxWidth: { lg: "1200px", md: "834px", sm: "375px" },
        pl: { lg: "30px", md: "20px", sm: "15px" },
        pr: { lg: "30px", md: "20px", sm: "15px" },
        display: "flex",
        gap: "122px",
        height: "100%",
        pb: "79px",
      }}
    >
      <Box>
        <FormControl
          // fullWidth
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              width: "275px",
              height: "214px",
              border: "1px solid rgba(193, 193, 193, 1)",
              borderRadius: "8px",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {image && (
              <img
                src={image ? image : null}
                alt="user's profile"
                style={{
                  minHeidth: "100%",
                  objectFit: "cover",
                  display: "flex",
                  width: "275px",
                  height: "214px",

                  alignSelf: "stretch",
                }}
              />
            )}

            <label
              htmlFor="image"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                cursor: "pointer",
                position: "absolute",
              }}
            >
              <TextField
                style={{
                  display: "none",
                }}
                fullWidth
                type="file"
                id="image"
                name="image"
                variant="outlined"
                accept="image/*"
                placeholder=""
                onChange={(event) => {
                  // formik.setFieldValue("image", event.target.files[0]);
                  setImage(URL.createObjectURL(event.target.files[0]));
                }}
                // onBlur={formik.handleBlur}
                // error={formik.touched.image && Boolean(formik.errors.image)}
                // helperText={formik.touched.image && formik.errors.image}
              />
            </label>
            {Boolean(!image) && (
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  pointerEvents: "none",
                  cursor: "pointer",
                }}
              >
                + Додати фото
              </p>
            )}
          </Box>
        </FormControl>

        {/* <PersonalImage advertImagePath={user.advert?.imagePath} /> */}
        <Typography
          gutterBottom
          variant="fontTitle"
          sx={{ display: "flex", paddingTop: "32px" }}
        >
          {user.firstName} {user.lastName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "44px",
            paddingLeft: "16px",
          }}
        >
          <Box component={Link} to="profile" sx={linkStyles}>
            <FileText
              style={
                location.pathname === `/user/${user.id}/profile`
                  ? activeIconStyles
                  : IconStyles
              }
            />
            <Typography
              variant="fontLink"
              noWrap
              sx={
                location.pathname === `/user/${user.id}/profile`
                  ? activeTitleStyles
                  : titleStyles
              }
            >
              {intl.formatMessage({ id: "personalAccount.profile" })}
            </Typography>
          </Box>
          <Box component={Link} to="lessons" sx={linkStyles}>
            <Edit2
              style={
                location.pathname === `/user/${user.id}/lessons`
                  ? activeIconStyles
                  : IconStyles
              }
            />
            <Typography
              variant="fontLink"
              noWrap
              sx={
                location.pathname === `/user/${user.id}/lessons`
                  ? activeTitleStyles
                  : titleStyles
              }
            >
              {intl.formatMessage({ id: "personalAccount.lessons" })}
            </Typography>
          </Box>
          <Box component={Link} to="schedule" sx={linkStyles}>
            <Calendar
              style={
                location.pathname === `/user/${user.id}/schedule`
                  ? activeIconStyles
                  : IconStyles
              }
            />
            <Typography
              variant="fontLink"
              noWrap
              sx={
                location.pathname === `/user/${user.id}/schedule`
                  ? activeTitleStyles
                  : titleStyles
              }
            >
              {intl.formatMessage({ id: "personalAccount.schedule" })}
            </Typography>
          </Box>
          <Box component={Link} to="messages" sx={linkStyles}>
            <MessageSquare
              style={
                location.pathname === `/user/${user.id}/messages`
                  ? activeIconStyles
                  : IconStyles
              }
            />

            <Typography
              variant="fontLink"
              noWrap
              sx={
                location.pathname === `/user/${user.id}/messages`
                  ? activeTitleStyles
                  : titleStyles
              }
            >
              {intl.formatMessage({ id: "personalAccount.messages" })}
            </Typography>
          </Box>
          <Box component={Link} to="likes" sx={linkStyles}>
            <Heart
              style={
                location.pathname === `/user/${user.id}/likes`
                  ? activeIconStyles
                  : IconStyles
              }
            />
            <Typography
              variant="fontLink"
              noWrap
              sx={
                location.pathname === `/user/${user.id}/likes`
                  ? activeTitleStyles
                  : titleStyles
              }
            >
              {intl.formatMessage({ id: "personalAccount.likes" })}
            </Typography>
          </Box>
          <Box component={Link} to="advertisements" sx={linkStyles}>
            <Tablet
              style={
                location.pathname === `/user/${user.id}/advertisements`
                  ? activeIconStyles
                  : IconStyles
              }
            />
            <Typography
              variant="fontLink"
              noWrap
              sx={
                location.pathname === `/user/${user.id}/advertisements`
                  ? activeTitleStyles
                  : titleStyles
              }
            >
              {intl.formatMessage({ id: "personalAccount.advertisements" })}
            </Typography>
          </Box>
          <Box component={Link} to="feedback" sx={linkStyles}>
            <Smile
              style={
                location.pathname === `/user/${user.id}/feedback`
                  ? activeIconStyles
                  : IconStyles
              }
            />
            <Typography
              variant="fontLink"
              noWrap
              sx={
                location.pathname === `/user/${user.id}/feedback`
                  ? activeTitleStyles
                  : titleStyles
              }
            >
              {intl.formatMessage({ id: "personalAccount.feedback" })}
            </Typography>
          </Box>

          <Box component={Link} to="main" sx={linkStyles}>
            <Grid
              style={
                location.pathname === `/user/${user.id}/main`
                  ? activeIconStyles
                  : IconStyles
              }
            />
            <Typography
              variant="fontLink"
              noWrap
              sx={
                location.pathname === `/user/${user.id}/main`
                  ? activeTitleStyles
                  : titleStyles
              }
            >
              {intl.formatMessage({ id: "dashboard" })}
            </Typography>
          </Box>
          <Box component={Link} to="settings" sx={linkStyles}>
            <Settings
              style={
                location.pathname === `/user/${user.id}/settings`
                  ? activeIconStyles
                  : IconStyles
              }
            />
            <Typography
              variant="fontLink"
              noWrap
              sx={
                location.pathname === `/user/${user.id}/settings`
                  ? activeTitleStyles
                  : titleStyles
              }
            >
              {intl.formatMessage({ id: "personalAccount.settings" })}
            </Typography>
          </Box>
          <Box component={Link} sx={linkStyles} onClick={handleLogout}>
            <LogOut style={IconStyles} />
            <Typography variant="fontLink" noWrap sx={titleStyles}>
              {intl.formatMessage({ id: "personalAccount.logout" })}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Outlet />
    </Container>
  );
}
