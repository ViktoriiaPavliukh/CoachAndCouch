import { selectToken } from "@/redux/auth/selectors";
import { advertsSelector } from "@/redux/marketplace/adverts/advertsSelector";
import { deleteAdvertsById, getAdverts } from "@/redux/marketplace/adverts/operations";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { getUsersAsAdmin } from "@/redux/admin/operations";
import { usersAsAdminSelector } from "@/redux/admin/adminSelector";

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

function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  console.log(token);
  useEffect(() => {
    dispatch(getAdverts());
    dispatch(getUsersAsAdmin());
  }, [dispatch]);
  const adverts = useSelector(advertsSelector);
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
        width: "200",
        height: "auto",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: "divider", alignItems: "flex-start" }}
      >
        <Tab
          label="Adverts"
          {...a11yProps(0)}
          sx={{ alignItems: "flex-start", paddingLeft: "60px", paddingRight: "60px" }}
        />
        <Tab
          label="Users"
          {...a11yProps(1)}
          sx={{ alignItems: "flex-start", paddingLeft: "60px", paddingRight: "60px" }}
        />
        <Tab
          label="Settings"
          {...a11yProps(2)}
          sx={{ alignItems: "flex-start", paddingLeft: "60px", paddingRight: "60px" }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box>
          <h2>Adverts</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Advert ID
                  </TableCell>
                  {/* <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    User ID
                  </TableCell> */}
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    User name
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    User email
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Teaching <br />
                    language
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Spoken <br />
                    language
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Price
                  </TableCell>
                  {/* <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Hobbies
                  </TableCell> */}
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Description
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Photo
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Date create
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Delete
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adverts.map((advert) => (
                  <TableRow key={uuidv4()}>
                    <TableCell align="center" sx={{ width: "50px", border: "1px solid #e0e0e0" }}>
                      {advert.id}
                    </TableCell>
                    {/* <TableCell align="center" sx={{ width: "50px", border: "1px solid #e0e0e0" }}>
                      {advert.user.id}
                    </TableCell> */}
                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      {advert.user.firstName}&nbsp;{advert.user.lastName ? advert.user.lastName : ""}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      {advert.user.email}
                    </TableCell>

                    <TableCell align="left" sx={{ border: "1px solid #e0e0e0" }}>
                      {advert.teachingLanguages && (
                        <ul>
                          {advert.teachingLanguages.map(({ language }) => (
                            <li key={uuidv4()}>{language}</li>
                          ))}
                        </ul>
                      )}
                    </TableCell>
                    <TableCell align="left" sx={{ border: "1px solid #e0e0e0" }}>
                      {advert.spokenLanguages && (
                        <ul>
                          {advert.spokenLanguages.map(({ language }) => (
                            <li key={uuidv4()}>{language}</li>
                          ))}
                        </ul>
                      )}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      {advert.price}
                    </TableCell>
                    {/* <TableCell align="left" sx={{ border: "1px solid #e0e0e0" }}>
                      {advert.hobbies && (
                        <ul style={{ textAlign: "left" }}>
                          {advert.hobbies.map(({ hobby }) => (
                            <li key={uuidv4()}>{hobby}</li>
                          ))}
                        </ul>
                      )}
                    </TableCell> */}
                    <TableCell align="center" sx={{ width: "400px" }}>
                      {advert.description}
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
                      {advert.createdAt}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      <Button onClick={() => dispatch(deleteAdvertsById(advert.id))}>Delete</Button>
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      EDIT
                    </TableCell>
                  </TableRow>
                ))}
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
                    User ID
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    User name
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    User email
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
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    IsDeleted ?
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Advert
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Feedbacks
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Delete
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={uuidv4()}>
                    <TableCell align="center" sx={{ width: "50px", border: "1px solid #e0e0e0" }}>
                      {user.id}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      {user.firstName}&nbsp;{user.lastName ? user.lastName : ""}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      {user.email}
                    </TableCell>
                    <TableCell align="left" sx={{ border: "1px solid #e0e0e0" }}>
                      {user.registeredAt}
                    </TableCell>
                    <TableCell align="left" sx={{ border: "1px solid #e0e0e0" }}>
                      {user.lastVisit}
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
                    <TableCell align="center" sx={{ width: "400px" }}>
                      {`${user.isDeleted}`}
                    </TableCell>

                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      {user.advert ? "yes" : "no"}
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
                      <Button onClick={() => dispatch(deleteAdvertsById(user.id))}>Delete</Button>
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                      EDIT
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
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
