import {
  Link,
  ScrollRestoration,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { GridProductCard, List, Pagintaion, ProductCard } from "../component";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
  MdOutlineCloseFullscreen,
  MdSort,
} from "react-icons/md";

import { useRef, useState } from "react";
import cl from "classnames";
import {
  useGetProductByCategory,
  useShopGetAllProducts,
} from "../../querys/product/productQuery";
import { useSelector } from "react-redux";
const CategoryProduct = () => {
  const { id } = useParams();
  const [params] = useSearchParams();
  let itemsperpage = 10;
  const [currentPage, setCurrenPage] = useState(1);
  const queryObject = Object.fromEntries(params.entries());
  const { data: shop } = useShopGetAllProducts(
    currentPage * itemsperpage,
    (currentPage - 1) * itemsperpage,
    queryObject
  );
  const { data: cate } = useGetProductByCategory(id);
  const ifCataExisted = (query = "", catedata, shopdata) => {
    if (query !== "") {
      return catedata;
    } else {
      return shopdata;
    }
  };
  let allProducts = ifCataExisted(id, cate?.products, shop?.products);
  let productsLength = ifCataExisted(id, cate?.totalLength, shop?.totalLength);
  const [fillterShow, setFillterShow] = useState(false);
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
          <div className="flex w-full md:gap-10">
            <div className="wrapper h-full">
              <FillterCard show={fillterShow} setShow={setFillterShow} />
            </div>

            <div className="flex w-full h-[90%] flex-col py-3 gap-2 overflow-auto">
              <div className="flex justify-between">
                <h2 className="font-bold text-2xl capitalize">{id}</h2>
                <div className="flex gap-4 items-center">
                  <p>
                    Showing {(currentPage - 1) * itemsperpage}-
                    {currentPage * itemsperpage > productsLength
                      ? productsLength
                      : currentPage * itemsperpage}
                    of {productsLength}
                  </p>
                  {/* <div className="flex items-center">
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
                  </div> */}

                  <button
                    onClick={() => {
                      setFillterShow((prev) => !prev);
                    }}
                  >
                    <MdSort color="black" size={30} />
                  </button>
                </div>
              </div>
              {/* view productlist */}
              <List
                data={allProducts}
                renderItem={(item) => <GridProductCard product={item} />}
              />

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
  const [params, setSearchParams] = useSearchParams();
  const { category, subCategory } = useSelector((store) => store.category);
  const colors = ["yellow", "black", "blue"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);
  const sizeRef = useRef(null);
  const colorsRef = useRef(null);
  const [fillters, setFillters] = useState([]);
  const handleFillterAdd = (key: string, value: string) => {
    setFillters((prev) => {
      const existingIndex = prev.findIndex((ele) => ele.key === key);
      if (existingIndex !== -1) {
        // Update existing filter value
        return prev.map((ele, index) =>
          index === existingIndex ? { ...ele, value } : ele
        );
      } else {
        // Add new filter
        return [...prev, { key, value }];
      }
    });
  };
  const handleFillterDelete = (key) => {
    setFillters((prev) => prev.filter((ele) => ele.key !== key));
  };
  const handleFillterClick = () => {
    const updatedParams = { ...params };
    fillters.forEach((ele) => {
      updatedParams[ele.key] = ele.value;
    });
    setSearchParams(updatedParams);
    setShow(!show);
  };
  return (
    <section
      className={cl(
        "fixed md:static left-0 w-full md:w-fit bg-white z-[10] duration-200",
        show ? "top-[5rem]" : "top-[100%]",
        "h-screen md:h-auto", // Make it full-screen height on small screens
        "overflow-y-auto" // Enable scrolling inside the drawer
      )}
      style={{ maxHeight: "90vh" }} // Limit height for better usability
      onWheel={(e) => e.stopPropagation()}
    >
      <div className="wrapper h-full">
        <div className="card border border-gray-400 p-5 rounded-xl">
          <div className="flex flex-wrap gap-3">
            {fillters.map((ele, inx) => {
              if (inx >= 5) {
                return;
              } else {
                return (
                  <>
                    <div
                      className="badge badge-neutral p-2  gap-2 cursor-pointer"
                      onClick={() => handleFillterDelete(ele.key)}
                    >
                      <span className="text-white capitalize">{ele.value}</span>
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
                );
              }
            })}
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
                <MdOutlineCloseFullscreen fontSize={25} />
              </span>
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            {/*sub category  */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Style</p>
                <span
                  onClick={() => {
                    subCategoryRef.current?.classList?.toggle("h-0");
                  }}
                >
                  <MdKeyboardArrowUp fontSize={25} />
                </span>
              </div>
              <div
                className="flex flex-col gap-2 overflow-hidden"
                ref={subCategoryRef}
              >
                {subCategory.map((ele) => (
                  <div
                    className={cl(
                      "flex justify-between items-center cursor-pointer"
                    )}
                    onClick={() =>
                      handleFillterAdd("subcategory", ele?.SubCategoryName)
                    }
                  >
                    <span className="capitalize">{ele?.SubCategoryName}</span>
                    <span>{<MdKeyboardArrowRight fontSize={20} />}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            {/* price fillter */}
            {/* <div className="flex flex-col gap-3">
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
            </div> */}
            {/* <div className="outline outline-1 outline-slate-300"></div> */}
            {/* colors */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Colors</p>
                <span
                  onClick={() => {
                    colorsRef.current?.classList?.toggle("h-0");
                  }}
                >
                  <MdKeyboardArrowUp fontSize={25} />
                </span>
              </div>
              <div className="flex space-x-3 overflow-hidden" ref={colorsRef}>
                {colors.map((ele) => (
                  <button
                    style={{ background: ele }}
                    className={` rounded-full p-4`}
                    onClick={() => handleFillterAdd("color", ele)}
                  ></button>
                ))}
              </div>
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            {/* size */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Size</p>
                <span
                  onClick={() => {
                    sizeRef.current?.classList?.toggle("h-0");
                  }}
                >
                  <MdKeyboardArrowUp fontSize={25} />
                </span>
              </div>
              <div
                className="flex  flex-wrap gap-4 overflow-hidden"
                ref={sizeRef}
              >
                {sizes.map((ele) => (
                  <button
                    className="px-3 py-2 whitespace-nowrap rounded-badge  bg-gray-200 uppercase"
                    onClick={() => {
                      handleFillterAdd("size", ele);
                    }}
                  >
                    {ele}
                  </button>
                ))}
              </div>
            </div>
            <div className="outline outline-1 outline-slate-300"></div>
            {/* category */}
            <div className="flex flex-col gap-3">
              <p className="font-medium text-lg flex justify-between">
                <span>Category</span>
                <span
                  onClick={() => {
                    categoryRef.current?.classList?.toggle("h-0");
                  }}
                >
                  <MdKeyboardArrowUp fontSize={25} />
                </span>
              </p>

              <div
                className="flex flex-col gap-2 overflow-hidden"
                ref={categoryRef}
              >
                {category.map((ele) => (
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      handleFillterAdd("category", ele?.categoryName)
                    }
                  >
                    <span className="capitalize">{ele?.categoryName}</span>
                    <span>{<MdKeyboardArrowRight fontSize={20} />}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* button apply */}
            <button
              className=" btn btn-active dark:btn-ghost dark:text-black text-white rounded-badge"
              onClick={handleFillterClick}
            >
              Apply Fillters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryProduct;
