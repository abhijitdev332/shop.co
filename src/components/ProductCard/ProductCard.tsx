import { FC, SyntheticEvent, useState } from "react";
import { product } from "../../types/product";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../services/store/cart/cartSlice";
import { Star } from "../component";
import { Link } from "react-router-dom";
import cl from "classnames";

const ProductCard = ({ product = {}, style = "", size = "", imgStyle }) => {
  const cartProduct = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [productSize, setProductSize] = useState<string>("large");
  const handleAddCart = () => {
    dispatch(
      addProduct({ productId: product?._id, size: productSize, quantity: 1 })
    );
  };
  const handleRemoveCart = () => {
    dispatch(removeProduct(product?._id));
  };

  return (
    <div className={cl("card rounded-box w-32 sm:w-52 md:w-60", style)}>
      <figure>
        <Link to={`/product/${product._id}`} className="w-full">
          <img
            src={product?.imgurl || product?.firstVariantImages?.[0]?.url || ""}
            className={cl("rounded-xl h-32 md:h-64 w-full", imgStyle)}
            alt="cloth"
            onError={(e: SyntheticEvent<HTMLImageElement, ErrorEvent>) => {
              e.target.parentElement.parentElement.parentElement.style.display =
                "none";
            }}
          />
        </Link>
      </figure>
      <div className="card-body p-2 gap-0">
        <h2 className="card-title text-gray-900 text-lg md:text-xl font-medium capitalize text-ellipsis overflow-hidden">
          {product?.name}
          {/* <div className="badge badge-seconday">{product.category.name}</div> */}
        </h2>
        <div className="flex gap-1">
          <p className="text-sm text-gray-500 capitalize font-medium">
            {product?.description}
          </p>
          <div className="flex items-center gap-1">
            <span>
              <Star
                count={product?.averageRating || 1}
                color="orange"
                size={15}
              />
            </span>
            <span>{Math.round(product?.averageRating)}/5</span>
          </div>
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

        <p className="flex items-center gap-2 md:text-2xl font-bold">
          {/* <span>${product?.price}</span> */}
          <span>${product?.firstVariantSellPrice}</span>
          {product?.firstVariantDiscount && (
            <span className="badge font-normal border-none text-red-500 bg-red-100">
              {product?.firstVariantDiscount}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
