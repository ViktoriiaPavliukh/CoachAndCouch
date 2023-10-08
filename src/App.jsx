import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp } from "@/views";
import { Card, Layout, Preview, TeacherForm, PersonalAccount } from "@components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RestrictedRoute } from "@components/RestrictedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { refreshUser } from "@/redux/auth/operations";
import { AdminPanel } from "./views/admin/AdminPanel";
// import { PrivateRoute } from "./components/PrivateRoute";
import { selectIsLoggedIn, selectRefreshToken, selectUser } from "./redux/auth/selectors";

export default function App() {
  const dispatch = useDispatch();
  const refreshtoken = useSelector(selectRefreshToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log(isLoggedIn);
  const user = useSelector(selectUser);
  console.log(user);
  useEffect(() => {
    // const { token } = JSON.parse(localStorage.getItem("persist:auth"));
    // console.log(token);
    if (refreshtoken) {
      dispatch(refreshUser(refreshtoken));
    }
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
          {/* <Route element={<PrivateRoute isLoggedIn={isLoggedIn} role={user.role} redirectTo="/announcement" />}> */}
          <Route path="admin" element={<AdminPanel />} />
          {/* </Route> */}

          <Route path="user/:id" element={<PersonalAccount />} />
        </Route>
      </Routes>
    </>
  );
}
