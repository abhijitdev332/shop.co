import { AdminDashboardHeader, Sidebar } from "../includes/includes";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoadingScreen } from "../components/component";

const Admin = () => {
  return (
    <>
      <div className="wrapper lg:container lg:mx-auto h-screen">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex flex-col w-full overflow-y-scroll">
            <AdminDashboardHeader />
            <Outlet />
          </div>
        </div>
      </div>
      <LoadingScreen />
      <ToastContainer style={{ zIndex: 100 }} />
    </>
  );
};

export default Admin;
