import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="bg-white h-screen w-screen">
      <div className="wrapper h-full lg:container lg:mx-auto">
        <div className="grid h-full place-items-center">
          <div className=" h-60 w-60 flex flex-col rounded-xl bg-red-200 p-8">
            <div className="cardTitle">There Is No Such Path Here!!</div>
            <button className="btn btn-neutral flex gap-1 mt-auto">
              <IoArrowBack size={25} color="white" />
              <Link to={"/"} replace className="text-white">
                Go Back
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
