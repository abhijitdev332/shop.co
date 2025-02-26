import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateAddressMutaion,
  DeleteAddressMutaion,
  useGetUserAddress,
} from "../../querys/address/addressQuery";
import { IoMdAdd } from "react-icons/io";
import { LoaderBtn, Modal } from "../../components/component";
import { FaLocationArrow } from "react-icons/fa";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import cl from "classnames";
import { setUser } from "../../services/store/user/userSlice";
import { UpdateUserMutaion } from "../../querys/user/userQuery";
import { addressObject, addressSchema } from "../../schema/user/addressSchema";
import { profileSchema } from "../../schema/user/userSchema";

type ProfileFormInputs = z.infer<typeof profileSchema>;
type AddressFormInputs = z.infer<typeof addressSchema>;
const ProfilePage = () => {
  const dispatch = useDispatch();
  const updateMutation = UpdateUserMutaion();
  const addressAddMutation = CreateAddressMutaion();
  const addressDelMutaion = DeleteAddressMutaion();
  const { userDetails } = useSelector((store) => store.user);
  const userId = userDetails?._id;
  const { data: userAddress, isLoading: userAddressLoading } =
    useGetUserAddress(userId);
  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const modalRef = useRef(null);
  // user validation wiht hook form
  const {
    register,
    handleSubmit,
    reset: userReset,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userDetails?.username,
      email: userDetails?.email,
    },
  });

  const updateSubmit = async (data: ProfileFormInputs) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.image instanceof FileList && data.image[0]) {
      formData.append("image", data.image[0]);
      return updateMutation.mutate({ id: userId, data: formData });
    }
    return updateMutation.mutate({ id: userId, data: formData });
  };
  // address valdiation
  const {
    register: addressReg,
    handleSubmit: addressSubmit,
    formState: { errors: addressErr },
    reset,
  } = useForm<AddressFormInputs>({
    resolver: zodResolver(addressSchema),
  });
  // address add call
  const handleAddressSubmit = async (data: AddressFormInputs) => {
    addressAddMutation.mutate({ userId: userId, ...data });
  };
  const handleAddressdelete = async (id) => {
    addressDelMutaion.mutate(id);
  };
  // Handle image preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  // effect to lister updation success
  useEffect(() => {
    if (updateMutation.isSuccess) {
      toast.success(updateMutation?.data?.message);
      dispatch(setUser(updateMutation?.data?.data));
      setPreviewImage(updateMutation.data?.data?.imgUrl);
      userReset();
    }
  }, [updateMutation.isSuccess]);
  // effect to lister address success
  useEffect(() => {
    if (addressAddMutation.isSuccess || addressDelMutaion.isSuccess) {
      modalRef.current?.close();
      reset();
      toast.success(
        addressAddMutation.data?.message || addressDelMutaion.data?.message
      );
      queryClient.invalidateQueries(["getuseraddress", userId]);
    }
  }, [addressAddMutation.isSuccess, addressDelMutaion.isSuccess]);

  useEffect(() => {}, []);
  return (
    <>
      <section>
        <div className="wrapper md:px-20">
          <div className="py-3">
            {/* breadcrums */}
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/user"}>User</Link>
                </li>
                <li>Profile</li>
              </ul>
            </div>
            {/* profile  */}
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Profile
              </h2>
              <form onSubmit={handleSubmit(updateSubmit)} className="space-y-6">
                {/* Profile Image */}
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border">
                    <img
                      src={previewImage || userDetails?.imgUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Profile Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                      onInput={handleImageChange}
                      {...register("image")}
                    />
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className={`w-full bg-transparent mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-blue-400"
                    }`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={`w-full bg-transparent mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-blue-400"
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 btn btn-neutral transition duration-200"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
            {/* user other details */}
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg my-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                More Info
              </h2>

              <div className="flex flex-col gap-2">
                <p className="font-medium text-lg text-gray-800 ">Roles</p>
                <div className="flex gap-2">
                  {userDetails?.roles?.map((role) => (
                    <span className="badge badge-lg">{role}</span>
                  ))}
                </div>
                <p className="font-medium text-lg text-gray-800 ">
                  Mobile Number
                </p>
                <p>{userDetails?.phoneNumber}</p>

                <p className="font-medium text-lg text-gray-800 ">
                  Joined Date
                </p>
                <p>
                  {new Date(userDetails?.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
            {/* address */}
            {userAddressLoading && (
              <div
                className={cl("skeleton w-60 h-40 bg-gray-200 dark:bg-white ")}
              ></div>
            )}

            <div className="w-auto flex flex-wrap items-center gap-5 p-5  my-4">
              {userAddress?.map((addr) => (
                <div className="w-60 flex flex-col items-center h-40 py-3 px-5 bg-white shadow-lg rounded-lg my-4">
                  <button
                    className={cl(
                      "p-2 max-w-12  bg-red-600 hover:bg-red-800 rounded-badge",
                      addressDelMutaion.isPending ? "animate-pulse" : ""
                    )}
                    onClick={() => handleAddressdelete(addr?._id)}
                  >
                    <RiDeleteBin6Line size={20} color="white" />
                  </button>
                  <p className="text-gray-600  text-sm flex flex-wrap mt-2 capitalize justify-center leading-tight">
                    <span>{addr?.houseNo},</span>
                    <span>{addr?.landMark},</span>
                    <span>{addr?.city},</span>
                    <span>{addr?.state},</span>
                    <span>{addr?.country},</span>
                    <span>{addr?.pin},</span>
                    <br />
                    <span>{addr?.mobile}</span>
                  </p>
                </div>
              ))}
              {/* add card */}
              <div className="w-60 h-40 flex justify-center items-center p-5 bg-white shadow-lg rounded-lg my-4">
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
          </div>
        </div>
      </section>

      {/* modal */}
      <Modal modalRef={modalRef}>
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
                style="!flex gap-1 !text-white"
              >
                <FaLocationArrow />
                <span className="text-inherit">Save Address</span>
              </LoaderBtn>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProfilePage;
