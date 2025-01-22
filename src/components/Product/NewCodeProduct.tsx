import React, { useEffect, useState } from "react";
import { Link, ScrollRestoration, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { addProduct, removeProduct } from "../../services/store/cart/cartSlice";
import { ProductDetails, ProductReviews, RealativeProducts } from "./Product";

const Product = () => {
  const { id } = useParams(); // Get product ID from route params
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  // Fetch product data
  const { data, isLoading, isError } = useFetch({
    url: `/product/${id}`,
    queryKey: ["product", { id }],
    options: {
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      refetchOnWindowFocus: false,
    },
  });

  const [productData, setProductData] = useState(null);
  const [productVariant, setProductVariant] = useState([]);
  const [currentProductVariant, setCurrentProductVariant] = useState({});
  const [currentProductImage, setCurrentProductImage] = useState("");
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const productExisted = useMemo(() => {
    return cart?.products?.some((ele) => ele?.productId === productData?._id);
  }, [productData, cart]);

  // Handle Add to Cart
  const handleCartAdd = () => {
    dispatch(
      addProduct({
        productId: productData?._id,
        name: productData?.name,
        price: 200,
        quantity,
        imgurl: productData?.imgurl,
      })
    );
  };

  // Handle Remove from Cart
  const handleCartRemove = () => {
    dispatch(removeProduct(productData?._id));
  };

  // Update product data and variants when `data` is fetched
  useEffect(() => {
    if (data?.data) {
      setProductData(data.data.matchedProduct || null);
      setProductVariant(data.data.productVariants || []);
      setCurrentProductVariant(data.data.productVariants?.[0] || {});
      setCurrentProductImage(
        data.data.productVariants?.[0]?.images?.[0]?.url || ""
      );
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product data!</div>;

  return (
    <>
      <ScrollRestoration />
      <section className="bg-white overflow-hidden">
        <div className="lg:container lg:mx-auto px-20">
          <div className="divider m-0 w-full"></div>
          <div className="py-3">
            {/* Breadcrumbs */}
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="capitalize">
                  {productData?.category || "Product"}
                </li>
              </ul>
            </div>

            {/* Product Section */}
            <div className="flex py-2 space-x-5">
              {/* Product Images */}
              <ProductImages
                productImages={
                  productVariant.find(
                    (variant) => variant.color === currentProductVariant.color
                  )?.images || []
                }
                currentImage={currentProductImage}
                setCurrentImage={setCurrentProductImage}
              />

              {/* Product Description */}
              <ProductDescription
                productData={productData}
                quantity={quantity}
                onAdd={handleCartAdd}
                onRemove={handleCartRemove}
                onIncrement={() => setQuantity((prev) => prev + 1)}
                onDecrement={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                productExisted={productExisted}
                currentVariant={currentProductVariant}
                onVariantChange={setCurrentProductVariant}
                onSizeChange={setSelectedProductSize}
                selectedSize={selectedProductSize}
                sizes={productVariant
                  .filter(
                    (variant) => variant.color === currentProductVariant.color
                  )
                  .map((variant) => variant.size)}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="tab-wrapper py-10">
            <div className="tabs tabs-bordered w-full grid-cols-2">
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab font-medium capitalize text-lg"
                aria-label="Product Details"
                defaultChecked
              />
              <div role="tabpanel" className="tab-content p-10">
                <ProductDetails details={productData?.productDetails || {}} />
              </div>

              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab font-medium capitalize text-lg"
                aria-label="Rating & Reviews"
              />
              <div role="tabpanel" className="tab-content p-10">
                <ProductReviews
                  reviews={productData?.reviews || []}
                  totalReviews={productData?.reviews?.length || 0}
                />
              </div>
            </div>
          </div>

          {/* Relative Products */}
          <RealativeProducts products={data?.data?.relatedProducts || []} />
        </div>
      </section>
    </>
  );
};

// product images
const ProductImages = ({ productImages, currentImage, setCurrentImage }) => {
  return (
    <div className="imgCon gap-5 flex basis-1/2">
      <div className="flex flex-col gap-6">
        {productImages.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt="Product"
            className="hover:scale-110 duration-300"
            onClick={() => setCurrentImage(img.url)}
          />
        ))}
      </div>
      <div className="box w-full h-full overflow-hidden">
        <img src={currentImage} alt="Current Product" />
      </div>
    </div>
  );
};

// product desc
const ProductDescription = ({
  productData,
  quantity,
  onAdd,
  onRemove,
  onIncrement,
  onDecrement,
  productExisted,
  currentVariant,
  onVariantChange,
  onSizeChange,
  selectedSize,
  sizes,
}) => {
  return (
    <div className="product-dsc basis-1/2 flex flex-col py-2">
      <h2 className="text-3xl font-extrabold uppercase">{productData?.name}</h2>
      <p className="py-2">{productData?.description}</p>

      {/* Variants */}
      <div>
        <p>Select Color</p>
        {currentVariant && (
          <div>
            <button onClick={() => onVariantChange(currentVariant)}>
              {currentVariant.color}
            </button>
          </div>
        )}
      </div>

      <div>
        <p>Sizes:</p>
        {sizes.map((size) => (
          <button
            key={size}
            className={selectedSize === size ? "selected" : ""}
            onClick={() => onSizeChange(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Quantity & Cart */}
      <div>
        <button onClick={onDecrement}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrement}>+</button>
        {productExisted ? (
          <button onClick={onRemove}>Remove from Cart</button>
        ) : (
          <button onClick={onAdd}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default Product;
