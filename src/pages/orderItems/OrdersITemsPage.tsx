import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, ScrollRestoration, useParams } from "react-router-dom"; // Assuming React Router is used
import { getOrderDeatils } from "../../querys/orderQuery";

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number; image: string }[];
  totalAmount: number;
  status: string;
}

const imageUrl =
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const { data, error } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: () => getOrderDeatils(id),
  });

  let orderDetails = data?.data?.data;
  console.log(orderDetails);
  return (
    <section>
      <ScrollRestoration />
      <div className="wrapper md:px-20">
        <div className="py-3">
          {/* breadcrumbs */}
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/user"}>User</Link>
              </li>
              <li>
                <Link to={"/user/orders"}>Orders</Link>
              </li>
              <li>Order Details</li>
            </ul>
          </div>
          {/* order details */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Order Details
            </h2>
            <div className="mb-4 flex flex-col gap-2">
              <p>
                <span className="font-semibold">Order ID:</span>
                {orderDetails?._id}
              </p>
              <p>
                <span className="font-semibold my-3">Order Date:</span>
                {new Date(orderDetails?.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Status:</span>
                <span
                  className={`px-2 py-1 rounded-btn capitalize ${
                    orderDetails?.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {orderDetails?.status}
                </span>
              </p>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto shadow-lg bg-white rounded-xl p-2">
              <table className="w-full">
                <thead className="">
                  <tr>
                    <th className=" px-4 py-2 text-left">Image</th>
                    <th className=" px-4 py-2 text-left">Product Name</th>
                    <th className=" px-4 py-2 text-left">Quantity</th>
                    <th className=" px-4 py-2 text-left">Price</th>
                    <th className=" px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.products?.map((item, index) => (
                    <tr key={index} className="text-black">
                      <td className=" px-4 py-2">
                        <img
                          src={item?.variantId?.images?.[0]?.url}
                          alt={item.productId?.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className=" px-4 py-2 capitalize  ">
                        {item?.productId?.name}
                      </td>
                      <td className=" px-4 py-2">{item?.quantity}</td>
                      <td className=" px-4 py-2">
                        ${item?.variantId?.sellPrice}
                      </td>
                      <td className=" px-4 py-2">
                        ${item?.quantity * item?.variantId?.sellPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* dicount  */}
            <div className="mt-4 text-right">
              <p className="text-xl font-bold">
                Discount: - ${orderDetails?.discount}
              </p>
            </div>
            {/* Total Amount */}
            <div className="mt-4 text-right">
              <p className="text-xl font-bold">
                Total Amount: ${orderDetails?.totalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
