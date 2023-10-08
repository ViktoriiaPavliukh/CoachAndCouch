import { Navigate, Outlet } from "react-router-dom";

import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../redux/auth/selectors";

export const PrivateRoute = ({ redirectTo = "/", isLoggedIn, role, children }) => {
  console.log(role);
  console.log(isLoggedIn);
  const logged = useSelector(selectIsLoggedIn);
  const adminRole = useSelector(selectUser).role;
  console.log(adminRole);
  console.log(logged);
  if (!isLoggedIn && role !== "admin") return <Navigate to={redirectTo} />;
  //   const isRefreshing = useSelector(selectIsRefreshing);
  //   const shouldRedirect = !isLoggedIn && !isRefreshing;

  return children ? children : <Outlet />;
};

PrivateRoute.propTypes = {
  component: PropTypes.shape({}),
  redirectTo: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  role: PropTypes.string,
  children: PropTypes.node,
};
