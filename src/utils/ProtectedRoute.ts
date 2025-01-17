import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";

const GuestProtected = ({ children }) => {
  const [user, status] = useUser();
  status ? children : <Navigate to={"/"} />;
};

const UserProtected = ({ children }) => {
  const [user, status] = useUser();
  status ? <Navigate to={"/"} /> : children;
};

export { GuestProtected, UserProtected };
