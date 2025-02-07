import { Link, ScrollRestoration, useParams } from "react-router-dom"; // Assuming React Router is used
import { useGetOrderDetails } from "../../querys/order/orderQuery";
import { TableBody, TableCell, TableHeader } from "../../components/component";
import { DateFormat } from "../../utils/utils";
import Badge from "../../components/button/Badge";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: orderDetails } = useGetOrderDetails(id || "");
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
          <div className=" p-2 sm:p-8">
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
                {DateFormat(orderDetails?.createdAt)}
              </p>
              <p>
                <span className="font-semibold">Status:</span>
                <Badge status={orderDetails?.status} />
              </p>
            </div>
            {/* Items Table */}
            <div className="overflow-x-auto shadow-lg bg-white rounded-xl p-2">
              <table className="w-full">
                <TableHeader
                  columns={[
                    "Image",
                    "Product Name",
                    "Quantity",
                    "Price",
                    "Total",
                  ]}
                />
                <TableBody
                  columnsData={orderDetails?.products}
                  renderItem={(item, index) => {
                    return (
                      <tr key={index} className="text-black">
                        <TableCell>
                          <img
                            src={item?.variantId?.images?.[0]?.url}
                            alt={item.productId?.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>{item?.productId?.name}</TableCell>
                        <TableCell>{item?.quantity}</TableCell>
                        <TableCell>${item?.variantId?.sellPrice}</TableCell>
                        <TableCell>
                          ${item?.quantity * item?.variantId?.sellPrice}
                        </TableCell>
                      </tr>
                    );
                  }}
                />
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
