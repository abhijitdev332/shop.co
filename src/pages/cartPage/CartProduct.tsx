import { useCallback, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantity,
  removeProduct,
  removeQuantity,
} from "../../services/store/cart/cartSlice";
import cl from "classnames";
import { RemoveFromCartMutaion } from "../../querys/cart/cartQuery";
import { toast } from "react-toastify";
import { LoaderBtn } from "../../components/component";
import { Link } from "react-router-dom";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { userDetails, status } = useSelector((store) => store.user);
  const removeProductMutaion = RemoveFromCartMutaion();
  const [quantity, setQuantity] = useState(product?.quantity || 1);
  // handlers
  const addQuantityClick = () => {
    if (quantity >= product?.stock) {
      return toast.info(`Only ${product?.stock} stock Available!!`);
    }
    setQuantity((prev) => prev + 1);
    dispatch(addQuantity(product?.productId));
  };
  const minusQuantityClick = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
    dispatch(removeQuantity(product?.productId));
  };
  const handleProductRemove = useCallback(() => {
    if (!status) {
      return dispatch(removeProduct(product?.productId));
    }
    removeProductMutaion.mutate({
      userId: userDetails?._id,
      data: { productId: product?.productId, variantId: product?.variantId },
    });
    dispatch(removeProduct(product?.productId));
  }, [product]);

  return (
    <div>
      <div className="wrapper">
        <div className="flex flex-col  gap-3 sm:gap-0 sm:flex-row text-black">
          <Link to={`/product/${product?.productId}`} className="size-auto">
            <img
              src={product?.imgurl}
              alt="products image"
              className="sm:w-24 sm:h-24 w-36 h-36 self-center   rounded-lg"
            />
          </Link>
          <div className="flex flex-col px-3">
            <h4 className="font-semibold text-sm sm:text-xl capitalize">
              {product?.name}
            </h4>
            <p>
              <span className="font-medium">Size:</span>
              <span className=" text-xs sm:text-sm">{product?.size}</span>
            </p>
            <p className="inline-flex items-center gap-1">
              <span className="font-medium">Color:</span>
              <button
                className={cl(
                  "flex gap-1 items-center outline p-1 rounded-btn brightness-50	transition-all",
                  "outline-1"
                )}
              >
                <span
                  style={{ background: product?.color }}
                  className={` rounded-full p-2 sm:p-3`}
                ></span>
                <span className="capitalize text-xs sm:text-base">
                  {product?.color}
                </span>
              </button>
            </p>
            <p className="flex gap-0  items-center">
              <span>
                <PiCurrencyDollarBold fontSize={"1.2rem"} />
              </span>
              <span className="text-xl font-bold">{product?.price}</span>
            </p>
          </div>
          <div className="flex sm:flex-col gap-3 justify-between ms-auto">
            <LoaderBtn
              pending={removeProductMutaion.isPending}
              handleClick={handleProductRemove}
              className="sm:self-end order-2 sm:order-1 btn btn-ghost rounded-full hover:bg-gray-200"
            >
              <span>
                <RiDeleteBin6Fill color="red" fontSize={"1.3rem"} />
              </span>
            </LoaderBtn>

            <div className=" flex items-center justify-end gap-4 py-2 w-32">
              <button
                className=" bg-slate-900 p-2 text-white rounded-full"
                onClick={minusQuantityClick}
              >
                <FaMinus />
              </button>
              <p>{quantity}</p>
              <button
                className=" bg-slate-900 p-2 text-white rounded-full"
                onClick={addQuantityClick}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
