import { SyntheticEvent, useState } from "react";
import { Star } from "../component";
import { Link } from "react-router-dom";
import cl from "classnames";

const SearchProductCard = ({ product = {}, style = "", imgStyle }) => {
  return (
    <>
      <div className={cl("w-full md:w-60 flex gap-1 overflow-hidden", style)}>
        <figure className={cl("h-16 w-14", imgStyle)}>
          <Link to={`/product/${product._id}`} className="w-full">
            <img
              src={
                product?.imgurl || product?.firstVariantImages?.[0]?.url || ""
              }
              className={cl("rounded-xl size-full")}
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

          <p className="flex gap-2 text-xs md:text-2xl font-bold">
            {/* <span>${product?.price}</span> */}
            <span className="text-base">${product?.firstVariantSellPrice}</span>
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
      <div className="divider m-0"></div>
    </>
  );
};

export default SearchProductCard;
