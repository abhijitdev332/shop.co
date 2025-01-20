import { useCallback, useEffect, useMemo, useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import { IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { PrivateAxios } from "../../services/api/api";

const CartPage = () => {
  const { products, totalAmount } = useSelector((state) => state.cart);

  // const cartProducts = useMemo(() => {
  //   let products = storeProducts?.map((ele) => {
  //     return cartProductsStore?.productsArr?.includes(ele?.id) ? ele : "";
  //   });
  //   return products.filter((ele) => ele !== "");
  // }, [cartProductsStore]);

  // let findCartProduct = useMemo(() => {
  //   return cartProducts.map((mpele) => {
  //     let cprod = cartProductsStore.products?.find(
  //       (ele) => ele?.productId == mpele?.id
  //     );
  //     return { ...mpele, ...cprod };
  //   });
  // }, [cartProducts]);

  // const totalSubAmount = useMemo(() => {
  //   let sum = findCartProduct?.reduce((acc: number, curr: any) => {
  //     return acc + curr?.price * curr?.quantity;
  //   }, 0);
  //   return sum;
  // }, [findCartProduct]);

  const handleCheckout = async () => {
    let productData = findCartProduct.map((ele) => ({
      name: ele?.title,
      image: ele?.images[0],
      price: ele?.price,
      quantity: ele?.quantity,
    }));
    let delivery = {
      name: "Delihivery Fees",
      price: delhivery,
      quantity: 1,
    };
    let discountCode = {
      code: "Discount10",
      price: discount,
      percent: 10,
    };

    let res = await PrivateAxios.post("/checkout", {
      productData,
      delivery,
      discountCode,
    });
    if (res.status == 200) {
      window.location.href = res.data?.data?.paymentUrl;
    }
  };
  // useEffect(() => {
  //   setDiscount(() => {
  //     let dis = (totalSubAmount * 10) / 100;
  //     setTotalAmount(Math.floor(totalSubAmount - dis + delhivery));
  //     return Math.floor(dis);
  //   });
  // }, [totalSubAmount]);

  return (
    <section className="bg-white">
      <div className="wrapper px-10">
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
          <div className="flex  w-full flex-col rounded-2xl outline outline-1 p-4">
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
  const { products } = useSelector((store) => store.cart);
  const [discount, setDiscount] = useState<number>(0);
  const [delhivery, setDelivery] = useState<number>(50);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleCheckout = async () => {
    let productData = products?.map((ele) => ({
      name: ele?.name,
      image: ele?.imgurl,
      price: ele?.price,
      quantity: ele?.quantity,
    }));
    let delivery = {
      name: "Delihivery Fees",
      price: delhivery,
      quantity: 1,
    };
    let discountCode = {
      code: "Discount10",
      price: discount,
      percent: 10,
    };

    let res = await PrivateAxios.post("/payment/checkout", {
      productData,
      delivery,
      discountCode,
    });
    if (res.status == 200) {
      window.location.href = res.data?.data?.paymentUrl;
    }
  };
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
          onClick={handleCheckout}
        >
          <span className="text-white">Go To Checkout</span>
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
        <p className="text-lg font-medium">Cart Empty</p>
        <p>Please add Some Products</p>
        <button className="btn btn-sm btn-accent">
          <Link to={"/"}>Shop</Link>
        </button>
      </div>
    </>
  );
}

export default CartPage;
