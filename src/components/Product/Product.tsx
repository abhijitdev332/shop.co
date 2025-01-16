import React, { useRef, useState } from "react";
import { Link, ScrollRestoration, useParams } from "react-router-dom";
import { ProductCard, ReviewCard, Star } from "../component";
import { GrSort } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import cl from "classnames";
import style from "./product.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
const Product = () => {
  const { id } = useParams();
  const { data } = useFetch({
    url: `products/${id}`,
    queryKey: id,
  });
  const [category, setCatergory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const variant = ["red", "green", "black"];
  const sizes = ["small", "medium", "large", "x-large"];
  const imgUrl =
    "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const addClick = () => {};
  const minusClick = () => {};
  console.log(data);
  return (
    <>
      <ScrollRestoration />
      <section className="bg-white overflow-hidden">
        <div className="lg:container lg:mx-auto px-20">
          <div className="divider m-0 w-full"></div>
          <div className="py-3">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to={"/home"}>Home</Link>
                </li>
                <li>
                  <Link to={"/shop"}>Shop</Link>
                </li>
                <li className="capitalize">{category}</li>
              </ul>
            </div>
            <div className="flex py-2 space-x-5">
              <div className="imgCon space-x-3 flex basis-1/2">
                {/* map all images */}
                <div className="flex-col gap-2">
                  <img
                    src={imgUrl}
                    alt=""
                    className={cl(style.product__img__slide)}
                  />
                </div>
                {/* show current image */}
                <div className="box  w-full h-full ">
                  <img
                    src={imgUrl}
                    alt="product image"
                    className={cl(style.product__img__hero)}
                  />
                </div>
              </div>
              <div className="product-dsc basis-1/2 flex flex-col py-2">
                <div className="title">
                  <h2 className="text-3xl font-extrabold uppercase leading-tight">
                    this is title
                  </h2>
                </div>
                <div className="flex space-x-1 items-center pt-2">
                  <Star count={4} size={20} color="orange" />
                  <span className="text-sm font-mono">4/5</span>
                </div>
                {/* price */}
                <div className="price flex py-4 font-bold text-2xl  items-center gap-3">
                  <span>$200</span>
                  <span className="text-gray-500 line-through">$300</span>
                  <span className="badge p-3 border-none text-red-700 bg-red-200">
                    - 40%
                  </span>
                </div>
                <div className="dsc py-2">
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nam, aliquam.
                  </p>
                </div>
                <div className="outline outline-1 outline-slate-300"></div>
                {/* color */}
                <div className="flex flex-col py-3 gap-3">
                  <p>Select Color</p>
                  <div className="flex space-x-3">
                    {variant.map((ele) => (
                      <button
                        style={{ background: ele }}
                        className={` rounded-full p-4`}
                      ></button>
                    ))}
                  </div>
                </div>
                <div className="outline outline-1 outline-slate-300"></div>
                {/* size */}
                <div className="flex flex-col py-3 gap-3">
                  <p>Choose Size</p>
                  <div className="flex space-x-3">
                    {sizes.map((ele) => (
                      <button className="px-3 py-2 rounded-badge  bg-gray-200 capitalize">
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
                  <button className="btn w-72 text-center  bg-black rounded-badge">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-wrapper py-10">
            <div
              role="tablist"
              className="tabs tabs-bordered w-full grid-cols-3"
            >
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={cl("tab font-medium capitalize  text-lg")}
                aria-label="Product Details"
              />
              <div role="tabpanel" className="tab-content p-10">
                <ProductDetails />
              </div>

              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={cl("tab font-medium capitalize text-lg")}
                aria-label="Rating & Reviews"
                defaultChecked
              />
              <div role="tabpanel" className="tab-content p-10">
                <ProductReviews />
              </div>

              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={cl("tab font-medium capitalize  text-lg")}
                aria-label="FAQS"
              />
              <div role="tabpanel" className="tab-content p-10">
                <ProductFAQS />
              </div>
            </div>
          </div>
          <RealativeProducts />
        </div>
      </section>
    </>
  );
};
function RealativeProducts({ products = [], title = "You might also like" }) {
  return (
    <section>
      <div className="wrapper py-10 px-5">
        <div className="flex flex-col">
          <h2 className="font-extrabold py-10 text-center uppercase text-3xl">
            {title}
          </h2>
          {/* map the products */}
          <div className="flex gap-7 flex-wrap justify-center">
            {products?.map((ele) => (
              <ProductCard product={ele} />
            ))}
          </div>
          {/* <div className="flex justify-center py-7">
            <Link
              to={viewLink}
              className=" text-black px-7 btn btn-outline rounded-badge"
            >
              View All
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}
function ProductReviews({ reviews = [], totalReviews = 0 }) {
  const modalRef = useRef(null);
  return (
    <>
      <section>
        <div className="wrapper">
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-4 justify-between">
              <h3 className="flex space-x-1 items-center">
                <span className="font-bold text-lg">All Reviews</span>
                <span className="text-sm text-gray-rounded-badge ">(451)</span>
              </h3>
              {/* fillter and write review */}
              <div className="flex gap-3 items-center">
                <div className="rounded-full bg-gray-300 p-3 ">
                  <GrSort />
                </div>
                <div className="rounded-badge bg-gray-300 px-3 py-2 flex gap-1 items-center ">
                  <span>Latest</span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </div>
                <button
                  className="rounded-badge px-3 py-2  text-sm bg-black text-white"
                  onClick={() => modalRef.current?.showModal()}
                >
                  Write a Review
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {reviews.map((ele) => (
                <ReviewCard stats={4} />
              ))}
            </div>
            <div className="flex w-full justify-center">
              <button className="btn rounded-badge  btn-active capitalize">
                Load more Reviews
              </button>
            </div>
          </div>
        </div>
      </section>

      <dialog
        id="my_modal_5"
        ref={modalRef}
        className="modal modal-bottom  sm:modal-middle"
      >
        <div className="modal-box bg-primary">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
function ProductFAQS({ questions = [] }) {
  return (
    <section>
      <div className="wrapper flex flex-col gap-3">
        <div className="collapse collapse-plus bg-gray-100">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-gray-100">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-gray-100">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
      </div>
    </section>
  );
}
function ProductDetails() {
  const details = {
    fabric: "cotton",
    fit: "slim",
    styleCode: "shirt Tshirt",
    packOf: 1,
    fabricCare: "hand wash",
    pattern: "solid",
    pockets: 2,
  };
  return (
    <section>
      <div className="wrapper">
        <div className="flex flex-col gap-3">
          {Object.entries(details).map((ele) => (
            <p className="flex gap-2">
              <span className="font-medium text-lg capitalize">{ele[0]}:</span>
              <span className="capitalize font-medium">{ele[1]}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Product;
