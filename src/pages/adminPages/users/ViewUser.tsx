import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DateFormat, ImageLetter } from "../../../utils/utils";
import {
  UpdateUserRoleMutaion,
  useGetUserById,
} from "../../../querys/user/userQuery";
import {
  DropDown,
  LoaderBtn,
  TableBody,
  TableCell,
  TableHeader,
} from "../../../components/component";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUserOrders } from "../../../querys/order/orderQuery";
import { MdModeEdit } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Badge from "../../../components/button/Badge";
const ordersStatus = ["pending", "shipped", "delivered"];
const UserProfilePage = () => {
  const { id } = useParams();
  const { data: user } = useGetUserById(id);
  const { data: orders, isLoading: orderLoading } = useGetUserOrders(
    id || null
  );
  const updateStatusMutaion = UpdateUserRoleMutaion();
  const queryClient = useQueryClient();
  const options = ["USER", "ADMIN", "MODERATOR"];
  const [currentRole, setCurrentRole] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedOrderStatus, setOrdersStatus] = useState("");
  const handleUserUpdate = () => {
    if (currentRole == "") {
      return toast.info("Please Select an Role!!.");
    }
    updateStatusMutaion.mutate({ id: id, data: { role: currentRole } });
    setCurrentRole("");
  };

  const handleUpdateOrderStatus = () => {};

  useEffect(() => {
    if (updateStatusMutaion.isSuccess) {
      toast.success(updateStatusMutaion.data?.message);
      queryClient.invalidateQueries(["getuser", id]);
    }
  }, [updateStatusMutaion.isSuccess]);

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex">
          <div className=" mb-6">
            <p className="text-gray-800 text-2xl font-bold">User Details</p>
            {/* breadcrumbs */}
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/Admin"}>Admin</Link>
                </li>
                <li>
                  <Link to={-1}>Users</Link>
                </li>
                <li>ViewUser</li>
              </ul>
            </div>
          </div>
        </div>

        {/* main */}
        <div className="wrapper">
          <h2 className="text-2xl font-bold mb-6">User Profile</h2>

          <div className=" p-2">
            {/* Profile Image */}
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border">
                {user?.imgUrl ? (
                  <img src={user?.imgUrl} />
                ) : (
                  <ImageLetter name={user?.username} style="w-24" />
                )}
              </div>
              <div className="ml-6">
                <h3 className="text-xl capitalize font-semibold text-gray-800">
                  Username:{user?.username}
                </h3>
                {user?.roles?.map((role) => (
                  <p className="text-white badge badge-primary">{role}</p>
                ))}
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Display Name
                </label>
                <p className="mt-1 text-gray-800 px-4 py-2 bg-gray-100 rounded-lg">
                  {user?.username}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-gray-800 px-4 py-2 bg-gray-100 rounded-lg">
                  {user?.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-800 px-4 py-2 bg-gray-100 rounded-lg">
                  {user?.phoneNumber}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  className="select select-bordered w-full bg-gray-700"
                  onChange={(e) => setCurrentRole(e.target.value)}
                >
                  <option disabled selected>
                    Select An Role
                  </option>

                  {options?.map((opti) => (
                    <option value={opti}>{opti}</option>
                  ))}
                </select>
              </div>
            </div>
            {currentRole && (
              <div className="flex justify-center py-5">
                <LoaderBtn handleClick={handleUserUpdate} style="text-white">
                  Update
                </LoaderBtn>
              </div>
            )}
          </div>
        </div>

        {/* orders */}
        <div className="wrapper">
          <div className="py-4">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-center py-4">
                Orders Of {user?.username}
              </h2>
              {orderLoading && (
                <div className="skeleton h-96 columns-1 w-full bg-gray-200 dark:bg-white "></div>
              )}
              <div className="table__wrapper w-full">
                <table className="w-full">
                  <TableHeader
                    columns={[
                      "Order Id",
                      "Products",
                      "Total",
                      "Dated",
                      "Gateway",
                      "Status",
                      "Actions",
                    ]}
                  />
                  <TableBody
                    columnsData={orders}
                    renderItem={(order) => {
                      return (
                        <tr key={order._id} className="text-gray-800 text-base">
                          {/* Checkbox */}
                          {/* <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(order._id)}
                              onChange={() => toggleSelectProduct(order._id)}
                              className="checkbox"
                            />
                          </TableCell> */}
                          <TableCell>
                            <Link
                              to={`/admin/orders/${order._id}`}
                              title={order?._id}
                            >
                              {order._id.slice(0, 8)}
                            </Link>
                          </TableCell>
                          {/* Products Name */}
                          <TableCell>
                            <Link
                              to={`/admin/products/${order?.products?.[0]?.productId?._id}`}
                              className="flex gap-1"
                            >
                              <div className="avatar">
                                <div className="w-12 rounded">
                                  <img
                                    src={
                                      order?.products?.[0]?.variantId?.images[0]
                                        ?.url
                                    }
                                    alt="variant image"
                                  />
                                </div>
                              </div>
                              <div className="inline-flex flex-col capitalize">
                                <span className="text-wrap capitalize text-sm md:text-base text-gray-800">
                                  {order?.products?.[0]?.productId?.name ||
                                    "product name"}
                                </span>
                                {order?.products?.length - 1 > 0 && (
                                  <span className="text-sm text-gray-600">
                                    +{order?.products?.length - 1} More Products
                                  </span>
                                )}
                              </div>
                            </Link>
                          </TableCell>
                          {/* totalAmount */}
                          <TableCell>${order?.totalAmount}</TableCell>
                          {/* date */}
                          <TableCell>{DateFormat(order?.createdAt)}</TableCell>

                          {/* Stock */}

                          {/* Price */}
                          <TableCell>{order?.paymentGateway}</TableCell>

                          {/* Status */}
                          <TableCell>
                            <Badge status={order?.status} />
                          </TableCell>

                          {/* Actions */}
                          <TableCell>
                            <DropDown>
                              <li>
                                <Link
                                  to={`/admin/orders/${order?._id}`}
                                  className="hover:bg-gray-300 font-medium"
                                >
                                  <IoEye />
                                  View
                                </Link>
                              </li>
                              <li>
                                <select
                                  className="select select-bordered  w-full bg-white !text-black"
                                  onChange={(ev) => {
                                    setSelectedOrder(order?._id);
                                    setOrdersStatus(ev.target.value);
                                  }}
                                >
                                  {ordersStatus.map((ele) => (
                                    <option
                                      className="capitalize text-black"
                                      value={ele}
                                      selected={order?.status == ele}
                                    >
                                      {ele}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  className="hover:bg-gray-300 btn btn-neutral my-3 font-medium"
                                  onClick={handleUpdateOrderStatus}
                                >
                                  <div className="flex gap-1">
                                    <MdModeEdit />
                                    <span className="text-white">Update</span>
                                  </div>
                                </button>
                              </li>
                            </DropDown>
                          </TableCell>
                        </tr>
                      );
                    }}
                  />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
