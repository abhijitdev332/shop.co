import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAdminOrders } from "../../../querys/admin/adminQuery";
import {
  DropDown,
  TableBody,
  TableCell,
  TableHeader,
} from "../../../components/component";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getadminOrdersKey } from "../../../querys/admin/adminApi";
import { AdminPagination } from "../adminPages";
import { UpdateOrderStausMutaion } from "../../../querys/order/orderQuery";
const ordersStatus = ["pending", "shipped", "delivered"];
const Orders = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAdminOrders(currentPage, itemsPerPage);
  const queryClient = useQueryClient();
  const updateOrderMutaion = UpdateOrderStausMutaion();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orderStatusstate, setOrdersStatus] = useState("");
  // Toggle product selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  // Select or deselect all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === data?.orders?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(data?.orders.map((product) => product._id));
    }
  };
  // update order status
  // const updateOrderMutaion = useMutation({
  //   mutationKey: ["updateOrderStaus"],
  //   mutationFn: (data) => updateOrderStatus(selectedOrder, data),
  //   onSuccess: (data) => {
  //     toast.success(data?.data?.message);
  //     queryClient.invalidateQueries([
  //       getadminOrdersKey,
  //       "orders",
  //       selectedOrder,
  //     ]);
  //   },
  // });
  const handleUpdateOrderStatus = () => {
    if (orderStatusstate !== "") {
      updateOrderMutaion.mutate({ status: orderStatusstate });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex">
        <div className=" mb-6">
          <p className="text-gray-800 text-2xl font-bold">All Orders</p>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/Admin"}>Admin</Link>
              </li>
              <li>
                <Link to={"/admin"}>Dashbroad</Link>
              </li>
              <li>Orders</li>
            </ul>
          </div>
        </div>
        {/* <div className=" ms-auto flex">
          <Link to={"add"}>
            <button className="btn btn-primary">Add Product</button>
          </Link>
        </div> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading && (
          <div className="skeleton h-96 columns-1 w-full bg-gray-200 dark:bg-white "></div>
        )}
        <table className="w-full rounded overflow-y-hidden">
          <TableHeader
            columns={[
              "",
              "Order ID",
              "Products",
              "Dated",
              "Customer",
              "Total",
              "Payment",
              "Status",
              "Action",
            ]}
            input={true}
            oncheck={selectedProducts.length === data?.orders?.length}
            onchange={toggleSelectAll}
          />
          {/* <thead className="bg-gray-100 sticky top-0 z-10 p-2">
            <tr>
              <th className=" px-4 py-2">
                <input
                  type="checkbox"
                  checked={}
                  onChange={toggleSelectAll}
                  className="checkbox"
                />
              </th>
              <th className=" px-4 py-2 text-left">Order Id</th>
              <th className=" px-4 py-2 text-left">Products</th>
              <th className=" px-4 py-2 text-left">Date</th>
              <th className=" px-4 py-2 text-left">Cutstomer</th>
              <th className=" px-4 py-2 text-left">Total</th>
              <th className=" px-4 py-2 text-left">Payment</th>
              <th className=" px-4 py-2 text-left">Status</th>
              <th className=" px-4 py-2 text-left">Actions</th>
            </tr>
          </thead> */}
          <TableBody
            columnsData={data?.orders}
            renderItem={(order) => {
              return (
                <tr key={order._id} className="text-gray-800 text-base">
                  {/* Checkbox */}
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(order._id)}
                      onChange={() => toggleSelectProduct(order._id)}
                      className="checkbox"
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={order._id} title={order?._id}>
                      {order._id.slice(0, 8)}
                    </Link>
                  </TableCell>
                  {/* Products Name */}
                  <TableCell>
                    <div className="flex gap-1">
                      <div className="avatar">
                        <div className="w-12 rounded">
                          <img
                            src={order?.firstProduct?.variantImages?.[0]?.url}
                            alt="variant image"
                          />
                        </div>
                      </div>
                      <div className="inline-flex flex-col capitalize">
                        <span className="text-wrap capitalize text-sm md:text-base text-gray-800">
                          {order?.firstProduct?.productName || "product name"}
                        </span>
                        {order?.products?.length - 1 > 0 && (
                          <span className="text-sm text-gray-600">
                            +{order?.products?.length - 1} More Products
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* date */}
                  <TableCell>
                    {new Date(order?.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>

                  {/* Category */}
                  <TableCell>{order?.userDetails?.username}</TableCell>

                  {/* Stock */}
                  <TableCell>{order?.totalAmount}</TableCell>

                  {/* Price */}
                  <TableCell>{order?.paymentGateway}</TableCell>

                  {/* Status */}
                  <TableCell>
                    {order?.status == "pending" ? (
                      <span className="badge rounded-btn  !text-base !font-normal badge-md capitalize">
                        {order?.status}
                      </span>
                    ) : (
                      <span className="badge badge-success  !text-base !font-normal capitalize rounded-btn badge-md py-3">
                        {order?.status}
                      </span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropDown>
                      <li>
                        <Link
                          to={`${order?._id}`}
                          className="hover:bg-gray-300 font-medium"
                        >
                          <IoEye />
                          View
                        </Link>
                      </li>
                      <li>
                        <select
                          className="select  w-full bg-white !text-black"
                          onChange={(ev) => {
                            setSelectedOrder(order?._id);
                            setOrdersStatus(ev.target.value);
                          }}
                        >
                          {/* <option disabled selected className="text-black">
                      Update Status
                    </option> */}
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
      <AdminPagination
        currentPage={currentPage}
        setPage={setCurrentPage}
        totalPage={Math.ceil(data?.totalOrders / itemsPerPage)}
        itemperPage={itemsPerPage}
        totalLen={data?.totalOrders}
      />
    </div>
  );
};

export default Orders;
