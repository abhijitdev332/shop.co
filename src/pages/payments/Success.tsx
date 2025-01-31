import React, { useEffect, useState } from "react";
import { Header } from "../../includes/includes";
import { IoArrowForward } from "react-icons/io5";
import successPng from "../../assets/images/payments/success.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyPayment } from "../../querys/payments";
import { toast, ToastContainer } from "react-toastify";
import { newOrder } from "../../querys/orderQuery";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../services/store/cart/cartSlice";
import cl from "classnames";
const Success = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  let session_id = params.get("session_id");
  const [paymentStatus, setPaymentStatus] = useState(false);

  const {
    mutateAsync: orderMutation,
    isPending: orderPending,
    isSuccess: orderSucess,
  } = useMutation({
    mutationKey: ["newOrder", { session_id }],
    mutationFn: (data) => newOrder(data),
    onSuccess: (data) => {
      dispatch(resetCart());
    },
  });

  const {
    mutateAsync: verifyMutaion,
    isSuccess,
    data: paymentData,
  } = useMutation({
    mutationKey: ["verify-payment", { session_id }],
    mutationFn: (session) => verifyPayment(session),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      setPaymentStatus(true);
    },
    onError: () => navigate("/declined"),
  });

  const verifyPaymentDetails = async () => {
    let res = await verifyMutaion(session_id);
    if (res.status !== 200) {
      return toast.error(res.data?.message);
    }
    let paymentDeatils = res.data?.data;
    let orderData = {
      products: cart?.products?.map((prod) => ({
        productId: prod?.productId,
        variantId: prod?.variantId,
        quantity: prod?.quantity,
      })),
      address: paymentDeatils?.metadata?.address,
      userId: paymentDeatils?.metadata?.userId,
      transactionId: paymentDeatils?.payment_intent,
      totalAmount:
        cart?.totalAmount +
        paymentDeatils?.total_details?.amount_shipping / 100 -
        paymentDeatils?.total_details?.amount_discount / 100,
      discount: paymentDeatils?.total_details?.amount_discount / 100,
    };
    let orderRes = await orderMutation(orderData);
  };

  // useEffect(() => {
  //   if (session_id) {
  //     verifyPaymentDetails();
  //   }
  // }, [session_id]);

  return (
    <>
      <section>
        <Header />
        <div className="wrapper lg:container lg:mx-auto bg-white h-screen">
          {/* <h2>Payment</h2> */}
          <div className="flex justify-center">
            <ul className="steps">
              <li className="step step-primary">Shop</li>
              <li className="step step-primary">Address</li>
              <li className="step step-primary">Payment Done</li>
              <li className={cl("step step-primary")}>Ordered</li>
            </ul>
          </div>
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
      <ToastContainer />
    </>
  );
};

export default Success;
