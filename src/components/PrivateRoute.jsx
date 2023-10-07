import { Navigate, Outlet } from "react-router-dom";

import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser, selectIsLoading } from "../redux/auth/selectors";

export const PrivateRoute = ({ redirectTo = "/", role, component }) => {
  const isRefreshing = useSelector(selectIsLoading);
  const userLogged = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser).role;

  if (isRefreshing) {
    return <h1>хер вам!</h1>;
  }

  const valid = userLogged && role === userRole;
  if (valid) return component ? component : <Outlet />;

  console.log("redirect to ", redirectTo);
  return <Navigate to={redirectTo} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.shape({}),
  redirectTo: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  role: PropTypes.string,
  children: PropTypes.node,
};
