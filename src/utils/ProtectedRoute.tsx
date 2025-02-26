import { useOnlineStatus } from "../hooks/useOnlineStatus";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";

const GuestProtected = ({ children }) => {
  const [_, status] = useUser();
  return status ? children : <Navigate to={"/"} />;
};
const UserProtected = ({ children }) => {
  const [_, status] = useUser();
  return status ? <Navigate to={"/"} /> : children;
};
const AdminProtected = ({ children }) => {
  const [user] = useUser();
  return user?.roles?.includes("ADMIN") ? children : <Navigate to={"/"} />;
};

const OfflineStatusProtected = ({ children }) => {
  const online = useOnlineStatus();
  return online ? <Navigate to={"/"} /> : children;
};

export {
  GuestProtected,
  UserProtected,
  AdminProtected,
  OfflineStatusProtected,
};
