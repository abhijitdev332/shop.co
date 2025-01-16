import React from "react";
import { Link, useParams } from "react-router-dom"; // Assuming React Router is used

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number; image: string }[];
  totalAmount: number;
  status: string;
}
const data = {
  id: "123456",
  date: "2025-01-01T10:00:00Z",
  items: [
    {
      name: "Product A",
      quantity: 2,
      price: 250,
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Product B",
      quantity: 1,
      price: 500,
      image: "https://via.placeholder.com/100",
    },
  ],
  totalAmount: 1000,
  status: "delivered",
};
const imageUrl =
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract order ID from the URL

  return (
    <section>
      <div className="wrapper md:px-20">
        <div className="py-3">
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
            <div className="mb-4">
              <p>
                <span className="font-semibold">Order ID:</span> {data.id}
              </p>
              <p>
                <span className="font-semibold">Order Date:</span>{" "}
                {new Date(data.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    data.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {data.status}
                </span>
              </p>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100 text-black">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Image
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Item Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Price
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, index) => (
                    <tr key={index} className="text-black">
                      <td className="border border-gray-300 px-4 py-2">
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ₹{item.price}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ₹{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Amount */}
            <div className="mt-4 text-right">
              <p className="text-xl font-bold">
                Total Amount: ₹{data.totalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
