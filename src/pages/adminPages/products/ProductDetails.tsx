import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteReview } from "../../../querys/productQuery";
import cl from "classnames";
import {
  DropDown,
  ReviewCard,
  Star,
  TableBody,
  TableCell,
  TableHeader,
} from "../../../components/component";
import style from "./style.module.scss";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { UpdateOrderStausMutaion } from "../../../querys/orderQuery";
import { getadminOrdersKey } from "../../../querys/admin/adminApi";
import {
  useProductOrderDetails,
  useGetProductById,
} from "../../../querys/product/productQuery";
// default img url
const imgUrl =
  "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const OrderTableHeader = [
  "",
  "Order Id",
  "Products",
  "Dated",
  "Customer",
  "Total",
  "Payment",
  "Status",
  "Actions",
];
// main export tab group
const ProductDetailsTabGroup = () => {
  const { id } = useParams();
  const [currentVariantColor, setCurrentVarintColor] = useState({});
  const [reviews, setReviews] = useState([]);

  const handleVariant = (va) => {
    setCurrentVarintColor(va?.color);
  };
  const handleReviews = (reviewArr) => {
    setReviews([...reviewArr]);
  };
  return (
    <>
      <div className="p-3">
        {/* bread */}
        <div className="flex">
          <div className=" mb-6">
            <p className="text-gray-800 text-2xl font-bold">Product Details</p>
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/Admin"}>Admin</Link>
                </li>
                <li>
                  <Link to={-1}>Products</Link>
                </li>
                <li>Details</li>
              </ul>
            </div>
          </div>
        </div>
        {/* bread end */}
        {/* tab group */}
        <div role="tablist" className="tabs tabs-bordered grid-cols-3">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            id="details"
            className="tab text-lg font-medium"
            aria-label="Details"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content p-3">
            <ProductDetails
              setVariant={handleVariant}
              setReview={handleReviews}
            />
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            id="orders"
            className="tab text-lg font-medium"
            aria-label="Orders"
          />

          <div role="tabpanel" className="tab-content p-3">
            <div className="wrapper w-full">
              <ProductOrders id={id} color={currentVariantColor} />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab text-lg font-medium"
            aria-label="Reviews"
          />
          <div role="tabpanel" className="tab-content p-3">
            <div className="wrapper w-full">
              <ProductReview reviews={reviews} productId={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// product details
const ProductDetails = ({ setVariant, setReview }) => {
  const { id } = useParams();
  const { data } = useGetProductById(id);
  const [productData, setProductData] = useState(null);
  const [allVariants, setAllVariants] = useState([]);
  const [currentProductVariant, setCurrentProductVariant] = useState({});
  const [currentProductImage, setCurrentProductImage] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productColors, setProductsColors] = useState([]);
  const [currentProductColor, setCurrentProductColor] = useState("");
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (data) {
      const { matchedProduct, productVariants } = data;
      setProductData(matchedProduct || null);
      setReview(matchedProduct?.reviews);
      setAllVariants(productVariants || []);
      // Extract unique colors
      const uniqueColors = [...new Set(productVariants?.map((v) => v.color))];
      setProductsColors(uniqueColors);

      // Set default color and variant
      const defaultVariant = productVariants?.[0] || {};
      setCurrentProductColor(defaultVariant?.color || "");
      setCurrentProductVariant(defaultVariant);
      setVariant(defaultVariant);
      setProductImages(defaultVariant?.images || []);
      setCurrentProductImage(defaultVariant?.images?.[0]?.url || "");
      setSizes(
        productVariants
          ?.filter((v) => v?.color === defaultVariant?.color)
          .map((v) => v?.size)
      );
    }
  }, [data]);
  // Update sizes and images when the selected color changes
  useEffect(() => {
    if (currentProductColor) {
      const filteredVariants = allVariants.filter(
        (v) => v?.color === currentProductColor
      );
      setSizes(filteredVariants?.map((v) => v?.size));
      setProductImages(filteredVariants[0]?.images || []);
      setCurrentProductImage(filteredVariants?.[0]?.images?.[0]?.url || "");
      setCurrentProductVariant(filteredVariants[0] || {});
      setVariant(filteredVariants[0] || {});
    }
  }, [currentProductColor, allVariants]);

  return (
    <>
      <div className="p-1">
        <div className="flex gap-4 overflow-auto p-2">
          <div className="imgCon gap-3 flex-col basis-1/3 p-2 bg-white shadow-lg rounded-xl">
            {/* show current image */}
            <div className="box h-fit">
              <img
                src={currentProductImage || imgUrl}
                alt="product image"
                className={cl(style.product__img__hero)}
              />
            </div>
            {/* map all images */}
            <div className="flex gap-5 mt-4">
              {productImages?.map((img) => (
                <img
                  src={img?.url || imgUrl}
                  alt="product image"
                  className={cl(
                    style.product__img__slide,
                    "hover:scale-110 duration-300"
                  )}
                  onClick={() => {
                    setCurrentProductImage(img?.url);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="product-dsc basis-2/3 flex flex-col p-2 shadow-lg rounded-xl">
            <div className="title">
              <h2 className="text-2xl font-extrabold capitalize leading-tight">
                {productData?.name}
              </h2>
            </div>
            <div className="flex space-x-1 items-center pt-2">
              <p className="flex gap-2 items-center text-sm">
                Rating:
                <Star
                  count={productData?.averageRating || 1}
                  size={15}
                  color="orange"
                />
                <span className="text-sm font-mono">
                  {Math.round(productData?.averageRating)}/5
                </span>
              </p>
              <div className="divider divider-horizontal divider-neutral"></div>
              <p className="text-sm">
                Stock: <span>{currentProductVariant?.stock}</span>
              </p>
            </div>
            {/* price */}
            <div className="price flex py-4 font-bold text-2xl  items-center gap-3">
              <span>{currentProductVariant?.sellPrice}</span>
              <span className="text-gray-500 line-through">
                {currentProductVariant?.basePrice}
              </span>
              {currentProductVariant?.discount && (
                <span className="badge p-3 border-none text-red-700 bg-red-200">
                  -{currentProductVariant?.discount}%
                </span>
              )}
            </div>
            <div className="dsc py-2">
              <p className="text-gray-500 capitalize">
                {productData?.description}
              </p>
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            {/* color */}
            <div className="flex flex-col py-3 gap-3">
              <p>Colors:</p>
              <div className="flex space-x-3">
                {productColors?.map((ele) => (
                  <button
                    className={cl(
                      "flex gap-1 items-center outline  p-1 rounded-btn brightness-50	transition-all",
                      ele == currentProductColor ? "outline-1" : "outline-0"
                    )}
                    onClick={() => {
                      setCurrentProductColor(ele);
                    }}
                  >
                    <span
                      style={{ background: ele }}
                      className={` rounded-full p-3`}
                    ></span>
                    <span className="capitalize">{ele}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            {/* size */}
            <div className="flex flex-col py-3 gap-3">
              <p>Sizes:</p>
              <div className="flex space-x-3">
                {sizes?.map((ele) => (
                  <button
                    className={cl(
                      "px-3 py-2 rounded-badge  bg-gray-200 capitalize"
                    )}
                  >
                    {ele}
                  </button>
                ))}
              </div>
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            <div className="flex justify-between p-2">
              <p>
                <span>SKU:#{productData?.sku}</span>
              </p>
              <p>
                Created At:
                {new Date(productData?.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// product orders
function ProductOrders({ id = "", color = "" }) {
  const queryClient = useQueryClient();
  const updateOrderStatusMutaion = UpdateOrderStausMutaion();
  const { data: orders } = useProductOrderDetails(id, color);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orderStatusstate, setOrdersStatus] = useState("");
  const ordersStatus = ["pending", "shipped", "delivered"];
  // Toggle product selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  // Select or deselect all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === orders.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(orders.map((product) => product._id));
    }
  };

  const handleUpdateOrderStatus = async () => {
    if (orderStatusstate !== "") {
      let res = await updateOrderStatusMutaion.mutateAsync({
        id: selectedOrder,
        data: { status: orderStatusstate },
      });
      if (res.status == 200) {
        queryClient.invalidateQueries([
          getadminOrdersKey,
          "orders",
          selectedOrder,
        ]);
      }
    }
  };

  return (
    <>
      <div className="p-3 bg-white rounded-lg shadow-md">
        {/* Table */}
        <div className="overflow-x-auto h-fit">
          <table className="w-full rounded">
            <TableHeader
              columns={OrderTableHeader}
              input={true}
              oncheck={selectedProducts.length === orders?.length}
              onchange={toggleSelectAll}
            />

            <TableBody
              columnsData={orders || []}
              renderItem={(order) => {
                return (
                  <tr key={order._id} className="text-black text-lg h-fit">
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
                          <div className="w-10 h-14 rounded">
                            <img
                              src={order?.firstProduct?.variantImages?.[0]?.url}
                              alt="variant image"
                            />
                          </div>
                        </div>
                        <div className="inline-flex flex-col capitalize">
                          <span className="text-wrap text-sm font-medium text-gray-800">
                            {order?.firstProduct?.productDetails?.name ||
                              "product name"}
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
                        <span className="badge rounded-btn badge-lg capitalize">
                          {order?.status}
                        </span>
                      ) : (
                        <span className="badge badge-success capitalize rounded-btn badge-lg">
                          {order?.status}
                        </span>
                      )}
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
      </div>
    </>
  );
}
// product reviews
function ProductReview({ reviews = [], productId = "" }) {
  const queryClient = useQueryClient();
  const { mutate: reviewDeleteMutation } = useMutation({
    mutationKey: ["deleteReview", productId],
    mutationFn: (reviewId) => deleteReview(productId, reviewId),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries(["product", productId]);
    },
  });
  const handleReviewDelete = async (reviewId) => {
    reviewDeleteMutation(reviewId);
  };
  return (
    <>
      <div className="p-3 bg-white rounded-lg shadow-md">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {reviews?.map((review) => (
            <ReviewCard
              id={review?._id}
              customerName={review?.user?.username}
              stats={review?.rating}
              reviewText={review?.comment}
              handleDelete={handleReviewDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetailsTabGroup;
