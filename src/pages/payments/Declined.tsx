import React, { useEffect } from "react";
import { Header } from "../../includes/includes";
import { IoArrowForward } from "react-icons/io5";
import cancelPng from "../../assets/images/payments/cancel.png";
import { useNavigate } from "react-router-dom";
const Declined = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // setTimeout(() => {
    //   navigate("/");
    // }, 5000);
  }, []);
  return (
    <section>
      <Header />
      <div className="wrapper lg:container lg:mx-auto bg-white h-screen">
        {/* <h2>Payment</h2> */}
        <div className="flex h-full w-full justify-center">
          <div className="card h-fit bg-white w-96 shadow-xl outline outline-2 py-3 mt-24">
            <figure>
              <img src={cancelPng} alt="Payment success" />
            </figure>
            <div className="card-body text-black">
              <h2 className="card-title justify-center py-2">
                Payment Declined
              </h2>
              {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
              <div className="card-actions justify-center">
                <button
                  className="btn btn-md"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <span>
                    <IoArrowForward fontSize={"1.4rem"} />
                  </span>
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Declined;
