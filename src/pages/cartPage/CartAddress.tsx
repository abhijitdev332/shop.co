import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  CreateAddressMutaion,
  useGetUserAddress,
} from "../../querys/address/addressQuery";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { LoaderBtn, Modal } from "../../components/component";
import { FaLocationArrow } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cl from "classnames";
import { IoArrowForward } from "react-icons/io5";
import { addressObject, addressSchema } from "../../schema/user/addressSchema";

type AddressFormInputs = z.infer<typeof addressSchema>;
const CartAddress = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const { userDetails } = useSelector((store) => store.user);
  const { products } = useSelector((store) => store.cart);
  const userId = userDetails?._id || "";
  const addressAddMutation = CreateAddressMutaion();
  const { data: userAddress } = useGetUserAddress(userId);
  const [selectedAddress, setSelectedAddress] = useState("");
  const modalRef = useRef(null);
  //   chekcout func
  const handleCheckout = async () => {
    if (selectedAddress == "") {
      return toast.info("Please select an address");
    }
    // make the data
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
    navigate("/payment", { state: data });
  };
  const {
    register: addressReg,
    handleSubmit: addressSubmit,
    formState: { errors: addressErr },
    reset,
  } = useForm<AddressFormInputs>({
    resolver: zodResolver(addressSchema),
  });
  const handleAddressSubmit = async (data: AddressFormInputs) => {
    addressAddMutation.mutate({ userId: userId, ...data });
  };
  useEffect(() => {
    if (addressAddMutation.isSuccess) {
      modalRef.current?.close();
      reset();
      toast.success(addressAddMutation.data?.message);
      queryClient.invalidateQueries(["userAddress", userId]);
    }
  }, [addressAddMutation.isSuccess]);

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
                    <span>{addr?.mobile},</span>
                    <span>{addr?.pin}</span>
                  </p>
                </div>
              ))}
              {/* new address modal */}
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
          {/* modal add adress */}
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
                      pending={addressAddMutation.isPending}
                      type="submit"
                      style="!flex gap-1 !btn-primary"
                    >
                      <>
                        <FaLocationArrow />
                        <span>Save Address</span>
                      </>
                    </LoaderBtn>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </>
  );
};

export default CartAddress;
