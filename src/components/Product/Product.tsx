import { useEffect, useMemo, useState } from "react";
import { Link, ScrollRestoration, useParams } from "react-router-dom";
import { Star } from "../component";
import cl from "classnames";
import style from "./product.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../services/store/cart/cartSlice";
import RealativeProducts from "./RealativeProducts";
import ProductReviews from "./ProductReviews";
import ProductDetails from "./ProductDetails";
import { toast } from "react-toastify";
import { useGetProductById } from "../../querys/product/productQuery";
import { AddToCartMutaion } from "../../querys/cart/cartQuery";

// default img url
const imgUrl =
  "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const Product = () => {
  const { id } = useParams();
  const { userDetails } = useSelector((store) => store.user);
  const { data } = useGetProductById(id);
  const updateCartMutaion = AddToCartMutaion();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  // product data and its all variants
  const [productData, setProductData] = useState(null);
  const [allVariants, setAllVariants] = useState([]);
  const [productColors, setProductsColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [currentProductImage, setCurrentProductImage] = useState("");
  const [currentProductVariant, setCurrentProductVariant] = useState({});
  const [currentProductColor, setCurrentProductColor] = useState("");
  const [selectedProductSize, setSelectedProductSize] = useState("");
  // local state for quantity and others
  const [category, setCatergory] = useState("");
  const [quantity, setQuantity] = useState(1);
  // check if the product existed in cart
  const productExisted = useMemo(() => {
    let haveProduct = cart?.products?.find(
      (ele) => ele?.productId == productData?._id
    );
    return !!haveProduct;
  }, [productData, cart]);
  // handle add cart
  const handleCartAdd = () => {
    if (!selectedProductSize) {
      return toast.info("Please Select an size!!");
    }
    let product = {
      productId: productData?._id,
      variantId: currentProductVariant?._id,
      name: productData?.name,
      price: currentProductVariant?.sellPrice,
      quantity: quantity,
      color: currentProductColor,
      size: selectedProductSize,
      imgurl: currentProductImage,
      stock: currentProductVariant?.stock,
    };
    if (userDetails?._id) {
      updateCartMutaion.mutate({
        userId: userDetails._id,
        data: {
          cartTotal: quantity * currentProductVariant?.sellPrice,
          product: product,
        },
      });
    }
    dispatch(
      addProduct({
        ...product,
      })
    );
  };
  // handle remove cart
  const handleCartRemove = () => {
    dispatch(removeProduct(productData?._id));
  };
  // quantity add
  const addClick = () => {
    if (!selectedProductSize) {
      return toast.info("Please Select an size!!");
    }
    if (quantity + 1 > currentProductVariant?.stock) {
      return toast.info(`Availble Stock is ${currentProductVariant?.stock}`);
    }

    setQuantity((prev) => prev + 1);
  };
  // quantity minus
  const minusClick = () => {
    if (!selectedProductSize) {
      return toast.info("Please Select an size!!");
    }

    setQuantity((prev) => prev - 1);
  };
  // effect on data changes

  useEffect(() => {
    if (data) {
      const { matchedProduct, productVariants } = data;
      setProductData(matchedProduct || null);
      setAllVariants(productVariants || []);
      // Extract unique colors
      const uniqueColors = [...new Set(productVariants.map((v) => v.color))];
      setProductsColors(uniqueColors);

      // Set default color and variant
      const defaultVariant = productVariants[0] || {};
      setCurrentProductColor(defaultVariant?.color || "");
      setCurrentProductVariant(defaultVariant);
      setSelectedProductSize(defaultVariant?.size);
      setProductImages(defaultVariant?.images || []);
      setCurrentProductImage(defaultVariant?.images?.[0]?.url || "");
      setSizes(
        productVariants
          .filter((v) => v?.color === defaultVariant?.color)
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
      setSelectedProductSize(filteredVariants[0]?.size);
      setCurrentProductVariant(filteredVariants[0] || {});
    }
  }, [currentProductColor, allVariants]);

  // Update current variant when the selected size changes
  useEffect(() => {
    if (selectedProductSize) {
      const variant = allVariants?.find(
        (v) =>
          v?.color === currentProductColor && v?.size === selectedProductSize
      );
      setCurrentProductVariant(variant || {});
    }
  }, [selectedProductSize, currentProductColor, allVariants]);

  return (
    <>
      <ScrollRestoration />
      <section className="bg-white overflow-hidden">
        <div className="lg:container lg:mx-auto px-5 md:px-20">
          <div className="divider m-0 w-full"></div>
          <div className="py-3">
            {/* bread crumbs */}
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={-1}>Shop</Link>
                </li>
                <li className="capitalize">{category}</li>
              </ul>
            </div>
            {/* bradcrumbs end */}
            <div className="flex flex-col md:flex-row py-2 space-x-5">
              <div className="imgCon gap-5 flex flex-col md:flex-row basis-1/2 overflow-clip">
                {/* map all images */}
                <div className="flex order-2 md:order-1 md:flex-col gap-6">
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
                {/* show current image */}
                <div className="box order-1 md:order-2  w-full h-full overflow-hidden">
                  <img
                    src={currentProductImage || imgUrl}
                    alt="product image"
                    className={cl(style.product__img__hero)}
                  />
                </div>
              </div>
              <div className="product-dsc m-0 md:m-2  basis-1/2 flex flex-col py-2">
                <div className="title">
                  <h2 className="text-3xl font-extrabold uppercase leading-tight">
                    {productData?.name}
                  </h2>
                </div>
                <div className="flex space-x-1 items-center pt-2">
                  <Star
                    count={productData?.averageRating || 1}
                    size={20}
                    color="orange"
                  />
                  <span className="text-sm font-mono">
                    {Math.round(productData?.averageRating)}/5
                  </span>
                  {currentProductVariant?.stock < 5 &&
                  currentProductVariant?.stock > 0 ? (
                    <span className="text-red-600 px-3">
                      Only {currentProductVariant?.stock} Left!!
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                {/* price */}
                <div className="price flex py-4 font-bold text-2xl  items-center gap-3">
                  <span>${currentProductVariant?.sellPrice}</span>
                  <span className="text-gray-500  text-sm line-through">
                    ${currentProductVariant?.basePrice}
                  </span>
                  {currentProductVariant?.discount &&
                  +currentProductVariant?.discount > 0 ? (
                    <span className="badge p-3 border-none text-red-700 bg-red-200">
                      -{currentProductVariant?.discount}%
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="dsc py-2">
                  <p className="text-gray-500 font-medium">
                    {productData?.description}
                  </p>
                  <p className="text-gray-500 text-sm capitalize">
                    {productData?.returnPolicy} Days return policy
                  </p>
                </div>
                <div className="outline outline-1 outline-slate-300"></div>
                {/* color */}
                <div className="flex flex-col py-3 gap-3">
                  <p>Select Color</p>
                  <div className="flex space-x-3">
                    {productColors?.map((ele) => (
                      <button
                        className={cl(
                          "flex gap-1 items-center outline  p-1 rounded-btn contrast-75	transition-all",
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
                  <p>Choose Size</p>
                  <div className="flex space-x-3">
                    {sizes.map((ele) => (
                      <button
                        className={cl(
                          "px-3 py-2 rounded-badge  bg-gray-200 capitalize",
                          ele == selectedProductSize ? "bg-primary" : ""
                        )}
                        onClick={() => {
                          setSelectedProductSize(ele);
                        }}
                      >
                        {ele}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="outline outline-1 outline-slate-300"></div>
                {/* quantity and cart */}
                <div className="flex gap-2 py-3 w-full">
                  <div className="btn btn-ghost shadow bg-gray-200 flex gap-4 py-2 w-32  rounded-badge">
                    <button onClick={minusClick}>
                      <FaMinus />
                    </button>
                    <p>{quantity}</p>
                    <button onClick={addClick}>
                      <FaPlus />
                    </button>
                  </div>
                  {productExisted ? (
                    <button
                      className={cl(
                        "btn w-72 text-center  bg-black rounded-badge"
                      )}
                      onClick={handleCartRemove}
                      disabled={currentProductVariant?.stock <= 0}
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      className={cl(
                        "btn w-72 text-center disabled:text-black  bg-black rounded-badge"
                      )}
                      onClick={handleCartAdd}
                      disabled={currentProductVariant?.stock <= 0}
                    >
                      {currentProductVariant?.stock <= 0
                        ? "Out Of Stock"
                        : "Add to Cart"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* tab groups */}
          <div className="tab-wrapper py-10">
            <div
              role="tablist"
              className="tabs tabs-bordered w-full grid-cols-2 text-black"
            >
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={cl(
                  "tab font-medium capitalize  text-inherit text-lg"
                )}
                aria-label="Product Details"
              />
              <div role="tabpanel" className="tab-content p-2 md:p-10">
                <ProductDetails details={productData?.productDetails} />
              </div>

              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={cl(
                  "tab font-medium capitalize text-inherit text-lg"
                )}
                aria-label="Rating & Reviews"
                defaultChecked
              />
              <div role="tabpanel" className="tab-content p-2 md:p-10">
                <ProductReviews
                  reviews={productData?.reviews}
                  totalReviews={productData?.reviews?.length}
                  productId={id}
                />
              </div>
            </div>
          </div>
          {/* relative products */}
          <RealativeProducts productId={id} />
        </div>
      </section>
    </>
  );
};

export default Product;
