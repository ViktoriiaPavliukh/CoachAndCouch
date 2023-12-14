import "react-calendar/dist/Calendar.css";

import {
  Container,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
// import { PersonalImage } from "./PersonalImage";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { useState } from "react";

import { Sidebar } from "./Sidebar";

export function PersonalAccount() {
  const [image, setImage] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();

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
        <Sidebar />
      </Box>

      <Outlet />
    </Container>
  );
}
