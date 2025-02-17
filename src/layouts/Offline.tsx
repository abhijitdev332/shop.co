import React from "react";

const Offline = () => {
  return (
    <section className="bg-white h-screen w-screen">
      <div className="wrapper h-full lg:container lg:mx-auto">
        <div className="grid h-full place-items-center">
          <div className=" h-60 w-60 flex flex-col rounded-xl bg-[#00021f] p-8">
            <div className="cardTitle flex flex-col gap-2">
              <p className="text-white">You are Offline!!</p>
              <p className="text-white">Please Check your network!!</p>
            </div>
            <button className="btn btn-neutral flex gap-1 mt-auto">
              <IoArrowBack size={25} color="white" />
              <Link to={-1} className="text-white">
                Go Back
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offline;
