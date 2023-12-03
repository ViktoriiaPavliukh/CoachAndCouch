import PropTypes from "prop-types";
import { format, parseISO, parseJSON } from "date-fns";
import { selectToken } from "@/redux/auth/selectors";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import {
  Box,
  Button,
  // Container,
  // FormControl,
  // InputLabel,
  // MenuItem,
  Paper,
  Stack,
  SvgIcon,
  // Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  // addLanguagesAsAdmin,
  deleteAdvertsAsAdmin,
  // deleteLanguageAsAdmin,
  deleteUserAsAdmin,
  getAdvertsAsAdmin,
  getCountries,
  // getCountriesAsAdmin,
  getLanguages,
  getSpecializations,
  getUsersAsAdmin,
} from "@/redux/admin/operations";
import {
  advertsAsAdminSelector,
  countriesSelector,
  languagesSelector,
  specializationsSelector,
  usersAsAdminSelector,
} from "@/redux/admin/adminSelector";
import { AddLanguageForm } from "../../components/admin/AddLanguageForm";
import { AddSpecializationForm } from "../../components/admin/AddSpecializationForm";
import Loader from "@/components/Loader/Loader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
// const initialValues = {
//   languageUa: "",
//   languageEn: "",

//   languagesBD: "",
// };
// const validationSchema = Yup.object({
//   languageUa: Yup.string().required("This field id required"),
//   languageEn: Yup.string().required("This field id required"),
// });

function VerticalTabs() {
  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: async (values) => {
  //     dispatch(addLanguagesAsAdmin({ languageUa: values.languageUa, languageEn: values.languageEn }));
  //     dispatch(getLanguages());
  //   },
  // });
  const [value, setValue] = React.useState(0);
  const [deleteState, setDeleteState] = React.useState("delete");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const adverts = useSelector(advertsAsAdminSelector);
  const countries = useSelector(countriesSelector);
  const languages = useSelector(languagesSelector);
  const specializations = useSelector(specializationsSelector);
  console.log(languages);
  console.log(countries);
  console.log(token);

  useEffect(() => {
    dispatch(getAdvertsAsAdmin());
    dispatch(getUsersAsAdmin());
    dispatch(getCountries());
    dispatch(getLanguages());
    dispatch(getSpecializations());
  }, [dispatch]);

  console.log(adverts);
  const users = useSelector(usersAsAdminSelector);
  console.log(users);
  return (
    <Box
      sx={{
        // flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "flex-start",
        height: "auto",
        border: "1px solid red",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: "divider", alignItems: "flex-start", minWidth: "105px", width: "105px" }}
      >
        <Tab
          label="Adverts"
          {...a11yProps(0)}
          sx={{ alignItems: "flex-start", paddingLeft: "0px", paddingRight: "20px" }}
        />
        <Tab
          label="Users"
          {...a11yProps(1)}
          sx={{ alignItems: "flex-start", paddingLeft: "0px", paddingRight: "20px" }}
        />
        <Tab
          label="Settings"
          {...a11yProps(2)}
          sx={{ alignItems: "flex-start", paddingLeft: "0px", paddingRight: "20px" }}
        />
      </Tabs>
      <TabPanel value={value} index={0} style={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <h2>Adverts</h2>
          <TableContainer component={Paper}>
            <Table
              sx={{
                "& .MuiTableRow-root.MuiTableRow-root:hover .MuiTableCell-root": {
                  backgroundColor: "#546658",
                  color: "white",
                  "&.MuiTableCell-root:hover ::-webkit-scrollbar-thumb": {
                    backgroundColor: "white",
                  },
                },
              }}
              style={{
                "& td": { fontSize: "16px" },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ border: "1px solid #e0e0e0", padding: "6px 0", fontSize: "18px", fontWeight: "500" }}
                  >
                    ID
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ border: "1px solid #e0e0e0", padding: "6px 0", fontSize: "18px", fontWeight: "500" }}
                  >
                    Advert
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ border: "1px solid #e0e0e0", padding: "6px 10px", fontSize: "18px", fontWeight: "500" }}
                  >
                    Price
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #e0e0e0",
                      width: "200px",
                      padding: "6px 0",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ border: "1px solid #e0e0e0", padding: "6px 6px", fontSize: "18px", fontWeight: "500" }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "200px",
                      padding: 0,
                      border: "1px solid #e0e0e0",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    <TableRow>
                      <TableCell align="center" style={{ width: "260px", fontSize: "18px", fontWeight: "500" }}>
                        Languages
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: 0, borderBottom: "none", fontSize: "18px", fontWeight: "500" }}>
                        <TableRow>
                          <TableCell
                            align="center"
                            sx={{
                              border: "none",
                              borderRight: "1px solid #e0e0e0",
                              width: "110px",
                              padding: "6px",
                              fontSize: "18px",
                              fontWeight: "500",
                            }}
                          >
                            Teaching
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ border: "none", width: "110px", padding: "6px", fontSize: "18px", fontWeight: "500" }}
                          >
                            Spoken
                          </TableCell>
                        </TableRow>
                      </TableCell>
                    </TableRow>
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ border: "1px solid #e0e0e0", padding: "6px 0", fontSize: "18px", fontWeight: "500" }}
                  >
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adverts ? (
                  adverts.map((advert) => (
                    <TableRow
                      key={uuidv4()}
                      style={{
                        backgroundColor: advert.isDeleted ? "rgba(175, 186, 202, 0.3)" : "none",
                      }}
                    >
                      <TableCell align="center" sx={{ width: "50px", border: "1px solid #e0e0e0", padding: "10px" }}>
                        {advert.id}
                      </TableCell>

                      <TableCell align="left" sx={{ border: "1px solid #e0e0e0", width: "250px", padding: "10px" }}>
                        <Typography sx={{ fontWeight: "600" }}>
                          {advert.user.firstName}&nbsp;{advert.user.lastName ? advert.user.lastName : ""}
                        </Typography>
                        <Typography sx={{ marginBottom: "20px" }}>{advert.user.email}</Typography>

                        <p>
                          Create at:
                          <br />
                          <Typography sx={{ fontWeight: "600" }}>
                            {format(new Date(advert.createdAt), "dd.MM.yyyy HH:mm")}
                          </Typography>
                        </p>
                      </TableCell>

                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0", padding: "10px" }}>
                        {advert.price}
                        {"$"}
                      </TableCell>

                      <TableCell align="left" sx={{ padding: "10px", paddingRight: 0 }}>
                        <Box
                          sx={{
                            maxHeight: "100px",
                            width: "200px",
                            wordBreak: "break-all",
                            maxWidth: "200px",
                            overflowY: "auto",
                            overflowX: "hidden",
                            paddingRight: "5px",
                            scrollbarWidth: "thin",
                            "&::-webkit-scrollbar": {
                              width: "0.4em",
                            },
                            "&::-webkit-scrollbar-track": {
                              background: "transparent",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "#888",
                              borderRadius: "5px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                              background: "#555",
                            },
                            "&.MuiTableCell-root:hover::-webkit-scrollbar-thumb ": {
                              background: "white",
                            },
                          }}
                        >
                          {advert.description}
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0", padding: "10px" }}>
                        <img
                          src={advert.imagePath}
                          width="100"
                          height="100"
                          style={{
                            objectFit: "cover",
                            maxHeight: "100px",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: 0, maxWidth: "220px" }}>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            padding: 0,
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              padding: "6px 6px",
                              borderRight: " 1px solid #e0e0e0",
                              width: "110px",
                              alignItems: "center",
                              overflowY: "auto",
                              height: "151px",
                            }}
                          >
                            {advert.teachingLanguages.map((language) => language.languageUa).join(", ")}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              padding: "6px 6px",
                              width: "110px",
                              overflowY: "auto",
                              height: "151px",
                            }}
                          >
                            {advert.spokenLanguages.map((language) => language.languageUa).join(", ")}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #e0e0e0",
                          padding: "10px",
                        }}
                      >
                        <Button
                          sx={{
                            mb: "15px",
                            border: "1px solid",
                            borderColor: (theme) => theme.palette.buttonColor.fontColor,

                            color: (theme) => theme.palette.buttonColor.fontColor,
                            fontSize: "14px",
                            fontWeight: "700",
                            transition: "background-color 0.3s",
                            backgroundColor: (theme) => theme.palette.buttonColor.main,
                            "&:hover": {
                              backgroundColor: (theme) => theme.palette.buttonColor.darkHover,
                              // borderColor: (theme) => theme.palette.buttonColor.fontColor,
                            },

                            width: "95px",
                            "& svg": {
                              fill: "white",
                            },
                          }}
                          style={{}}
                          onClick={() => {
                            setDeleteState(deleteState === "delete" ? "undo" : "delete");
                            dispatch(deleteAdvertsAsAdmin(advert.id));
                          }}
                        >
                          <SvgIcon
                            component={DeleteForeverSharpIcon}
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "5px",
                            }}
                          />
                          {advert.isDeleted ? deleteState : "delete"}
                        </Button>
                        <Button
                          sx={{
                            color: (theme) => theme.palette.buttonColor.main,
                            fontSize: "14px",
                            fontWeight: "700",
                            transition: "background-color 0.3s",
                            "&:hover": {
                              backgroundColor: (theme) => theme.palette.buttonColor.darkHover,
                              borderColor: (theme) => theme.palette.buttonColor.fontColor,
                              color: (theme) => theme.palette.buttonColor.fontColor,
                              "& svg": {
                                fill: "white",
                              },
                            },
                            "& svg": {
                              fill: (theme) => theme.palette.buttonColor.main,
                            },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "95px",
                            border: "1px solid",
                            borderColor: (theme) => theme.palette.buttonColor.main,
                            backgroundColor: "white",
                          }}
                        >
                          <SvgIcon
                            component={EditNoteIcon}
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "5px",
                            }}
                          />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <Loader />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box>
          <h2>Users</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    ID
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    User
                  </TableCell>

                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Registered At
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Last visit
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Photo
                  </TableCell>
                  {/* <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    IsDeleted ?
                  </TableCell> */}
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Advert
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Feedbacks
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={uuidv4()}
                    style={{
                      backgroundColor: user.isDeleted ? "rgba(175, 186, 202, 0.3)" : "transparent",
                    }}
                  >
                    <TableCell align="center" sx={{ width: "50px", border: "1px solid #e0e0e0" }}>
                      {user.id}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      {user.firstName}&nbsp;{user.lastName ? user.lastName : ""}
                      <br />
                      {user.email}
                    </TableCell>

                    <TableCell align="left" sx={{ border: "1px solid #e0e0e0" }}>
                      {parseJSON(user.registeredAt).toLocaleString("en-GB", { timeZone: "UTC" })}
                    </TableCell>
                    <TableCell align="left" sx={{ border: "1px solid #e0e0e0" }}>
                      {parseJSON(user.lastVisit).toLocaleString("en-GB", { timeZone: "UTC" })}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      <img
                        src={user.photoPath}
                        width="100"
                        height="80"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    {/* <TableCell align="center" sx={{ width: "400px" }}>
                      {`${user.isDeleted}`}
                    </TableCell> */}

                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      {user.advert ? <button>Advert</button> : "no"}
                    </TableCell>

                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      {user.feedbacks
                        ? user.feedbacks && (
                            <ul>
                              {user.feedbacks.map(({ feedback }) => (
                                <li key={uuidv4()}>{feedback}</li>
                              ))}
                            </ul>
                          )
                        : null}
                    </TableCell>

                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      <button
                        style={{ width: "24px", height: "24px" }}
                        disabled={user.role === "admin" ? true : false}
                        onClick={() => {
                          dispatch(deleteUserAsAdmin(user.id));
                        }}
                      >
                        D
                      </button>
                      <button
                        style={{ width: "24px", height: "24px", border: "none" }}
                        disabled={user.role === "admin" ? true : false}
                      >
                        E
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <h2>Додати Мову</h2>
        <FormControl variant="outlined" sx={{ width: "300px" }}>
          <InputLabel>Мови в базі даних:</InputLabel>
          <Select
            id="languagesBD"
            name="languagesBD"
            label="Languages"
            // value={formik.values.languagesBD || ""}
            // onChange={(event) => {
            //   formik.setFieldValue("languagesBD", event.target.value);
            // }}
            onBlur={formik.handleBlur}
            error={formik.touched.languagesBD && Boolean(formik.errors.languagesBD)}
            // renderValue={(selected) =>
            //   selected.map((language) => {
            //     language;
            //   })
            // }
          >
            {languages &&
              languages?.map((language) => (
                <MenuItem key={language.id} value={language}>
                  {language.id + " " + language.languageUa + " " + language.languageEn}
                  <button
                    onClick={() => {
                      dispatch(deleteLanguageAsAdmin(language.id));
                      dispatch(getLanguages());
                    }}
                  >
                    D
                  </button>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <form onSubmit={formik.handleSubmit} id="addLanguageForm">
          <label>
            Українською:
            <TextField
              id="addLanguageUa"
              name="languageUa"
              value={formik.values.languageUa}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.languageUa && Boolean(formik.errors.languageUa)}
              helperText={formik.touched.languageUa && formik.errors.languageUa}
            />
          </label>
          <br />
          <label>
            Англійською:
            <TextField
              id="addLanguageEn"
              name="languageEn"
              value={formik.values.languageEn}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.languageEn && Boolean(formik.errors.languageEn)}
              helperText={formik.touched.languageEn && formik.errors.languageEn}
            />
          </label>
          <button type="submit">Add</button>
        </form> */}
        <Stack style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "50px" }}>
          <AddLanguageForm languages={languages} />
          <AddSpecializationForm specializations={specializations} />
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Box>
  );
}

export const AdminPanelPage = () => {
  // const dispatch = useDispatch();
  // const token = useSelector(selectToken);
  // console.log(token);
  // useEffect(() => {
  //   dispatch(getAdverts());
  // }, [dispatch]);
  // const adverts = useSelector(advertsSelector);
  // console.log(adverts);
  // let count = 0;

  return (
    <Box
      component="div"
      sx={{
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Link
        className="custom-link"
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          marginTop: "20px",
          "&:hover": {
            color: (theme) => theme.palette.textColor.menuHover,
          },
        }}
      >
        <span style={{ marginBottom: "20px" }}>
          <SvgIcon component={KeyboardBackspaceSharpIcon} height="18px" style={{ verticalAlign: "middle" }} />
          Back to the Home page
        </span>
      </Link>
      <VerticalTabs />
    </Box>
  );
};
