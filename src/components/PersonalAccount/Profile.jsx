import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/redux/users/operations";
import { selectCurrentUser } from "@/redux/users/selectors";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import { useIntl } from "react-intl";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";
import { format } from "date-fns";
import { PersonalImage } from "./PersonalImage";
import countries from "../../defaults/countries/countries.json";
import countriesCase from "@/helpers/countriesCase";

export const Profile = () => {
  const handleUserProfileSubmit = (e) => {
    e.preventDefault();
    const userProfile = {
      firstName: e.target.firstName.value,
      country: e.target.country.value,
      lastName: e.target.lastName.value,
      sex: e.target.sex.value,
      aboutMe: e.target.aboutMe.value,
    };
  };
  const currentUser = useSelector(selectCurrentUser);
  const intl = useIntl();
  const en = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <form onSubmit={handleUserProfileSubmit}>
      <Stack sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: "24px",
            justifyContent: { xs: "center" },
            alignItems: { xs: "center", lg: "flex-start" },
          }}
        >
          <PersonalImage advertImagePath={currentUser.advert?.imagePath} />
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
              defaultValue={currentUser?.firstName}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
              disabled
            />
            <TextField
              label={intl.formatMessage({ id: "lastName" })}
              name="updateUser.lastName"
              defaultValue={currentUser?.lastName || ""}
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
              disabled
            />
            <TextField
              label="Email"
              name="email"
              defaultValue={currentUser?.email}
              sx={{ width: { xs: "100%", lg: "48%" } }}
              variant="outlined"
              disabled
            />
            <TextField
              label={intl.formatMessage({ id: "birthday" })}
              name="birthday"
              disabled
              defaultValue={
                currentUser.birthday
                  ? format(new Date(currentUser.birthday), "dd.MM.yyyy")
                  : ""
              }
              sx={{ width: { xs: "100%", lg: "48%" } }}
              variant="outlined"
            />
            <FormControl
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
            >
              <InputLabel htmlFor="sex-label">
                {intl.formatMessage({ id: "sex" })}
              </InputLabel>
              <Select
                label={intl.formatMessage({ id: "sex" })}
                disabled
                name="sex"
                value={currentUser.sex}
                onChange={(e) => console.log(e.target.value)}
              >
                <MenuItem value="male">
                  {intl.formatMessage({ id: "male" })}
                </MenuItem>
                <MenuItem value="female">
                  {" "}
                  {intl.formatMessage({ id: "female" })}
                </MenuItem>
                <MenuItem value="other">
                  {" "}
                  {intl.formatMessage({ id: "other" })}
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="country"
              name="updateUser.country"
              label={intl.formatMessage({ id: "country" })}
              disabled
              defaultValue={
                currentUser?.country?.alpha2
                  ? countriesCase(
                      en === "en"
                        ? countries.find(
                            (el) => el.alpha2 === currentUser?.country?.alpha2
                          )?.nameEng || ""
                        : countries.find(
                            (el) => el.alpha2 === currentUser?.country?.alpha2
                          )?.nameShort || ""
                    )
                  : ""
              }
              variant="outlined"
              sx={{ width: { xs: "100%", lg: "48%" } }}
            />
            <TextField
              label={intl.formatMessage({ id: "registrationDate" })}
              name="registeredAt"
              defaultValue={
                currentUser.registeredAt
                  ? format(
                      new Date(currentUser.registeredAt),
                      "dd.MM.yyyy HH:mm"
                    )
                  : ""
              }
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
            defaultValue={currentUser?.advert?.description}
            name="description"
            label={intl.formatMessage({ id: "description" })}
            id="description"
            placeholder={intl.formatMessage({ id: "description" })}
            sx={{ width: { xs: "100%" } }}
            multiline
            disabled
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
