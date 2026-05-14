import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function RoleRoute({ children, allowedRoles }) {
  const cookie = new Cookies();

  const token = cookie.get("token");
  const role = cookie.get("role");


  if (!token) {
    return <Navigate to="/" />;
  }


  if (!allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
}