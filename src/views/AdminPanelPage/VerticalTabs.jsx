import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format, parseJSON } from "date-fns";
import { useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LogOut } from "react-feather";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
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
  languagesSelector,
  specializationsSelector,
  usersAsAdminSelector,
  feedbacksAsAdminSelector,
  usersSelector,
} from "@/redux/admin/adminSelector";
import { AddSpecializationForm } from "../../components/admin/AddSpecializationForm";
import Loader from "@/components/Loader/Loader";
import { TabPanel } from "./TabPanel";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const linkStyles = {
  display: "flex",
  gap: "16px",
  padding: "8px 12px",
  textDecoration: "none",
  color: (theme) => theme.palette.textColor.sidebar,
  "&:hover": { color: (theme) => theme.palette.textColor.linkHover },
  fontSize: "18px",
  flexGrow: 1,
};

export function VerticalTabs() {
  const en = useSelector(selectCurrentLanguage);
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(1);
  const [pageAdvert, setPageAdvert] = useState(1);
  const limit = 10;
  const [deleteState, setDeleteState] = React.useState("delete");
  const [sortConfig, setSortConfig] = useState({
    id: "ASC",
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  const dispatch = useDispatch();
  const adverts = useSelector(advertsAsAdminSelector);
  const languages = useSelector(languagesSelector);
  const specializations = useSelector(specializationsSelector);
  const usersAdmin = useSelector(usersSelector);
  const feedbacks = useSelector(feedbacksAsAdminSelector);
  const formatDate = (dateString) => {
    const date = parseJSON(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleSort = (column) => {
    let direction = "ASC";
    if (sortConfig[column] === "ASC") {
      direction = "DESC";
    }
    setSortConfig((prevSort) => ({
      ...prevSort,
      [column]: direction,
    }));

    dispatch(
      getUsersAsAdmin({
        sort: { ...sortConfig, [column]: direction },
        filter: { photoPath: true, advert: true, countryId: 3 },
        limit: 10,
        page: 2,
      })
    );
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getLanguages());
    dispatch(getSpecializations());
    dispatch(getFeedbacksAsAdmin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdvertsAsAdmin(pageAdvert));
  }, [dispatch, pageAdvert]);

  useEffect(() => {
    dispatch(getUsersAsAdmin(page));
  }, [dispatch, page]);

  const users = useSelector(usersAsAdminSelector);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangePageAdvert = (event, value) => {
    setPageAdvert(value);
  };
  const isLastPage = usersAdmin.length < limit;
  const isLastPageAdverts = adverts.length < limit;

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
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          background: (theme) => theme.palette.background.sidebar,
          height: "100vh",
          pt: "40px",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "80vh",
          }}
        >
          <Tab
            label={intl.formatMessage({ id: "advert" })}
            {...a11yProps(0)}
            sx={{
              alignItems: "flex-start",
              paddingLeft: "0px",
              textTransform: "capitalize",
              fontSize: "18px",
              px: "62px",
              color: (theme) => theme.palette.textColor.sidebar,
              "&:hover": {
                color: (theme) => theme.palette.textColor.linkHover,
              },
              "&.Mui-selected": {
                color: (theme) => theme.palette.textColor.linkHover,
              },
            }}
          />
          <Tab
            label={intl.formatMessage({ id: "usersAdmin" })}
            {...a11yProps(1)}
            sx={{
              alignItems: "flex-start",
              paddingLeft: "0px",
              textTransform: "capitalize",
              fontSize: "18px",
              px: "62px",
              color: (theme) => theme.palette.textColor.sidebar,
              "&:hover": {
                color: (theme) => theme.palette.textColor.linkHover,
              },
              "&.Mui-selected": {
                color: (theme) => theme.palette.textColor.linkHover,
              },
            }}
          />
          <Tab
            label={intl.formatMessage({ id: "personalAccount.settings" })}
            {...a11yProps(2)}
            sx={{
              alignItems: "flex-start",
              textTransform: "capitalize",
              fontSize: "18px",
              px: "62px",
              color: (theme) => theme.palette.textColor.sidebar,
              "&:hover": {
                color: (theme) => theme.palette.textColor.linkHover,
              },
              "&.Mui-selected": {
                color: (theme) => theme.palette.textColor.linkHover,
              },
            }}
          />
          <Tab
            label={intl.formatMessage({ id: "feedback" })}
            {...a11yProps(2)}
            sx={{
              alignItems: "flex-start",
              px: "62px",
              textTransform: "capitalize",
              fontSize: "18px",
              color: (theme) => theme.palette.textColor.sidebar,
              "&:hover": {
                color: (theme) => theme.palette.textColor.linkHover,
              },
              "&.Mui-selected": {
                color: (theme) => theme.palette.textColor.linkHover,
              },
            }}
          />
        </Tabs>
        <Box
          component={Link}
          to="/"
          sx={{
            ...linkStyles,
            display: "flex",
            alignItems: "center",
            pl: "62px",
            alignSelf: "flex-start",
          }}
          onClick={handleLogout}
        >
          <LogOut />
          <Typography variant="posterSubtitle" noWrap>
            {intl.formatMessage({ id: "personalAccount.logout" })}
          </Typography>
        </Box>
      </Stack>
      <TabPanel
        value={value}
        index={0}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Box>
          <Typography sx={{ fontSize: { xs: "40px", md: "48px" } }}>
            {intl.formatMessage({ id: "advert" })}
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
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1px",
                      }}
                    >
                      <Typography sx={{ fontSize: "16px" }}>ID</Typography>
                      <Stack sx={{ cursor: "pointer" }}>
                        <ExpandLessOutlinedIcon />
                        <ExpandMoreOutlinedIcon />
                      </Stack>
                    </Box>
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
                          loading="lazy"
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
                            cursor: "pointer",
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
          <Pagination
            sx={{
              marginY: { xs: "34px", md: "36px" },
              padding: "14px 41px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "15px",
              background: (theme) => theme.palette.background,
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
              boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
              "& .MuiPaginationItem-page.Mui-selected": {
                color: "#FFF",
              },
              "& .MuiPagination-ul": {
                gap: "24px",
              },
            }}
            count={!isLastPageAdverts ? pageAdvert + 1 : pageAdvert}
            color="buttonColor"
            size="large"
            page={pageAdvert}
            siblingCount={0}
            boundaryCount={2}
            onChange={handleChangePageAdvert}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box>
          <Typography sx={{ fontSize: { xs: "40px", md: "48px" } }}>
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1px",
                      }}
                    >
                      <Typography sx={{ fontSize: "16px" }}>ID</Typography>
                      <Stack sx={{ cursor: "pointer" }}>
                        <ExpandLessOutlinedIcon />
                        <ExpandMoreOutlinedIcon />
                      </Stack>
                    </Box>
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1px",
                      }}
                    >
                      <Typography sx={{ fontSize: "16px" }}> E-mail</Typography>
                      <Stack sx={{ cursor: "pointer" }}>
                        <ExpandLessOutlinedIcon />
                        <ExpandMoreOutlinedIcon />
                      </Stack>
                    </Box>
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
                        loading="lazy"
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
          <Pagination
            sx={{
              marginY: { xs: "34px", md: "36px" },
              padding: "14px 41px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "15px",
              background: (theme) => theme.palette.background,
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
              boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
              "& .MuiPaginationItem-page.Mui-selected": {
                color: "#FFF",
              },
              "& .MuiPagination-ul": {
                gap: "24px",
              },
            }}
            count={!isLastPage ? page + 1 : page}
            color="buttonColor"
            size="large"
            page={page}
            siblingCount={0}
            boundaryCount={2}
            onChange={handleChangePage}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography sx={{ fontSize: { xs: "40px", md: "48px" } }}>
          {intl.formatMessage({ id: "personalAccount.settings" })}
        </Typography>
        <TableContainer sx={{ mt: "36px" }}>
          <Stack
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "50px",
            }}
          >
            <AddSpecializationForm specializations={specializations} />
          </Stack>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography sx={{ fontSize: { xs: "40px", md: "48px" } }}>
          {intl.formatMessage({ id: "feedback" })}
        </Typography>
        <Box sx={{ display: "flex", width: "100%" }}>
          {" "}
          <TableContainer sx={{ mt: "36px", width: "100%" }}>
            <Table
              sx={{ width: "100%", minWidth: { md: "700px", lg: "1200px" } }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                  >
                    <Typography sx={{ fontSize: "16px" }}>ID</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                  >
                    {intl.formatMessage({ id: "teacherName" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                  >
                    {intl.formatMessage({ id: "feedback" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                  >
                    {intl.formatMessage({ id: "fromUser" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                  >
                    {intl.formatMessage({ id: "feadbackAdded" })}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                    >
                      {feedback.id}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                    >
                      {feedback.toUser?.firstName || "Unknown"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                    >
                      {feedback.message}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                    >
                      {feedback.fromUser?.firstName || "Unknown"}{" "}
                      {feedback.fromUser?.lastName || ""}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid", fontSize: "16px" }}
                    >
                      {format(new Date(feedback.createdAt), "dd.MM.yyyy")}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid" }}
                    >
                      <DeleteOutlineIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          cursor: "pointer",
                          color: (theme) => theme.palette.textColor.grey,
                        }}
                        onClick={() => handleDeleteFeedback(feedback.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
    </Box>
  );
}
