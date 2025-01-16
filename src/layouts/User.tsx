import React from "react";
import { Footer, Header } from "../includes/includes";
import { Outlet } from "react-router-dom";
import { NewsLetter } from "../components/component";

const User = () => {
  return (
    <>
      <div className="lg:container lg:mx-auto">
        <Header />
        <Outlet />
        <NewsLetter />
        <Footer />
      </div>
    </>
  );
};

export default User;
