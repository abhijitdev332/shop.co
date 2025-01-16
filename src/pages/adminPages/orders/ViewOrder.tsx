import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  products: Product[];
  subtotal: number;
  shippingCharges: number;
  discount: number;
  grandTotal: number;
  status: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  payment: {
    transactionNumber: string;
    gateway: string;
  };
  addresses: {
    shipping: string;
    billing: string;
  };
}

const OrderDetailsPage: React.FC = () => {
  const [order, setOrder] = useState<OrderDetails>({
    products: [
      { id: "1", name: "Product A", sku: "SKU001", price: 100, quantity: 2 },
      { id: "2", name: "Product B", sku: "SKU002", price: 200, quantity: 1 },
    ],
    subtotal: 400,
    shippingCharges: 50,
    discount: 20,
    grandTotal: 430,
    status: "Pending",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
    },
    payment: {
      transactionNumber: "TXN123456",
      gateway: "PayPal",
    },
    addresses: {
      shipping: "123 Main Street, New York, NY 10001",
      billing: "456 Elm Street, Los Angeles, CA 90001",
    },
  });

  const handleStatusChange = (newStatus: string) => {
    setOrder({ ...order, status: newStatus });
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
        {/* <div className=" ms-auto flex">
          <Link to={"add"}>
            <button className="btn btn-primary">Add Product</button>
          </Link>
        </div> */}
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
              {order.products.map((product) => (
                <tr key={product.id}>
                  <td className=" px-4 py-2">{product.name}</td>
                  <td className=" px-4 py-2">{product.sku}</td>
                  <td className=" px-4 py-2">{product.quantity}</td>
                  <td className=" px-4 py-2">₹{product.price}</td>
                  <td className=" px-4 py-2">
                    ₹{product.price * product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Order Summary */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal:</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Shipping Charges:</span>
              <span>₹{order.shippingCharges}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Discount:</span>
              <span>-₹{order.discount}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Grand Total:</span>
              <span>₹{order.grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Smaller Cards */}
        <div className="space-y-6">
          {/* Order Status Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="mt-4">
              <h4 className="text-sm font-medium">Customer Details</h4>
              <p className="text-gray-600 text-sm mt-1">
                <strong>Name:</strong> {order.customer.name}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                <strong>Email:</strong> {order.customer.email}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                <strong>Phone:</strong> {order.customer.phone}
              </p>
            </div>

            <button className="btn btn-primary btn-md w-fit mx-auto">
              Update
            </button>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <p className="text-gray-600 text-sm mb-2">
              <strong>Transaction Number:</strong>{" "}
              {order.payment.transactionNumber}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              <strong>Payment Gateway:</strong> {order.payment.gateway}
            </p>
          </div>

          {/* Shipping Address Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <p className="text-gray-600 text-sm">{order.addresses.shipping}</p>
          </div>

          {/* Billing Address Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
            <p className="text-gray-600 text-sm">{order.addresses.billing}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
