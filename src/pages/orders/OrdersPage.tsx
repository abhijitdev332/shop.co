import { Link } from "react-router-dom";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useGetUserOrders } from "../../querys/order/orderQuery";
import { DateFormat } from "../../utils/utils";
import Badge from "../../components/button/Badge";

const OrdersPage = () => {
  const { userDetails } = useSelector((store) => store.user);
  const userId = userDetails?._id;
  const { data: products } = useGetUserOrders(userId);
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
          <div className="p-2 sm:p-8">
            <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
              Your Orders
            </h2>
            <div className="space-y-4 flex flex-col items-center">
              {products?.map((order) => (
                <div
                  key={order.id}
                  className="max-w-xl sm:w-full flex items-center border rounded-lg sm:p-2 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  {/* Product Image */}
                  <div className=" w-24 h-auto sm:w-32 sm:h-36 flex-shrink-0">
                    <img
                      src={
                        order?.products?.[0]?.variantId?.images?.[0]?.url || ""
                      }
                      className=" w-full  h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 ml-4">
                    <div className="flex gap-3 sm:justify-between">
                      <div>
                        <p className=" text-sm sm:text-base font-semibold">
                          Order ID: {order._id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Date:
                          {DateFormat(order.createdAt)}
                        </p>
                      </div>
                      <Badge status={order?.status} style="p-0 !h-fit" />
                    </div>

                    <div className="mt-2 text-sm text-gray-700">
                      <p>
                        {order?.products?.length === 1
                          ? `${order.products?.[0]?.productId?.name} (+${order.products?.[0].quantity} items)`
                          : `+${order.products.length} items`}
                      </p>
                    </div>

                    {/* Total Amount and View Details */}
                    <div className="sm:mt-4  flex gap-2 sm:justify-between items-center">
                      <p className=" text-sm sm:text-base font-semibold">
                        Total: ${order?.totalAmount}
                      </p>
                      <Link to={`/user/orders/${order?._id}`}>
                        <button className="btn btn-sm sm:btn-md btn-neutral flex items-center gap-1">
                          <span>
                            <HiOutlineViewGridAdd color="white" />
                          </span>
                          View
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
