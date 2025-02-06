import { Link } from "react-router-dom";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useGetUserOrders } from "../../querys/order/orderQuery";

const imageUrl =
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const OrdersPage = () => {
  const { userDetails } = useSelector((store) => store.user);
  const userId = userDetails?._id;
  const { data: products } = useGetUserOrders(userId);
  // const { data, error } = useQuery({
  //   queryKey: ["userOrders", userId],
  //   queryFn: () => userOrders(userId),
  // });
  // let products = data?.data?.data;
  return (
    <section>
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
              <li>Orders</li>
            </ul>
          </div>

          {/* order history */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Your Orders
            </h2>
            <div className="space-y-4">
              {products?.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                >
                  {/* Product Image */}
                  <div className="w-32 h-36 flex-shrink-0">
                    <img
                      src={
                        order?.products?.[0]?.variantId?.images?.[0]?.url ||
                        imageUrl
                      }
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-lg font-semibold">
                          Order ID: {order._id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Date:{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
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
                        {order?.products?.length === 1
                          ? `${order.products?.[0]?.productId?.name} (+${order.products?.[0].quantity} items)`
                          : `+${order.products.length} items`}
                      </p>
                    </div>

                    {/* Total Amount and View Details */}
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-lg font-semibold">
                        Total: ${order?.totalAmount}
                      </p>
                      <Link to={`/user/orders/${order?._id}`}>
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
