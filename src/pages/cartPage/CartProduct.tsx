import React, { useCallback, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantity,
  removeProduct,
  removeQuantity,
} from "../../services/store/cart/cartSlice";
import cl from "classnames";

const CartProduct = ({ product }) => {
  const cart = useSelector((store) => store.cart);
  const [quantity, setQuantity] = useState<number>(product?.quantity || 1);
  const dispatch = useDispatch();
  const addQuantityClick = () => {
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
    dispatch(removeProduct(product?.productId));
  }, [product]);

  return (
    <div>
      <div className="wrapper">
        <div className="flex text-black">
          <img
            src={product?.imgurl}
            alt="products image"
            className="w-24 h-24  rounded-lg"
          />
          <div className="flex flex-col px-3">
            <h4 className="font-semibold text-xl capitalize">
              {product?.name}
            </h4>
            <p>
              <span className="font-medium">Size:</span>
              <span className="text-sm">{product?.size}</span>
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
                  className={` rounded-full p-3`}
                ></span>
                <span className="capitalize">{product?.color}</span>
              </button>
            </p>
            <p className="flex gap-0  items-center">
              <span>
                <PiCurrencyDollarBold fontSize={"1.2rem"} />
              </span>
              <span className="text-xl font-bold">{product?.price}</span>
            </p>
          </div>
          <div className="flex flex-col justify-between ms-auto">
            <button
              className="self-end btn btn-ghost rounded-full hover:bg-gray-200"
              onClick={handleProductRemove}
            >
              <span>
                <RiDeleteBin6Fill color="red" fontSize={"1.3rem"} />
              </span>
            </button>

            <div className="btn btn-ghost shadow bg-gray-200 flex gap-4 py-2 w-32  rounded-badge">
              <button onClick={minusQuantityClick}>
                <FaMinus />
              </button>
              <p>{quantity}</p>
              <button onClick={addQuantityClick}>
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
