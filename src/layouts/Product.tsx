import React, { useState } from "react";
import { Footer, Header } from "../includes/includes";
import { Outlet } from "react-router-dom";
import { NewsLetter } from "../components/component";
import { ToastContainer } from "react-toastify";

const Product = () => {
  return (
    <>
      <div className="lg:container mx-auto bg-white">
        <Header />
        <Outlet />
        <NewsLetter />
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default Product;
