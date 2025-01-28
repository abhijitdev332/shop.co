import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../../querys/productQuery";
import cl from "classnames";
import { Star } from "../../../components/component";
import style from "./style.module.scss";
import useFetch from "../../../hooks/useFetch";
// default img url
const imgUrl =
  "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetch({
    url: `/product/${id}`,
    queryKey: ["product", { id }],
    options: {
      staleTime: 1000 * 60 * 5, // Cache the result for 5 minutes
      refetchOnWindowFocus: false, // Prevent refetching on window focus
    },
  });
  const [productData, setProductData] = useState(null);
  const [allVariants, setAllVariants] = useState([]);
  const [currentProductVariant, setCurrentProductVariant] = useState({});
  const [currentProductImage, setCurrentProductImage] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productColors, setProductsColors] = useState([]);
  const [currentProductColor, setCurrentProductColor] = useState("");
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const { matchedProduct, productVariants } = data?.data;
      setProductData(matchedProduct || null);
      setAllVariants(productVariants || []);
      // Extract unique colors
      const uniqueColors = [...new Set(productVariants?.map((v) => v.color))];
      setProductsColors(uniqueColors);

      // Set default color and variant
      const defaultVariant = productVariants?.[0] || {};
      setCurrentProductColor(defaultVariant?.color || "");
      // setCurrentProductVariant(defaultVariant);
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
    }
  }, [currentProductColor, allVariants]);

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
          <div className=" ms-auto flex">
            <Link to={"add"}>
              <button className="btn btn-primary">Add Product</button>
            </Link>
          </div>
        </div>
        {/* bread end */}
        <div className="flex gap-4 overflow-auto md:p-5">
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
              <h2 className="text-3xl font-extrabold uppercase leading-tight">
                {productData?.name}
              </h2>
            </div>
            <div className="flex space-x-1 items-center pt-2">
              <p className="flex gap-2 items-center">
                Rating:
                <Star
                  count={productData?.averageRating || 1}
                  size={20}
                  color="orange"
                />
                <span className="text-sm font-mono">
                  {Math.round(productData?.averageRating)}/5
                </span>
              </p>
              <div className="divider divider-horizontal divider-neutral"></div>
              <p>
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
                  {currentProductVariant?.discount}
                </span>
              )}
            </div>
            <div className="dsc py-2">
              <p className="text-gray-500">{productData?.description}</p>
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

export default ProductDetails;
