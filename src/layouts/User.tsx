import React from "react";
import { Footer, Header } from "../includes/includes";
import { Outlet } from "react-router-dom";
import { NewsLetter } from "../components/component";
import { ToastContainer } from "react-toastify";

const User = () => {
  return (
    <>
      <div className="lg:container lg:mx-auto  mb-10 sm:m-0">
        <Header />
        <Outlet />
        <NewsLetter />
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default User;
