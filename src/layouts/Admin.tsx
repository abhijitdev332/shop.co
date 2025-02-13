import { AdminDashboardHeader, Sidebar } from "../includes/includes";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Loader } from "../components/component";

const Admin = () => {
  return (
    <>
      <div className="wrapper xl:container xl:mx-auto h-screen  mb-10 sm:m-0">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex flex-col w-full overflow-y-scroll">
            <AdminDashboardHeader />
            <Outlet />
          </div>
        </div>
      </div>
      <Loader />
      <ToastContainer style={{ zIndex: 100 }} />
    </>
  );
};

export default Admin;
