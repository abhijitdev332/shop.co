import { IoArrowForward } from "react-icons/io5";
import successPng from "../../assets/images/payments/success.png";
import cancelPng from "../../assets/images/payments/cancel.png";
import { useLocation, useNavigate } from "react-router-dom";
import cl from "classnames";
import { useEffect, useState } from "react";
import {
  CreateNewPayment,
  VerifyPaymentMutaion,
} from "../../querys/payment/paymentsQuery";
import { CreateOrderMutation } from "../../querys/order/orderQuery";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoaderBtn } from "../../components/component";
import { resetCart } from "../../services/store/cart/cartSlice";
const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const newPayemtMutaion = CreateNewPayment();
  const verifyMutaion = VerifyPaymentMutaion();
  const newOrderMutation = CreateOrderMutation();
  const { products, totalAmount } = useSelector((store) => store.cart);
  const [paymentStatus, setPaymentStatus] = useState("pending"); //pending,success,canceled
  // poll status
  const pollPaymentStatus = (
    sessionId: string,
    checkoutWindow: Window | null
  ) => {
    const timeoutDuration = 60 * 1000; // 2 minutes
    const pollingInterval = 3000; // Poll every 3 seconds
    let interval;
    // Auto-close after 2 minutes
    const timeout = setTimeout(() => {
      toast.error("Payment verification timed out!.");
      if (checkoutWindow) checkoutWindow.close();
      clearInterval(interval);
      setPaymentStatus("canceled");
    }, timeoutDuration);
    // rund the verify every 3sec
    interval = setInterval(async () => {
      if (
        checkoutWindow?.closed ||
        checkoutWindow?.location?.href?.includes("/declined")
      ) {
        checkoutWindow?.close();
        clearInterval(interval);
        clearTimeout(timeout);
        setPaymentStatus("canceled");
        toast.error("Payment failed!!.");
      }

      let response = await verifyMutaion.mutateAsync(sessionId);
      if (response.status == 200) {
        // get the paymetupdate from verifymutaion
        const paymentUpdate = response.data?.data?.payment_status;
        // paid run this
        if (paymentUpdate === "paid") {
          clearInterval(interval);
          clearTimeout(timeout);
          if (checkoutWindow) checkoutWindow.close();
          let paymentDetails = response.data?.data;
          let orderData = {
            products: products?.map((prod) => ({
              productId: prod?.productId,
              variantId: prod?.variantId,
              quantity: prod?.quantity,
            })),
            address: paymentDetails?.metadata?.address,
            userId: paymentDetails?.metadata?.userId,
            transactionId: paymentDetails?.payment_intent,
            totalAmount:
              totalAmount +
              paymentDetails?.total_details?.amount_shipping / 100 -
              paymentDetails?.total_details?.amount_discount / 100,
            discount: paymentDetails?.total_details?.amount_discount / 100,
          };
          // process new order
          let orderRes = await newOrderMutation.mutateAsync(orderData);
          if (orderRes.status == 201) {
            dispatch(resetCart());
            setPaymentStatus("success");
            toast.success("Order successful!");
          }
        } else if (paymentUpdate === "unpaid" || paymentUpdate === "canceled") {
          clearInterval(interval);
          clearTimeout(timeout);
          if (checkoutWindow) checkoutWindow.close();
          setPaymentStatus("canceled");
          toast.error(
            paymentUpdate === "canceled"
              ? "Payment was canceled by the user."
              : "Payment failed. Please try again."
          );
        }
      }
    }, pollingInterval); // runs every 3 seconds
  };
  // process function
  const processNewOrder = async () => {
    let data = await newPayemtMutaion.mutateAsync(state);
    if (data?.paymentUrl) {
      let checkoutUrl = data?.paymentUrl;
      const checkoutWindow = window.open(
        checkoutUrl,
        "_blank",
        "width=600,height=700"
      );
      if (checkoutWindow) {
        const sessionId = data?.sessionId;
        pollPaymentStatus(sessionId, checkoutWindow);
      }
    }
  };
  useEffect(() => {
    if (state) {
      processNewOrder();
    }
  }, [state]);
  return (
    <>
      <section>
        <div className="wrapper">
          {/* <h2>Payment</h2> */}
          <div className="flex justify-center">
            <ul className="steps">
              <li className="step step-primary">Shop</li>
              <li className="step step-primary">Address</li>
              <li
                className={cl(
                  "step ",
                  paymentStatus == "success" ? "step-primary" : ""
                )}
              >
                Payment Done
              </li>
              <li
                className={cl(
                  "step",
                  newOrderMutation.isSuccess && "step-primary"
                )}
              >
                Ordered
              </li>
            </ul>
          </div>
          <div className="flex h-full w-full justify-center">
            <div className="card h-fit bg-white w-96 shadow-xl outline outline-2 mt-24">
              <figure>
                {paymentStatus == "pending" ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  <img
                    src={paymentStatus == "success" ? successPng : cancelPng}
                    alt="Payment success"
                  />
                )}
              </figure>
              <div className="card-body text-black">
                <h2 className="card-title justify-center py-2">
                  {paymentStatus == "success"
                    ? "Payment Successfull"
                    : paymentStatus == "pending"
                    ? "Pending!!"
                    : "Canceled"}
                </h2>

                {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                <div className="card-actions justify-center">
                  <LoaderBtn
                    pending={
                      newPayemtMutaion.isPending || newOrderMutation.isPending
                    }
                    handleClick={() => {
                      navigate("/", { replace: true });
                    }}
                    style="flex gap-2 disabled:outline-2 outline-black "
                  >
                    <span>
                      <IoArrowForward fontSize={"1.4rem"} color="white" />
                    </span>
                    <span className="text-white">Go Home</span>
                  </LoaderBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentPage;
