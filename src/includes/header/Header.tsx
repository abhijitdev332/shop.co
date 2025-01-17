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
import { IoLogOutSharp } from "react-icons/io5";
import { Logout } from "../../components/component";
const Header = () => {
  const cartProduct = useSelector((state) => state.cart);
  const { status } = useSelector((store) => store.user);

  return (
    <header className="bg-white z-10 sticky top-0">
      <div className="lg:container mx-auto md:px-10">
        <div className="wrapper py-4 px-5 md:px-10">
          <div className="flex gap-3 justify-between">
            <div className="ham md:hidden flex items-center  cursor-pointer">
              <GiHamburgerMenu fontSize={"1.2rem"} />
            </div>
            <Link
              to={"/"}
              className="logo flex items-center font-extrabold  text-3xl"
            >
              <span>SHOP</span>
              <span>.CO</span>
            </Link>
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
                  <Link to={"/product/category/new arrivel"}>New Arrival</Link>
                </li>
                <li>
                  <Link to={"/product/category/brands"}>Brands</Link>
                </li>
              </ul>
            </div>
            <div className="searchBar flex items-center justify-end md:justify-center basis-2/6">
              <label className="flex  items-center rounded-badge px-2 py-2 bg-gray-200 ">
                <span>
                  <RiSearch2Line />
                </span>
                <input
                  id="search"
                  type="text"
                  className="bg-transparent px-2  hidden md:block text-black h-full w-full outline-none"
                />
              </label>
            </div>
            <div className="userAction flex gap-8 items-end">
              <div className="cart relative">
                <span className="badge px-1 top-0 left-[100%]">
                  {cartProduct?.productsArr?.length}
                </span>
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
  );
};

function AuthProfile() {
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
