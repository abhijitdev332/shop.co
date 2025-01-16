import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type CartProduct = {
  productId: string;
  size: string;
  quantity: number;
};
interface CartStateI {
  productsArr: [];
  products: CartProduct[];
  totalAmount: number;
}
const cartState: CartStateI = {
  productsArr: [],
  products: [],
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartProduct>) => {
      let product = {
        ...action.payload,
      };
      state.productsArr = [...state.productsArr, product.productId];
      state.products = [...state.products, product];
    },
    removeProduct: (state, action: PayloadAction<CartProduct["productId"]>) => {
      let productInx = state.products.findIndex(
        (ele: CartProduct) => ele?.productId == action.payload
      );

      let fillterData = state.productsArr.filter(
        (ele) => ele !== action.payload
      );
      state.productsArr = [...fillterData];
      state.products.splice(productInx, 1);
    },
    addQuantity: (state, action: PayloadAction<CartProduct["productId"]>) => {
      let product = state.products.find(
        (ele) => ele.productId == action.payload
      );
      let productInx = state.products.findIndex(
        (ele) => ele.productId == action.payload
      );
      let quantity = product?.quantity + 1;

      state.products.splice(productInx, 1, {
        ...product,
        quantity: quantity,
      });
    },
    removeQuantity: (
      state,
      action: PayloadAction<CartProduct["productId"]>
    ) => {
      let product = state.products.find(
        (ele) => ele.productId == action.payload
      );
      let productInx = state.products.findIndex(
        (ele) => ele.productId == action.payload
      );
      let quantity = product?.quantity - 1;

      state.products.splice(productInx, 1, {
        ...product,
        quantity: quantity,
      });
    },
    resetCart: () => {
      return cartState;
    },
  },
});

export default cartSlice.reducer;
export const {
  addProduct,
  removeProduct,
  resetCart,
  addQuantity,
  removeQuantity,
} = cartSlice.actions;
