import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineViewGridAdd } from "react-icons/hi";
const data = [
  {
    id: "123456",
    date: "2025-01-01T10:00:00Z",
    items: [
      { name: "Product A", quantity: 2 },
      { name: "Product B", quantity: 1 },
    ],
    totalAmount: 500,
    status: "delivered",
  },
  {
    id: "123457",
    date: "2024-12-25T15:30:00Z",
    items: [{ name: "Product C", quantity: 3 }],
    totalAmount: 300,
    status: "pending",
  },
];
const imageUrl =
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const OrdersPage = () => {
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
              <li>Orders</li>
            </ul>
          </div>

          {/* order history */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Your Orders
            </h2>
            <div className="space-y-4">
              {data.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                >
                  {/* Product Image */}
                  <div className="w-32 h-36 flex-shrink-0">
                    <img
                      src={order.items[0]?.image || imageUrl}
                      alt={order.items[0]?.name || "Product"}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-lg font-semibold">
                          Order ID: {order.id}
                        </p>
                        <p className="text-sm text-gray-600">
                          Date: {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      {order.status === "delivered" ? (
                        <>
                          <p
                            className={
                              "badge badge-success badge-lg capitalize"
                            }
                          >
                            {order.status}
                          </p>
                        </>
                      ) : (
                        <>
                          <p
                            className={"badge badge-accent badge-lg capitalize"}
                          >
                            {order.status}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="mt-2 text-sm text-gray-700">
                      <p>
                        {order.items.length === 1
                          ? `${order.items[0].name} (${order.items[0].quantity})`
                          : `${order.items.length} items`}
                      </p>
                    </div>

                    {/* Total Amount and View Details */}
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-lg font-semibold">
                        Total: ₹{order.totalAmount}
                      </p>
                      <Link to={`/user/orders/${order?.id}`}>
                        <button className="btn btn-neutral flex items-center gap-1">
                          <span>
                            <HiOutlineViewGridAdd />
                          </span>
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
