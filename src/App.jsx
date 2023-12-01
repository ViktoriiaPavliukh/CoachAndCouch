import { Route, Routes } from "react-router-dom";
import { AboutUsPage, SignIn, SignUp, TeacherFormPage, TeachersPage } from "@/views";
import { Card, Layout, PersonalAccount } from "@components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RestrictedRoute } from "@components/RestrictedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { refreshUser } from "@/redux/auth/operations";
import { AdminPanelPage } from "./views/AdminPanelPage/AdminPanelPage";
import { selectRefreshToken } from "./redux/auth/selectors";
import { PrivateRoute } from "./components/PrivateRoute";
import { selectInitialized, setInitialized } from "./redux/init/initSlice";
import PageError from "./views/page404/PageError";
import { MainPage, Lessons, Enquiry, Schedule, Messages, Settings } from "./components/PersonalAccount/index";

export default function App() {
  const dispatch = useDispatch();
  const refreshtoken = useSelector(selectRefreshToken);
  const initialized = useSelector(selectInitialized);

  useEffect(() => {
    if (refreshtoken) {
      dispatch(refreshUser(refreshtoken)).then(dispatch(setInitialized({ initialized: true })));
    } else {
      dispatch(setInitialized({ initialized: true }));
    }
  }, []);

  if (!initialized) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<PageError />} />
          <Route index element={<TeachersPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="teachers/:id" element={<Card />} />
          <Route path="/teacherform" element={<TeacherFormPage />} />
          <Route path="/registration" element={<RestrictedRoute redirectTo="/" component={<SignUp />} />} />
          <Route path="/login" element={<RestrictedRoute redirectTo="/" component={<SignIn />} />} />
          <Route path="/admin" element={<PrivateRoute redirectTo="/" role="admin" component={<AdminPanelPage />} />} />
          <Route path="/user/:id" element={<PersonalAccount />}>
            <Route path="/user/:id/main" element={<MainPage />} />
            <Route path="/user/:id/lessons" element={<Lessons />} />
            <Route path="/user/:id/enquiry" element={<Enquiry />} />
            <Route path="/user/:id/schedule" element={<Schedule />} />
            <Route path="/user/:id/messages" element={<Messages />} />
            <Route path="/user/:id/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
