import PropTypes from "prop-types";
import { format, parseISO, parseJSON } from "date-fns";
import { selectToken } from "@/redux/auth/selectors";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  addLanguagesAsAdmin,
  deleteAdvertsAsAdmin,
  deleteUserAsAdmin,
  getAdvertsAsAdmin,
  getCountriesAsAdmin,
  getUsersAsAdmin,
} from "@/redux/admin/operations";
import { advertsAsAdminSelector, countiesAsAdmin, usersAsAdminSelector } from "@/redux/admin/adminSelector";
import { languagesSelector } from "@/redux/marketplace/adverts/advertsSelector";
import { getLanguages } from "@/redux/marketplace/adverts/operations";

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
const initialValues = {
  languageUa: "",
  languageEn: "",

  languagesBD: "",
};
const validationSchema = Yup.object({
  languageUa: Yup.string().required("This field id required"),
  languageEn: Yup.string().required("This field id required"),
});

function VerticalTabs() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(addLanguagesAsAdmin({ languageUa: values.languageUa, languageEn: values.languageEn }));
      dispatch(getLanguages());
    },
  });
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const adverts = useSelector(advertsAsAdminSelector);
  const countries = useSelector(countiesAsAdmin);
  const languages = useSelector(languagesSelector);
  console.log(languages);
  console.log(countries);
  console.log(token);

  useEffect(() => {
    dispatch(getAdvertsAsAdmin());
    dispatch(getUsersAsAdmin());
    dispatch(getCountriesAsAdmin());
    dispatch(getLanguages());
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
        sx={{ borderRight: 1, borderColor: "divider", alignItems: "flex-start", minWidth: "150px", width: "150px" }}
      >
        <Tab
          label="Adverts"
          {...a11yProps(0)}
          sx={{ alignItems: "flex-start", paddingLeft: "30px", paddingRight: "40px" }}
        />
        <Tab
          label="Users"
          {...a11yProps(1)}
          sx={{ alignItems: "flex-start", paddingLeft: "30px", paddingRight: "40px" }}
        />
        <Tab
          label="Settings"
          {...a11yProps(2)}
          sx={{ alignItems: "flex-start", paddingLeft: "30px", paddingRight: "40px" }}
        />
      </Tabs>
      <TabPanel value={value} index={0} style={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <h2>Adverts</h2>
          <TableContainer component={Paper}>
            <Table
              style={{
                "& td": { fontSize: "16px" },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    ID
                  </TableCell>

                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Advert
                  </TableCell>

                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Price
                  </TableCell>

                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0", width: "200px" }}>
                    Description
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Photo
                  </TableCell>

                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
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
                        backgroundColor: advert.isDeleted ? "rgba(175, 186, 202, 0.3)" : "transparent",
                      }}
                    >
                      <TableCell align="center" sx={{ width: "50px", border: "1px solid #e0e0e0" }}>
                        {advert.id}
                      </TableCell>

                      <TableCell align="left" sx={{ border: "1px solid #e0e0e0", width: "250px" }}>
                        name:&nbsp;&nbsp;
                        {advert.user.firstName}&nbsp;{advert.user.lastName ? advert.user.lastName : ""}
                        <br />
                        <br />
                        email:&nbsp;&nbsp;
                        {advert.user.email}
                        <br />
                        <br />
                        Create at:&nbsp;&nbsp;{format(parseISO(advert.createdAt), "dd-mm-yyyy HH:mm")}
                        <br />
                        {advert.teachingLanguages.map((language) => language.languageUa).join(", ")}
                        <br />
                        {advert.spokenLanguages.map((language) => language.languageUa).join(", ")}
                        {advert.price}
                      </TableCell>

                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}></TableCell>

                      <TableCell align="left" sx={{ padding: "10px" }}>
                        <div
                          style={{
                            maxHeight: "100px",
                            width: "200px",
                            maxWidth: "200px",
                            overflowY: "auto",
                            overflowX: "hidden",
                          }}
                        >
                          {advert.description}
                        </div>
                      </TableCell>
                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                        <img
                          src={advert.imagePath}
                          width="100"
                          height="80"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </TableCell>

                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                        <button
                          onClick={() => {
                            dispatch(deleteAdvertsAsAdmin(advert.id));
                          }}
                        >
                          D
                        </button>
                        <button>E</button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div>Loading</div>
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
                      backgroundColor: users.isDeleted ? "rgba(175, 186, 202, 0.3)" : "transparent",
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
                        onClick={() => {
                          dispatch(deleteUserAsAdmin(user.id));
                        }}
                      >
                        D
                      </button>
                      <button>E</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>Додати Мову</h2>
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
                <MenuItem key={uuidv4()} value={language}>
                  {language.id + " " + language.languageUa + " " + language.languageEn}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <form onSubmit={formik.handleSubmit}>
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
        </form>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Box>
  );
}

export const AdminPanel = () => {
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
    <Container
      component="div"
      maxWidth="100vw"
      sx={{
        backgroundColor: "background.paper",
        // display: "flex",
        justifyContent: "center",
        px: { xs: "16px" },
      }}
    >
      <Link to="/">Back to home page</Link>

      <VerticalTabs />
    </Container>
  );
};
