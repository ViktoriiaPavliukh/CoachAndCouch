import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { selectIsLoggedIn } from "@/redux/auth/selectors";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  //   const isRefreshing = useSelector(selectIsRefreshing);
  //   const shouldRedirect = !isLoggedIn && !isRefreshing;

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

PrivateRoute.propTypes = {
  component: PropTypes.shape({}),
  redirectTo: PropTypes.string,
};
