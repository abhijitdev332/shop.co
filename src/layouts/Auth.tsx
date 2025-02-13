import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Auth = () => {
  return (
    <>
      <div className="relative  mb-10 sm:m-0">
        <Link
          to={"/"}
          className="absolute w-fit p-3 border top-5 left-5 rounded-3xl text-black"
        >
          Go Home
        </Link>
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
};

export default Auth;
