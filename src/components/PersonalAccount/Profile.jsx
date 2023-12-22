import { selectUser } from "@/redux/auth/selectors";
import { getUserById } from "@/redux/users/operations";
import { selectUserById } from "@/redux/users/selectors";
import { useIntl } from "react-intl";
import { Box, Button, TextField, Select, MenuItem, Stack, FormControl, InputLabel } from "@mui/material";
// import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PersonalImage } from "./PersonalImage";

export const Profile = () => {
  const handleUserProfileSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const userProfile = {
      firstName: e.target.firstName.value,
      country: e.target.country.value,
      lastName: e.target.lastName.value,
      sex: e.target.sex.value,
      aboutMe: e.target.aboutMe.value,
    };
  };
  const user = useSelector(selectUserById);
  const userId = useSelector(selectUser).id;
  const intl = useIntl();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(getUserById(userId));
  }, [dispatch, userId]);
  return (
    <form onSubmit={handleUserProfileSubmit}>
      <Stack sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: "24px",
            justifyContent: { xs: "center" },
            alignItems: { xs: "center" },
          }}
        >
          <PersonalImage advertImagePath={user.advert?.imagePath} />
          <Stack
            fullWidth
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px 20px",
              flexWrap: "wrap",
            }}
          >
            <TextField
              label={intl.formatMessage({ id: "name" })}
              name="updateUser.firstName"
              defaultValue={user?.firstName}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
            />
            <TextField
              label={intl.formatMessage({ id: "lastName" })}
              name="updateUser.lastName"
              defaultValue={user?.lastName || ""}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
            />
            <TextField
              label="Email"
              name="email"
              defaultValue={user?.email}
              sx={{ width: { xs: "100%", lg: "48%" } }}
              variant="outlined"
              disabled
            />
            <TextField
              label={intl.formatMessage({ id: "birthday" })}
              name="birthday"
              defaultValue={user.birthday ? format(new Date(user.birthday), "dd.MM.yyyy") : ""}
              sx={{ width: { xs: "100%", lg: "48%" } }}
              variant="outlined"
            />
            <FormControl variant="outlined" sx={{ width: { xs: "100%", lg: "48%" } }}>
              <InputLabel htmlFor="sex-label">{intl.formatMessage({ id: "sex" })}</InputLabel>
              <Select
                label={intl.formatMessage({ id: "sex" })}
                name="sex"
                value={user.sex}
                onChange={(e) => console.log(e.target.value)}
              >
                <MenuItem value="male">{intl.formatMessage({ id: "male" })}</MenuItem>
                <MenuItem value="female"> {intl.formatMessage({ id: "female" })}</MenuItem>
                <MenuItem value="other"> {intl.formatMessage({ id: "other" })}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="country"
              name="updateUser.country"
              label={intl.formatMessage({ id: "country" })}
              defaultValue={user?.country?.alpha2}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
            />
            <TextField
              label={intl.formatMessage({ id: "registrationDate" })}
              name="registeredAt"
              defaultValue={user.registeredAt ? format(new Date(user.registeredAt), "dd.MM.yyyy HH:mm") : ""}
              variant="outlined"
              sx={{ width: "100%" }}
              disabled
            />
          </Stack>
        </Box>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
            gap: "40px",
          }}
        >
          <TextField
            fullWidth
            defaultValue={user?.description}
            name="description"
            label={intl.formatMessage({ id: "description" })}
            id="description"
            placeholder={intl.formatMessage({ id: "description" })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              display: "flex",
              justifyItems: "end",
              alignSelf: "end",
              width: { xs: "100%", md: "220px" },
            }}
          >
            {intl.formatMessage({ id: "editBtn" })}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

{
  /* <FormControl
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
        <Typography
          gutterBottom
          variant="fontTitle"
          sx={{ display: "flex", paddingTop: "32px" }}
        >
          {user.firstName} {user.lastName}
        </Typography> */
}
