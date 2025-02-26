import {
  RiShoppingCartLine,
  RiAccountCircleLine,
  RiSearch2Line,
} from "react-icons/ri";
import { BsFillPersonVcardFill, BsFillCartCheckFill } from "react-icons/bs";
import { SiNextdns } from "react-icons/si";
import { GiAstronautHelmet } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoClose, IoLogOutSharp } from "react-icons/io5";
import {
  List,
  Logout,
  Modal,
  SearchProductCard,
} from "../../components/component";
import { useEffect, useRef, useState } from "react";
import { MdOutlineStorage } from "react-icons/md";
import { useQueryItems } from "../../querys/product/productQuery";
import Banner from "./Banner";
const Header = () => {
  const cartProduct = useSelector((state) => state.cart);
  const { status } = useSelector((store) => store.user);
  const [inputState, setInputState] = useState("");
  const [query, setQuery] = useState<string | null>(null);
  const searchRef = useRef<HTMLDialogElement>(null);

  const handleQuery = (ev: string) => {
    setQuery(ev?.trim());
  };
  const { data, isLoading } = useQueryItems(query ?? "");
  useEffect(() => {
    let timer;
    if (inputState?.trim() !== "") {
      searchRef.current?.showModal(); // Show modal when user types
      timer = setTimeout(() => {
        handleQuery(inputState); // Update query after debounce
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [inputState]);

  return (
    <>
      <Banner />
      <header className="bg-white z-10">
        <div className="lg:container mx-auto md:px-10">
          <div className="wrapper py-4 px-2 md:px-10">
            <div className="flex gap-1 sm:gap-3 items-center sm:justify-between">
              <div className="ham md:hidden flex items-center cursor-pointer">
                {/* responsive side bar */}
                <div className="drawer">
                  <input
                    type="checkbox"
                    id="my-drawer"
                    className="drawer-toggle"
                  ></input>
                  <span className="drawer-content">
                    <label
                      htmlFor="my-drawer"
                      className="btn btn-ghost drawer-button"
                    >
                      <GiHamburgerMenu size={20} className="drawer-button" />
                    </label>
                  </span>

                  <div className="drawer-side z-10">
                    <label
                      htmlFor="my-drawer"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="flex relative h-full flex-col bg-gray-300 w-80 gap-6 items-center py-10 text-lg">
                      <div className="close">
                        <label
                          htmlFor="my-drawer"
                          aria-label="close sidebar"
                          className="drawer-overlay cursor-pointer absolute top-5 right-5 bg-base-200  p-2 rounded-btn"
                        >
                          <span>
                            <IoClose color="black" size={30} />
                          </span>
                        </label>
                      </div>
                      <li>
                        <Link to={"/"}>Home</Link>
                      </li>
                      <li>
                        <div className="collapse bg-transparent w-fit h-fit">
                          <input type="checkbox" className="!h-[20px]" />
                          <div className="collapse-title text-center !h-[20px] p-0 flex justify-center items-center gap-1">
                            <span>Shop</span>
                            <span>
                              <IoIosArrowDown />
                            </span>
                          </div>
                          <div className="collapse-content p-0">
                            <ul className="flex flex-col items-center gap-2 text-lg">
                              <li className="hover:bg-slate-500 p-2 rounded-lg">
                                <Link to={"/product/category/male"}>
                                  Men's Clothes
                                </Link>
                              </li>
                              <li className="hover:bg-slate-500 p-2 rounded-lg">
                                <Link to={"/product/category/female"}>
                                  Women's Clothes
                                </Link>
                              </li>
                              <li className="hover:bg-slate-500 p-2 rounded-lg">
                                <Link to={"/product/category/kids"}>
                                  Kids Collections
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      {/* <li>
                        <Link to={"/product/category/sale"}>On Sale</Link>
                      </li> */}
                      <li>
                        <Link to={"/product/category/new arrivel"}>
                          New Arrival
                        </Link>
                      </li>
                      {/* <li>
                        <Link to={"/product/category/brands"}>Brands</Link>
                      </li> */}

                      <li>
                        {status && (
                          <Logout style={"btn-error text-white"}>Logout</Logout>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                {/* end sidebar */}
              </div>
              {/* home logo */}
              <Link
                to={"/"}
                className="logo flex items-center justify-center sm:justify-start font-extrabold text-lg sm:text-3xl"
              >
                <span>SHOP</span>
                <span>.CO</span>
              </Link>
              {/* header navbar */}
              <div className="headerNav md:block hidden  leading-loose">
                <ul className="flex h-full gap-6 items-center">
                  <li className="dropdown">
                    <button
                      tabIndex={0}
                      role="button"
                      className="flex gap-1 items-center"
                    >
                      <span>Shop</span>
                      <span>
                        <IoIosArrowDown />
                      </span>
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-slate-200 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <Link to={"/product/category/male"}>Men's Clothes</Link>
                      </li>
                      <li>
                        <Link to={"/product/category/female"}>
                          Women's Clothes
                        </Link>
                      </li>
                      <li>
                        <Link to={"/product/category/kids"}>
                          Kids Collections
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* <li>
                    <Link to={"/product/category/sale"}>On Sale</Link>
                  </li> */}
                  <li>
                    <Link to={"/product/category/new arrivel"}>
                      New Arrival
                    </Link>
                  </li>
                  {/* <li>
                    <Link to={"/product/category/brands"}>Brands</Link>
                  </li> */}
                </ul>
              </div>
              {/* searchbar */}
              <div className="flex h-full items-center justify-end  basis-2/6">
                <label
                  className="flex  w-24 sm:w-fit justify-end items-center rounded-badge px-2  sm:py-2 bg-gray-200"
                  onClick={() => {
                    if (searchRef?.current) {
                      searchRef?.current?.showModal();
                    } else {
                      return;
                    }
                  }}
                >
                  <span className="flex w-60 gap-2 text-gray-800 bg-gray-100 sm:p-2 p-1 rounded-lg ring-1">
                    <RiSearch2Line size={20} />
                    Search
                  </span>
                </label>
              </div>
              {/* user actions */}
              <div className="userAction w-fit flex gap-3 sm:gap-8 ms-auto px-2 items-center">
                <div className="cart relative">
                  {cartProduct?.products?.length > 0 && (
                    <span className="badge px-1 top-0 left-[100%]">
                      {cartProduct?.products?.length}
                    </span>
                  )}

                  <Link to={"/cart"} className="cart cursor-pointer">
                    <RiShoppingCartLine fontSize={"1.5rem"} />
                  </Link>
                </div>
                {status ? <AuthProfile /> : <GuestProfile />}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* sidebar drawer */}
      {/* search modal */}
      <Modal
        modalRef={searchRef}
        style="bg-white space-y-3 text-center max-w-lg mx-auto"
        className="modal modal-top z-50 "
      >
        <label className="input input-bordered flex items-center bg-transparent gap-2">
          <input
            type="text"
            className="grow"
            value={inputState}
            placeholder="Search"
            onChange={(e) => setInputState(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        {/* <button
          className="btn btn-md btn-neutral my-3 text-white"
          onClick={() => setQuery(query)}
        >
          Search
        </button> */}
        <div className="mt-5">
          {isLoading && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
        </div>

        <List
          data={data?.products || []}
          exstyle="flex flex-nowrap flex-col !gap-2"
          renderItem={(item) => <SearchProductCard product={item} />}
        />
      </Modal>
    </>
  );
};

function AuthProfile() {
  const { userDetails } = useSelector((store) => store.user);
  const [isAdmin, setAdmin] = useState(userDetails?.roles?.includes("ADMIN"));
  return (
    <>
      <div className="profile  cursor-pointer dropdown dropdown-end ">
        <div className="avatar">
          <div className="w-8 rounded-full" tabIndex={0} role="button">
            <img src={userDetails?.imgUrl || ""} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className=" bg-white menu dropdown-content rounded-box z-[5] w-44 p-2 shadow"
        >
          {/* chekc if its admin then show admin dashbroad link */}
          {isAdmin && (
            <li>
              <Link to={"/admin/dash"}>
                <span>
                  <MdOutlineStorage />
                </span>
                Admin
              </Link>
            </li>
          )}

          <li>
            <Link to={"/user"}>
              <span>
                <BsFillPersonVcardFill />
              </span>
              Profile
            </Link>
          </li>
          <li>
            <Link to={"/user/orders"}>
              <span>
                <BsFillCartCheckFill />
              </span>
              Orders
            </Link>
          </li>
          <li>
            <Logout style={"btn-sm btn-error text-white mt-2  "}>
              <span>
                <IoLogOutSharp fontSize={20} />
              </span>
              Logout
            </Logout>
          </li>
        </ul>
      </div>
    </>
  );
}
function GuestProfile() {
  return (
    <div className="profile  cursor-pointer dropdown dropdown-end">
      <RiAccountCircleLine fontSize={"1.5rem"} tabIndex={0} role="button" />
      <ul className=" bg-white menu dropdown-content rounded-box z-[5] w-44 p-2 shadow">
        <li>
          <Link to={"/auth"}>
            <span>
              <SiNextdns />
            </span>
            Sign In
          </Link>
        </li>
        <li>
          <Link to={"/auth/signup"}>
            <span>
              <GiAstronautHelmet />
            </span>
            Sign UP
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Header;
