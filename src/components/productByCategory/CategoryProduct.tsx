import { Link, ScrollRestoration, useParams } from "react-router-dom";
import { Pagintaion, ProductCard } from "../component";
import { MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import { RiFilter3Line } from "react-icons/ri";
import { useState } from "react";
import cl from "classnames";
import { useQuery } from "@tanstack/react-query";
import {
  getProductByCategory,
  getShopAllProducts,
} from "../../querys/productQuery";
const CategoryProduct = () => {
  const { id } = useParams();
  let itemsperpage = 10;
  const [currentPage, setCurrenPage] = useState(1);
  const { data: categoryProducts, error } = useQuery({
    queryKey: ["category", id, currentPage],
    queryFn: () => {
      if (id) {
        return getProductByCategory(id);
      }
      return getShopAllProducts(
        currentPage * itemsperpage,
        (currentPage - 1) * itemsperpage
      );
    },
  });
  let allProducts =
    categoryProducts?.data?.data?.products || categoryProducts?.data?.data;
  let productsLength = categoryProducts?.data?.data?.totalLength;

  const [fillterShow, setFillterShow] = useState<boolean>(false);
  const [products, setProducts] = useState([]);

  return (
    <main>
      <ScrollRestoration />
      <div className="wrapper px-5 md:px-20">
        <div className="outline outline-1 outline-slate-300"></div>
        <div className="py-3">
          {/* breadcrumbs */}
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>Shop</li>
              <li className="capitalize">{id}</li>
            </ul>
          </div>
          <div className="flex w-full">
            <div className="wrapper h-full overflow-y-auto">
              <FillterCard show={fillterShow} setShow={setFillterShow} />
            </div>

            <div className="flex w-full h-[90%] flex-col py-3 gap-2">
              <div className="flex justify-between">
                <h2 className="font-bold text-2xl capitalize">{id}</h2>
                <div className="flex gap-4 items-center">
                  <p>
                    Showing {itemsperpage} of {productsLength}
                  </p>
                  <div className="flex items-center">
                    <span
                      onClick={() => {
                        setFillterShow((prev) => !prev);
                      }}
                    >
                      Sort By:
                    </span>
                    <select className="w-fit bg-transparent rounded font-bold">
                      <option disabled selected>
                        Most Popular
                      </option>
                      <option>Homer</option>
                      <option>Marge</option>
                      <option>Bart</option>
                      <option>Lisa</option>
                      <option>Maggie</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto">
                {allProducts?.map((ele) => (
                  <ProductCard
                    product={ele}
                    style="!w-full"
                    imgStyle={"h-52"}
                  />
                ))}
              </div>
              <Pagintaion
                currentPage={currentPage}
                setPage={setCurrenPage}
                totalPage={Math.ceil(productsLength / itemsperpage)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

function FillterCard({ show, setShow }) {
  const subCate = ["shirt", "T-shirt", "shorts", "hoddie", "jeans"];
  const variant = ["red", "green", "black"];
  const sizes = ["small", "medium", "large", "x-large"];
  const category = ["casual", "formal", "gym", "party"];
  const [fillters, setFillters] = useState([]);
  const handleFillterAdd = (ev) => {
    if (fillters.includes(ev)) {
      setFillters((prev) => {
        return prev.filter((ele) => ele !== ev);
      });
    } else {
      setFillters((prev) => [...prev, ev]);
    }
  };
  return (
    <section
      className={cl(
        "fixed md:static left-0  w-full md:w-fit bg-white z-[5] duration-200",
        show ? "top-[5rem]" : "top-[100%]"
      )}
    >
      <div className="wrapper">
        <div className="card border border-gray-400 p-5 rounded-xl">
          <div className="flex flex-wrap gap-3">
            {fillters.map((ele) => (
              <>
                <div
                  className="badge badge-neutral p-2  gap-2 cursor-pointer"
                  onClick={() => handleFillterAdd(ele)}
                >
                  <span className="text-white capitalize">{ele}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-4 w-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              </>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {/* heading */}
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">Fillters</h3>
              <span
                onClick={() => {
                  setShow((prev) => !prev);
                }}
              >
                <RiFilter3Line fontSize={25} />
              </span>
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            {/*sub category  */}
            <div className="flex flex-col gap-2">
              {subCate.map((ele) => (
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleFillterAdd(ele)}
                >
                  <span className="capitalize">{ele}</span>
                  <span>{<MdKeyboardArrowRight fontSize={20} />}</span>
                </div>
              ))}
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            {/* price fillter */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <p className="font-medium text-lg">Price</p>
                <span>
                  <MdKeyboardArrowUp fontSize={25} />
                </span>
              </div>
              <input
                type="range"
                min={0}
                max="100"
                // value="40"
                className="range range-xs"
              />
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            {/* coloors */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Colors</p>
                <span>
                  <MdKeyboardArrowUp fontSize={25} />
                </span>
              </div>
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
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Size</p>
                <span>
                  <MdKeyboardArrowUp fontSize={25} />
                </span>
              </div>
              <div className="flex  flex-wrap gap-4">
                {sizes.map((ele) => (
                  <button className="px-3 py-2 whitespace-nowrap rounded-badge  bg-gray-200 capitalize">
                    {ele}
                  </button>
                ))}
              </div>
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            {/* category */}
            <div className="flex flex-col gap-3">
              <p className="font-medium text-lg flex justify-between">
                <span>Dress Styles</span>
                <span>
                  <MdKeyboardArrowUp fontSize={25} />
                </span>
              </p>

              <div className="flex flex-col gap-2">
                {category.map((ele) => (
                  <div
                    className="flex justify-between items-center"
                    onClick={() => handleFillterAdd(ele)}
                  >
                    <span className="capitalize">{ele}</span>
                    <span>{<MdKeyboardArrowRight fontSize={20} />}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* button apply */}
            <button className=" btn btn-active dark:btn-ghost dark:text-black text-white rounded-badge">
              Apply Fillter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryProduct;
