import React, { useEffect } from "react";
import { Header } from "../../includes/includes";
import { IoArrowForward } from "react-icons/io5";
import successPng from "../../assets/images/payments/success.png";
import { useNavigate } from "react-router-dom";
const Success = () => {
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
          <div className="card h-fit bg-white w-96 shadow-xl outline outline-2 mt-24">
            <figure>
              <img src={successPng} alt="Payment success" />
            </figure>
            <div className="card-body text-black">
              <h2 className="card-title justify-center py-2">
                Payment Successfull
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

export default Success;
