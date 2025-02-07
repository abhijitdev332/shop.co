import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../services/store/cart/cartSlice";
import { Star } from "../component";
import { Link } from "react-router-dom";
import cl from "classnames";

const GridProductCard = ({ product = {}, style = "", imgStyle = "" }) => {
  const cartProduct = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [productSize, setProductSize] = useState<string>("l");
  const handleAddCart = () => {
    dispatch(
      addProduct({ productId: product?._id, size: productSize, quantity: 1 })
    );
  };
  const handleRemoveCart = () => {
    dispatch(removeProduct(product?._id));
  };

  return (
    <div className={cl("h-fit overflow-hidden", style)}>
      <figure
        className={cl(
          "h-[10rem]  w-auto sm:h-[12rem] lg:h-[15rem] overflow-hidden rounded-lg",
          imgStyle
        )}
      >
        <Link to={`/product/${product._id}`}>
          <img
            src={product?.imgurl || product?.firstVariantImages?.[0]?.url || ""}
            className={cl("size-full")}
            alt="cloth"
            onError={(e: SyntheticEvent<HTMLImageElement, ErrorEvent>) => {
              e.target.parentElement.parentElement.parentElement.style.display =
                "none";
            }}
          />
        </Link>
      </figure>
      <div className="sm:p-2  p-1 gap-1 flex flex-col">
        <h2 className="text-gray-900 text-xs sm:text-sm  font-medium capitalize  overflow-hidden">
          {product?.name}
          {/* <div className="badge badge-seconday">{product.category.name}</div> */}
        </h2>
        <div className="w-fit">
          <span>
            <Star
              count={product?.averageRating || 1}
              color="orange"
              size={10}
            />
          </span>
          {/* <span>{Math.round(product?.averageRating)}/5</span> */}
        </div>
        <div className="flex gap-1">
          {/* <p className="text-sm text-gray-500 capitalize font-medium">
            {product?.description}
          </p> */}
        </div>

        {/* <p className="text-gray-800">{product.description?.slice(0, 70)}</p> */}
        {/* <div className="card-actions justify-center pt-5">
          {cartProduct?.productsArr.includes(product?.id) ? (
            <button className="btn btn-base-200" onClick={handleRemoveCart}>
              remove cart
            </button>
          ) : (
            <button className="btn btn-base-200" onClick={handleAddCart}>
              Add Cart
            </button>
          )}
        </div> */}

        <p className="flex gap-2 text-xs md:text-2xl font-bold">
          {/* <span>${product?.price}</span> */}
          <span>${product?.firstVariantSellPrice}</span>
          {product?.firstVariantDiscount &&
          product?.firstVariantDiscount > 0 ? (
            <span className="badge font-normal border-none text-red-500 bg-red-100">
              -{product?.firstVariantDiscount}%
            </span>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default GridProductCard;
