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
import { Logout } from "../../components/component";
import { useRef, useState } from "react";
import { MdOutlineStorage } from "react-icons/md";
const Header = () => {
  const cartProduct = useSelector((state) => state.cart);
  const { status } = useSelector((store) => store.user);
  const searchRef = useRef();

  return (
    <>
      <header className="bg-white z-10 sticky top-0">
        <div className="lg:container mx-auto md:px-10">
          <div className="wrapper py-4 px-5 md:px-10">
            <div className="flex gap-3 justify-between">
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
                      <GiHamburgerMenu
                        fontSize={"1.2rem"}
                        className="drawer-button"
                      />
                    </label>
                  </span>

                  <div className="drawer-side z-10">
                    <label
                      htmlFor="my-drawer"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="flex relative h-full flex-col bg-gray-200 w-80 gap-6 items-center py-10 text-lg">
                      <div className="close">
                        <label
                          htmlFor="my-drawer"
                          aria-label="close sidebar"
                          className="drawer-overlay absolute top-5 right-5 bg-orange-400 p-2 rounded-s-btn"
                        >
                          <span>
                            <IoClose />
                          </span>
                        </label>
                      </div>
                      <li>
                        <Link to={"/"}>Home</Link>
                      </li>
                      <li>
                        {/* <button
                          tabIndex={0}
                          role="button"
                          className="flex gap-1 items-center"
                        >
                          <span>Shop</span>
                          <span>
                            <IoIosArrowDown />
                          </span>
                        </button> */}
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
                      <li>
                        <Link to={"/product/category/sale"}>On Sale</Link>
                      </li>
                      <li>
                        <Link to={"/product/category/new arrivel"}>
                          New Arrival
                        </Link>
                      </li>
                      <li>
                        <Link to={"/product/category/brands"}>Brands</Link>
                      </li>

                      <li className="mt-auto">
                        <Logout style={"btn-error text-white"}>Logout</Logout>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* end sidebar */}
              </div>
              {/* home logo */}
              <Link
                to={"/"}
                className="logo flex items-center font-extrabold  text-3xl"
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
                  <li>
                    <Link to={"/product/category/sale"}>On Sale</Link>
                  </li>
                  <li>
                    <Link to={"/product/category/new arrivel"}>
                      New Arrival
                    </Link>
                  </li>
                  <li>
                    <Link to={"/product/category/brands"}>Brands</Link>
                  </li>
                </ul>
              </div>
              {/* searchbar */}
              <div className="searchBar flex items-center justify-end md:justify-center basis-2/6">
                <label className="hidden md:flex items-center rounded-badge px-2 py-2 bg-gray-200 ">
                  <span>
                    <RiSearch2Line />
                  </span>
                  <input
                    id="search"
                    type="text"
                    className="bg-transparent px-2  hidden md:block text-black h-full w-full outline-none"
                  />
                </label>
                <label
                  className="flex md:hidden items-center rounded-badge px-2 py-2 bg-gray-200"
                  onClick={() => {
                    if (searchRef?.current) {
                      searchRef?.current?.showModal();
                    } else {
                      return;
                    }
                  }}
                >
                  <span>
                    <RiSearch2Line />
                  </span>
                </label>
              </div>
              {/* user actions */}
              <div className="userAction flex gap-8 items-end">
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

                {/* <div className="profile cursor-pointer dropdown dropdown-end">
                <RiAccountCircleLine
                  fontSize={"1.5rem"}
                  role="button"
                  className=""
                  tabIndex={0}
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-slate-200 rounded-md z-[1] w-40 p-2 shadow"
                >
                  <li>
                    <Link to={"/auth"}>Login</Link>
                  </li>
                  <li>
                    <Link to={"/auth/signup"}>Sign Up</Link>
                  </li>
                </ul>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* sidebar drawer */}

      {/* search modal */}

      <dialog id="my_modal_2" ref={searchRef} className="modal">
        <div className="modal-box bg-white space-y-3 text-center">
          <label className="input input-bordered flex items-center bg-transparent gap-2">
            <input type="text" className="grow" placeholder="Search" />
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
          <button className="btn btn-md btn-primary">Search</button>
          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p> */}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

function AuthProfile() {
  const { userDetails } = useSelector((store) => store.user);
  const [isAdmin, setAdmin] = useState(userDetails?.roles?.includes("ADMIN"));
  return (
    <>
      <div className="profile cursor-pointer dropdown dropdown-end">
        <RiAccountCircleLine
          fontSize={"1.5rem"}
          role="button"
          className=""
          tabIndex={0}
        />
        <ul
          tabIndex={0}
          className="dropdown-content  menu bg-white  rounded-md z-[1] w-40 p-2 shadow"
        >
          {/* chekc if its admin then show admin dashbroad link */}
          {isAdmin && (
            <li>
              <Link to={"/admin"}>
                <span>
                  <MdOutlineStorage />
                </span>
                Admin
              </Link>
            </li>
          )}

          <li>
            <Link to={"/user/profile"}>
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
    <div className="profile cursor-pointer dropdown dropdown-end">
      <RiAccountCircleLine
        fontSize={"1.5rem"}
        role="button"
        className=""
        tabIndex={0}
      />
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-white text-white rounded-md z-[1] w-40 p-2 shadow"
      >
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
