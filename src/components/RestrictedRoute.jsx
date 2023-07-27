import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { selectIsLoggedIn } from "@/redux/auth/selectors";

export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

RestrictedRoute.propTypes = {
  component: PropTypes.shape({}),
  redirectTo: PropTypes.string,
};
