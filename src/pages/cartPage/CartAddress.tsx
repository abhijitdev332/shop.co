import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, getUserAddress } from "../../querys/addressQuery";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { LoaderBtn, Modal } from "../../components/component";
import { FaLocationArrow } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cl from "classnames";
import { IoArrowForward } from "react-icons/io5";
import { newPayment, verifyPayment } from "../../querys/payments";
import { newOrder } from "../../querys/orderQuery";
import { resetCart } from "../../services/store/cart/cartSlice";
const addressSchema = z.object({
  landMark: z.string().min(1, "land mark is required"),
  houseNo: z.string().optional(),
  city: z.string().min(1, "city is required"),
  district: z.string().optional(),
  state: z.string().min(1, "state is required"),
  country: z.string().min(1, "country is required"),
  pin: z.string().min(6, "pincode should 6 digits"),
});
const addressObject = {
  landMark: "",
  houseNo: "",
  city: "",
  district: "",
  state: "",
  country: "",
  pin: "",
};

type AddressFormInputs = z.infer<typeof addressSchema>;
const CartAddress = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector((store) => store.user);
  const { products } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const userId = userDetails?._id || "";
  const { data } = useQuery({
    queryKey: ["userAddress", userId],
    queryFn: () => getUserAddress(userId),
    refetchOnWindowFocus: true,
  });
  let userAddress = data?.data?.data || [];
  const [selectedAddress, setSelectedAddress] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const modalRef = useRef(null);
  const { mutate } = useMutation({
    mutationKey: ["newpayment"],
    mutationFn: (data) => newPayment(data),
    onSuccess: async (data) => {
      setCheckoutUrl(data?.data?.data?.paymentUrl);
      let checkoutUrl = data?.data?.data?.paymentUrl;
      const checkoutWindow = window.open(
        checkoutUrl,
        "_blank",
        "width=600,height=700"
      );

      if (checkoutWindow) {
        const sessionId = data?.data?.data?.sessionId;
        pollPaymentStatus(sessionId, checkoutWindow);
      }
    },
  });
  const { mutateAsync: verifyMutaion } = useMutation({
    mutationKey: ["verify-payment", checkoutUrl],
    mutationFn: (session) => verifyPayment(session),
    // onSuccess: (data) => {
    //   toast.success(data?.data?.message);
    // },
  });
  const { mutateAsync: orderMutation } = useMutation({
    mutationKey: ["newOrder", checkoutUrl],
    mutationFn: (data) => newOrder(data),
    onSuccess: () => {
      dispatch(resetCart());
    },
  });

  const pollPaymentStatus = (
    sessionId: string,
    checkoutWindow: Window | null
  ) => {
    const timeoutDuration = 60 * 1000; // 2 minutes
    const pollingInterval = 3000; // Poll every 3 seconds
    let interval;
    // Auto-close after 2 minutes
    const timeout = setTimeout(() => {
      console.warn("Payment verification timed out.");
      if (checkoutWindow) checkoutWindow.close();
      clearInterval(interval);
      navigate("/declined");
      toast.error("Payment verification timed out. Please try again.");
    }, timeoutDuration);

    interval = setInterval(async () => {
      if (
        checkoutWindow?.closed ||
        checkoutWindow?.location?.href?.includes("/declined")
      ) {
        checkoutWindow?.close();
        clearInterval(interval);
        clearTimeout(timeout);
        navigate("/declined");
        toast.error("Payment verification Failed. Please try again.");
      }

      let res = await verifyMutaion(sessionId);
      if (res.status == 200) {
        const paymentStatus = res.data?.data?.payment_status;
        if (paymentStatus === "paid") {
          clearInterval(interval);
          clearTimeout(timeout);
          if (checkoutWindow) checkoutWindow.close();
          let paymentDetails = res.data?.data;
          let orderData = {
            products: cart?.products?.map((prod) => ({
              productId: prod?.productId,
              variantId: prod?.variantId,
              quantity: prod?.quantity,
            })),
            address: paymentDetails?.metadata?.address,
            userId: paymentDetails?.metadata?.userId,
            transactionId: paymentDetails?.payment_intent,
            totalAmount:
              cart?.totalAmount +
              paymentDetails?.total_details?.amount_shipping / 100 -
              paymentDetails?.total_details?.amount_discount / 100,
            discount: paymentDetails?.total_details?.amount_discount / 100,
          };

          let orderRes = await orderMutation(orderData);
          if (orderRes.status === 201) {
            navigate("/success");
            toast.success("Order successful!");
          }
        } else if (paymentStatus === "unpaid" || paymentStatus === "canceled") {
          clearInterval(interval);
          clearTimeout(timeout);
          if (checkoutWindow) checkoutWindow.close();
          navigate("/declined");
          toast.error(
            paymentStatus === "canceled"
              ? "Payment was canceled by the user."
              : "Payment failed. Please try again."
          );
        }
      }
    }, pollingInterval); // runs every 3 seconds
  };
  //   chekcout func
  const handleCheckout = async () => {
    if (selectedAddress == "") {
      return toast.info("Please select an address");
    }
    let productData = products?.map((ele) => ({
      name: ele?.name,
      image: ele?.imgurl,
      price: ele?.price,
      quantity: ele?.quantity,
    }));
    let delivery = {
      name: "Delihivery Fees",
      price: state.delhivery,
      quantity: 1,
    };
    let discountCode = {
      code: "Discount10",
      price: state.discount,
      percent: 10,
    };
    let data = {
      productData,
      delivery,
      discountCode,
      addressId: selectedAddress,
      userId: userId,
    };
    mutate(data);
  };
  const {
    register: addressReg,
    handleSubmit: addressSubmit,
    formState: { errors: addressErr },
    reset,
  } = useForm<AddressFormInputs>({
    resolver: zodResolver(addressSchema),
  });
  const { mutate: addressAddMutation, isPending: addresAddPending } =
    useMutation({
      mutationKey: ["addAddress", { userId }],
      mutationFn: (data) => createAddress(data),
      onSuccess: (data) => {
        if (modalRef?.current) {
          modalRef.current?.close();
        }
        reset();
        toast.success(data.data?.message);
        queryClient.invalidateQueries(["userAddress", userId]);
      },
    });
  const handleAddressSubmit = async (data: AddressFormInputs) => {
    // addressAddMutation
    addressAddMutation({ userId: userId, ...data });
  };

  return (
    <>
      <section className="bg-white">
        <div className="wrapper p-2 sm:px-10">
          {/* breadcrumbs */}
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={-1}>Cart</Link>
              </li>
              <li>Address</li>
            </ul>
          </div>
          {/* steps */}
          <div className="flex justify-center">
            <ul className="steps">
              <li className="step step-primary">Shop</li>
              <li className="step step-primary">Address</li>
              <li className="step"></li>
              <li className="step"></li>
            </ul>
          </div>

          {/* addres cards */}
          <div>
            <h2 className="text-xl font-bold py-4">Please Select An Address</h2>
            {/* address */}
            <div className="w-auto flex flex-wrap items-center gap-5 p-5  my-4">
              {userAddress?.map((addr: any) => (
                <div
                  className={cl(
                    "w-60 flex flex-col items-center h-fit sm:h-40 py-3 px-5  shadow-lg rounded-lg my-4 cursor-pointer",
                    addr?._id == selectedAddress ? "bg-accent" : ""
                  )}
                  onClick={() => setSelectedAddress(addr?._id)}
                >
                  <p className="text-gray-600  sm:text-xl  bg-transparent flex flex-wrap mt-2 capitalize justify-center leading-tight">
                    <span>{addr?.houseNo},</span>
                    <span>{addr?.landMark},</span>
                    <span>{addr?.city},</span>
                    <span>{addr?.state},</span>
                    <span>{addr?.country},</span>
                    <span>{addr?.pin}</span>
                  </p>
                </div>
              ))}

              <div className="w-60 h-fit sm:h-40 flex justify-center items-center p-5 bg-white shadow-lg rounded-lg my-4">
                <button
                  onClick={() => {
                    if (modalRef?.current) {
                      modalRef?.current?.showModal();
                    }
                  }}
                  className="flex gap-1 btn btn-ghost"
                >
                  <span>
                    <IoMdAdd size={30} />
                  </span>
                  <span className="font-bold text-lg">Add Address</span>
                </button>
              </div>
            </div>
            {/* address end */}
          </div>
          <div className="flex justify-center">
            <button
              className="btn text-white btn-neutral"
              onClick={handleCheckout}
            >
              Go To Checkout
              <IoArrowForward />
            </button>
          </div>
          <Modal modalRef={modalRef}>
            <div className="wrapper">
              <div className="flex flex-col gap-2 p-2">
                <form onSubmit={addressSubmit(handleAddressSubmit)}>
                  {Object.keys(addressObject).map((obj) => (
                    <label htmlFor="" className="flex flex-col gap-1">
                      <span className="py-2 font-medium text-lg capitalize">
                        {obj}
                      </span>

                      <input
                        type="text"
                        name={obj}
                        className="input input-bordered bg-transparent"
                        {...addressReg(obj)}
                      />
                      {addressErr[obj] && (
                        <p className="mt-1 text-sm text-red-500">
                          {addressErr[obj].message}
                        </p>
                      )}
                    </label>
                  ))}
                  <div className="flex justify-center py-2">
                    <LoaderBtn
                      pending={addresAddPending}
                      type="submit"
                      style="!flex gap-1 !btn-primary"
                    >
                      <FaLocationArrow />
                      <span>Save Address</span>
                    </LoaderBtn>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
          {/* <dialog id="my_modal_2" className="modal" ref={modalRef}>
            <div className="modal-box bg-white w-lg">
            
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog> */}
        </div>
      </section>
    </>
  );
};

export default CartAddress;
