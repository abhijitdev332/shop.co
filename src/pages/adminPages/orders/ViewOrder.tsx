import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderDeatils, updateOrderStatus } from "../../../querys/orderQuery";
import { toast } from "react-toastify";
import { LoaderBtn } from "../../../components/component";
import { getadminOrdersKey } from "../../../querys/admin/adminApi";
const ordersStatus = ["pending", "shipped", "delivered"];
const OrderDetailsPage = () => {
  const { id } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["orders", { id }],
    queryFn: () => getOrderDeatils(id),
  });
  const queryClient = useQueryClient();
  // const [order, setOrder] = useState({ ...data?.data?.data } || {});
  const order = { ...data?.data?.data } || {};
  const orderAddress = { ...order?.address } || {};
  const [currentOrderStatus, setorderStatus] = useState(order?.status || "");

  // update order status
  const updateOrderMutaion = useMutation({
    mutationKey: ["updateOrderStaus"],
    mutationFn: (data) => updateOrderStatus(id, data),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries(["orders", id, getadminOrdersKey]);
    },
  });
  const handleStatusChange = () => {
    updateOrderMutaion.mutate({ status: currentOrderStatus });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex">
        <div className=" mb-6">
          <p className="text-gray-800 text-2xl font-bold">All Orders</p>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/Admin"}>Admin</Link>
              </li>
              <li>
                <Link to={-1}>Orders</Link>
              </li>
              <li>Order Details</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Main Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md text-black">
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className=" px-4 py-2 text-left">Product</th>
                <th className=" px-4 py-2 text-left">SKU</th>
                <th className=" px-4 py-2 text-left">Quantity</th>
                <th className=" px-4 py-2 text-left">Price</th>
                <th className=" px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order?.products?.map((product) => (
                <tr key={product?.productId?._id}>
                  <td className=" px-4 py-2">
                    <div className="flex gap-2">
                      <div className="avatar">
                        <div className="w-12 rounded">
                          <img
                            src={product?.variantId?.images[0]?.url || ""}
                            alt="products image"
                          />
                        </div>
                      </div>

                      <p className="capitalize text-lg font-medium">
                        {product?.productId?.name}
                      </p>
                    </div>
                  </td>
                  <td className=" px-4 py-2">{product?.productId?.sku}</td>
                  <td className=" px-4 py-2">{product?.quantity}</td>
                  <td className=" px-4 py-2">
                    ${product?.variantId?.sellPrice}
                  </td>
                  <td className=" px-4 py-2">
                    ${product?.variantId?.sellPrice * product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Order Summary */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal:</span>
              <span>${order?.totalAmount - order?.discount}</span>
            </div>
            {/* <div className="flex justify-between text-sm mb-2">
              <span>Shipping Charges:</span>
              <span>${order.shippingCharges}</span>
            </div> */}
            <div className="flex justify-between text-sm mb-2">
              <span>Discount:</span>
              <span>-${order?.discount}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Grand Total:</span>
              <span>${order?.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Smaller Cards */}
        <div className="space-y-6">
          {/* Order Status Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>
            <select
              className="select select-bordered w-full max-w-xs bg-transparent capitalize"
              onChange={(ev) => setorderStatus(ev.target.value)}
            >
              {ordersStatus.map((ele) => (
                <option
                  value={ele}
                  defaultChecked={ele == currentOrderStatus}
                  className="capitalize"
                >
                  <span className="capitalize font-medium">{ele}</span>
                </option>
              ))}
            </select>
            <div className="mt-4">
              <h4 className="text-sm font-medium">Customer Details</h4>
              <p className="text-gray-600 text-sm mt-1">
                <strong>Name:</strong> {order?.userId?.username}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                <strong>Email:</strong> {order?.userId?.email}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                <strong>Phone:</strong> {order?.userId?.phoneNumber}
              </p>
            </div>

            <LoaderBtn
              pending={updateOrderMutaion.isPending}
              className="btn btn-neutral btn-md w-fit mx-auto"
              handleClick={handleStatusChange}
            >
              Update
            </LoaderBtn>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <p className="text-gray-600 text-sm mb-2">
              <strong>Transaction Number:</strong> {order?.transactionId}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              <strong>Payment Gateway:</strong> {order?.paymentGateway}
            </p>
          </div>

          {/* Shipping Address Card */}
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <p className="text-gray-600 text-sm">{order.addresses.shipping}</p>
          </div> */}

          {/* Billing Address Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
            <p className="text-gray-600 text-sm flex flex-wrap gap-1 capitalize">
              <span>{orderAddress?.houseNo}</span>
              <span>{orderAddress?.landMark}</span>
              <span>{orderAddress?.city}</span>
              <span>{orderAddress?.country}</span>
              <span>{orderAddress?.pin}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
