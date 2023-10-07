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
import { selectRefreshToken } from "./redux/auth/selectors";
import { PrivateRoute } from "./components/PrivateRoute";
import { selectInitialized, setInitialized } from "./redux/init/initSlice";

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
    return <h1>загружаем</h1>;
  }

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
          <Route
            path="admin"
            element={<PrivateRoute redirectTo="/announcement" role="admin" component={<AdminPanel />} />}
          />
          <Route path="user/:id" element={<PersonalAccount />} />
        </Route>
      </Routes>
    </>
  );
}
