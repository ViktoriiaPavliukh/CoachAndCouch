import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseJSON } from "date-fns";
import { useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  Paper,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { selectCurrentLanguage } from "@/redux/marketplace/languages/languageSlice";
import {
  deleteAdvertsAsAdmin,
  deleteUserAsAdmin,
  getAdvertsAsAdmin,
  getCountries,
  getLanguages,
  getSpecializations,
  getUsersAsAdmin,
  getFeedbacksAsAdmin,
} from "@/redux/admin/operations";
import {
  advertsAsAdminSelector,
  countriesSelector,
  languagesSelector,
  specializationsSelector,
  usersAsAdminSelector,
  feedbacksAsAdminSelector,
} from "@/redux/admin/adminSelector";
import { AddLanguageForm } from "../../components/admin/AddLanguageForm";
import { AddSpecializationForm } from "../../components/admin/AddSpecializationForm";
import Loader from "@/components/Loader/Loader";
import { TabPanel } from "./TabPanel";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export function VerticalTabs() {
  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: async (values) => {
  //     dispatch(addLanguagesAsAdmin({ languageUa: values.languageUa, languageEn: values.languageEn }));
  //     dispatch(getLanguages());
  //   },
  // });
  const en = useSelector(selectCurrentLanguage);
  const intl = useIntl();
  const [value, setValue] = React.useState(0);
  const [deleteState, setDeleteState] = React.useState("delete");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const adverts = useSelector(advertsAsAdminSelector);
  const languages = useSelector(languagesSelector);
  const specializations = useSelector(specializationsSelector);
  const feedbacks = useSelector(feedbacksAsAdminSelector);
  const formatDate = (dateString) => {
    const date = parseJSON(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    dispatch(getAdvertsAsAdmin());
    dispatch(getUsersAsAdmin());
    dispatch(getCountries());
    dispatch(getLanguages());
    dispatch(getSpecializations());
    dispatch(getFeedbacksAsAdmin());
  }, [dispatch]);

  const users = useSelector(usersAsAdminSelector);
  const teacherUserIds = adverts.map((advert) => advert.user.id);

  const getFeedbacksForTeacher = (teacherId) => {
    return feedbacks.filter((feedback) => feedback.toUser.id === teacherId);
  };
  return (
    <Box
      sx={{
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
        sx={{
          borderRight: 1,
          borderColor: "divider",
          alignItems: "flex-start",
          minWidth: "105px",
          width: "105px",
        }}
      >
        <Tab
          label={intl.formatMessage({ id: "advert" })}
          {...a11yProps(0)}
          sx={{
            alignItems: "flex-start",
            paddingLeft: "0px",
            paddingRight: "20px",
          }}
        />
        <Tab
          label={intl.formatMessage({ id: "usersAdmin" })}
          {...a11yProps(1)}
          sx={{
            alignItems: "flex-start",
            paddingLeft: "0px",
            paddingRight: "20px",
          }}
        />
        <Tab
          label={intl.formatMessage({ id: "personalAccount.settings" })}
          {...a11yProps(2)}
          sx={{
            alignItems: "flex-start",
            paddingLeft: "0px",
            paddingRight: "20px",
          }}
        />
      </Tabs>
      <TabPanel
        value={value}
        index={0}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Box>
          <Typography sx={{ fontSize: { lg: "48px" } }}>
            {intl.formatMessage({ id: "advert" })}
          </Typography>
          <TableContainer sx={{ mt: "36px" }}>
            <Table
            // sx={{
            //   "& .MuiTableRow-root.MuiTableRow-root:hover .MuiTableCell-root":
            //     {
            //       backgroundColor: "#546658",
            //       color: "white",
            //       "&.MuiTableCell-root:hover ::-webkit-scrollbar-thumb": {
            //         backgroundColor: "white",
            //       },
            //     },
            // }}
            // style={{
            //   "& td": { fontSize: "16px" },
            // }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    {intl.formatMessage({ id: "avatar" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    {intl.formatMessage({ id: "advert" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    {intl.formatMessage({ id: "price" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    {intl.formatMessage({ id: "description" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                      p: 0,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        color: (theme) => theme.palette.textColor.listColor,
                        border: "none",
                        fontSize: "16px",
                      }}
                    >
                      {intl.formatMessage({ id: "languageTeach" })}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: (theme) => theme.palette.textColor.listColor,
                        border: "none",
                        fontSize: "16px",
                      }}
                    >
                      {intl.formatMessage({ id: "languageNative" })}
                    </TableCell>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adverts ? (
                  adverts.map((advert) => (
                    <TableRow
                      key={uuidv4()}
                      sx={{
                        backgroundColor: advert.isDeleted
                          ? "rgba(175, 186, 202, 0.3)"
                          : "transparent",
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          width: "50px",
                          borderBottom: "1px solid",
                          color: (theme) => theme.palette.textColor.listColor,
                          borderX: "none",
                          fontSize: "18px",
                          fontWeight: "500",
                        }}
                      >
                        {advert.id}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "1px solid",
                          color: (theme) => theme.palette.textColor.listColor,
                          borderX: "none",
                        }}
                      >
                        <img
                          src={advert.imagePath}
                          style={{
                            borderRadius: "100px",
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          borderBottom: "1px solid",
                          color: (theme) => theme.palette.textColor.listColor,
                          borderX: "none",
                          fontSize: "16px",
                        }}
                      >
                        <Typography>
                          {advert.user.firstName}&nbsp;
                          {advert.user.lastName ? advert.user.lastName : ""}
                        </Typography>
                        <Typography sx={{ marginBottom: "20px" }}>
                          {advert.user.email}
                        </Typography>
                        <Typography>
                          {intl.formatMessage({ id: "registrationDate" })}:
                          <Typography>
                            {format(
                              new Date(advert.createdAt),
                              "dd.MM.yyyy HH:mm"
                            )}
                          </Typography>
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "1px solid",
                          color: (theme) => theme.palette.textColor.listColor,
                          borderX: "none",
                          fontSize: "16px",
                        }}
                      >
                        {advert.price}
                        {"$"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          borderBottom: "1px solid",
                          color: (theme) => theme.palette.textColor.listColor,
                          borderX: "none",
                          fontSize: "16px",
                        }}
                      >
                        {advert.description}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: 0,
                          borderBottom: "1px solid",
                          color: (theme) => theme.palette.textColor.listColor,
                          borderX: "none",
                          fontSize: "16px",
                        }}
                      >
                        <TableCell
                          style={{
                            display: "flex",
                            width: "100%",
                            padding: 0,
                            justifyContent: "center",
                            border: "none",
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{
                              color: (theme) =>
                                theme.palette.textColor.listColor,
                              border: "none",
                              fontSize: "16px",
                            }}
                          >
                            {advert.teachingLanguages
                              .map((language) =>
                                en === "en"
                                  ? language.languageEn
                                  : language.languageUa
                              )
                              .join(", ")}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              color: (theme) =>
                                theme.palette.textColor.listColor,
                              border: "none",
                              fontSize: "16px",
                            }}
                          >
                            {advert.spokenLanguages
                              .map((language) =>
                                en === "en"
                                  ? language.languageEn
                                  : language.languageUa
                              )
                              .join(", ")}
                          </TableCell>
                        </TableCell>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: "1px solid",
                          color: (theme) => theme.palette.textColor.listColor,
                          borderX: "none",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <EditNoteIcon
                            sx={{
                              width: "24px",
                              height: "24px",
                              color: (theme) => theme.palette.textColor.grey,
                              border: "none",
                            }}
                            disabled={
                              advert.user.role !== "admin" ? true : false
                            }
                          />
                          <DeleteOutlineIcon
                            sx={{
                              width: "24px",
                              height: "24px",
                              color: (theme) => theme.palette.textColor.grey,
                            }}
                            onClick={() => {
                              setDeleteState(
                                deleteState === "delete" ? "undo" : "delete"
                              );
                              dispatch(deleteAdvertsAsAdmin(advert.id));
                            }}
                          />
                        </Box>
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
          <Typography sx={{ fontSize: { lg: "48px" } }}>
            {intl.formatMessage({ id: "usersAdmin" })}
          </Typography>
          <TableContainer sx={{ mt: "36px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    {intl.formatMessage({ id: "avatar" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    E-mail
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    {intl.formatMessage({ id: "username" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    {intl.formatMessage({ id: "advert" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    {intl.formatMessage({ id: "registeredAt" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                      fontSize: "16px",
                    }}
                  >
                    {intl.formatMessage({ id: "lastVisit" })}
                  </TableCell>
                  {/* <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                    IsDeleted ?
                  </TableCell> */}
                  {/* <TableCell
                    align="center"
                    sx={{ border: "1px solid #e0e0e0" }}
                  >
                    Feedbacks
                  </TableCell> */}
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid",
                      color: (theme) => theme.palette.textColor.listColor,
                      borderX: "none",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={uuidv4()}
                    sx={{
                      backgroundColor: user.isDeleted
                        ? "rgba(175, 186, 202, 0.3)"
                        : "transparent",
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        width: "50px",
                        borderBottom: "1px solid",
                        color: (theme) => theme.palette.textColor.listColor,
                        borderX: "none",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      {user.id}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "1px solid",
                        color: (theme) => theme.palette.textColor.listColor,
                        borderX: "none",
                      }}
                    >
                      <img
                        src={user.photoPath}
                        style={{
                          borderRadius: "100px",
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "1px solid",
                        color: (theme) => theme.palette.textColor.listColor,
                        borderX: "none",
                        fontSize: "16px",
                      }}
                    >
                      {user.email}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "1px solid",
                        color: (theme) => theme.palette.textColor.listColor,
                        borderX: "none",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      {user.firstName}&nbsp;{user.lastName ? user.lastName : ""}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "1px solid",
                        color: (theme) => theme.palette.textColor.listColor,
                        borderX: "none",
                      }}
                    >
                      {user.advert ? (
                        <CheckCircleIcon
                          sx={{
                            color: (theme) => theme.palette.buttonColor.main,
                          }}
                        />
                      ) : (
                        <CancelIcon
                          sx={{
                            color: (theme) => theme.palette.textColor.red,
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "1px solid",
                        color: (theme) => theme.palette.textColor.listColor,
                        borderX: "none",
                        fontSize: "16px",
                      }}
                    >
                      {formatDate(user.registeredAt)}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "1px solid",
                        color: (theme) => theme.palette.textColor.listColor,
                        borderX: "none",
                        fontSize: "16px",
                      }}
                    >
                      {formatDate(user.lastVisit)}
                    </TableCell>

                    {/* <TableCell align="center" sx={{ width: "400px" }}>
                      {`${user.isDeleted}`}
                    </TableCell> */}
                    {/* <TableCell
                      align="center"
                      sx={{ border: "1px solid #e0e0e0" }}
                    >
                      {getFeedbacksForTeacher(user.id).map((feedback) => (
                        <Stack
                          key={feedback.id}
                          direction="row"
                          sx={{
                            border: "1px solid grey",
                            display: "flex",
                            gap: "5px",
                          }}
                        >
                          <Box>
                            <Typography>
                              {feedback.message} from{" "}
                              {feedback.fromUser.firstName}{" "}
                              {feedback.fromUser.lastName}
                            </Typography>
                            <Typography>
                              {format(
                                parseJSON(feedback.createdAt),
                                "dd/MM/yyyy HH:mm"
                              )}
                            </Typography>
                          </Box>
                        </Stack>
                      ))}
                    </TableCell> */}

                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: "1px solid",
                        color: (theme) => theme.palette.textColor.listColor,
                        borderX: "none",
                      }}
                    >
                      <EditNoteIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          color: (theme) => theme.palette.textColor.grey,
                          border: "none",
                        }}
                        disabled={user.role === "admin" ? true : false}
                      />
                      <DeleteOutlineIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          color: (theme) => theme.palette.textColor.grey,
                          ml: "20px",
                        }}
                        disabled={user.role === "admin" ? true : false}
                        onClick={() => {
                          dispatch(deleteUserAsAdmin(user.id));
                        }}
                      />
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
        <Stack
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "50px",
          }}
        >
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
