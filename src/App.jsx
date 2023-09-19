import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp } from "@/views";
import { Card, Layout, Preview, TeacherForm } from "@components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RestrictedRoute } from "@components/RestrictedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "@/redux/auth/selectors";
import { refreshUser } from "@/redux/auth/operations";
import { AdminPanel } from "./views/admin/AdminPanel";

export default function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) dispatch(refreshUser(token));
  }, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="announcement" element={<Preview />} />
          <Route path="announcement/:id" element={<Card />} />
          <Route path="teacherform" element={<TeacherForm />} />
          <Route path="registration" element={<RestrictedRoute redirectTo="/announcement" component={<SignUp />} />} />
          <Route path="login" element={<RestrictedRoute redirectTo="/announcement" component={<SignIn />} />} />
          <Route path="admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  );
}
