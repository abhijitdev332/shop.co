import { useEffect, useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import { IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { products, totalAmount } = useSelector((state) => state.cart);
  return (
    <section className="bg-white">
      <div className="wrapper px-2 sm:px-10">
        {/* breadcrumbs */}
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Cart</li>
          </ul>
        </div>
        <h2 className="font-extrabold  text-3xl py-7 ">YOUR CART</h2>
        {/* map products */}
        <div className="flex flex-col md:flex-row  gap-4">
          <div className="flex  w-full flex-col rounded-2xl outline outline-1 p-2 sm:p-4">
            {products?.length > 0 ? (
              products?.map((ele) => (
                <>
                  <CartProduct product={ele} />
                  <div className="divider"></div>
                </>
              ))
            ) : (
              <>
                <CartEmpty />
              </>
            )}
          </div>
          {products?.length > 0 && <CartCheckOut subTotal={totalAmount} />}
        </div>
      </div>
    </section>
  );
};

function CartCheckOut({ subTotal }) {
  const navigate = useNavigate();
  const [discount, setDiscount] = useState<number>(0);
  const [delhivery, setDelivery] = useState<number>(50);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setDiscount(() => {
      let dis = (subTotal * 10) / 100;
      setTotalAmount(Math.floor(subTotal - Math.floor(dis) + delhivery));
      return Math.floor(dis);
    });
  }, [subTotal]);
  return (
    <>
      <div className="checkout basis-1/3 flex flex-col h-fit gap-3 rounded-2xl  outline outline-1 p-4">
        <h4 className="font-medium text-lg capitalize">Order Summary</h4>
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span className="flex font-semibold items-center">
            <PiCurrencyDollarBold />
            <span>{subTotal}</span>
          </span>
        </p>
        <p className="text-red-500 flex justify-between">
          <span>Discount (10%)</span>
          <span className="flex items-center font-semibold">
            -<PiCurrencyDollarBold />
            <span>{discount}</span>
          </span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="flex font-semibold items-center">
            <PiCurrencyDollarBold />
            <span>{delhivery}</span>
          </span>
        </p>

        <div className="divider m-0"></div>
        <p className="flex justify-between font-bold py-3">
          <span>Total</span>
          <span className="flex items-center font-semibold">
            <PiCurrencyDollarBold />
            <span>{totalAmount}</span>
          </span>
        </p>
        <button
          className="btn btn-active rounded-badge mt-auto"
          // onClick={handleCheckout}
          onClick={() =>
            navigate("order", {
              state: { discount, totalAmount, delhivery, subTotal },
            })
          }
        >
          <span className="text-white">Go To Next</span>
          <span className="text-white">
            <IoArrowForward />
          </span>
        </button>
      </div>
    </>
  );
}

function CartEmpty() {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="text-xl font-bold">Cart Empty!!</p>
        <p>Please add Some Products</p>
        <button className="btn btn-neutral text-lg">
          <Link to={"/"} className="text-white">
            Shop
          </Link>
        </button>
      </div>
    </>
  );
}

export default CartPage;
