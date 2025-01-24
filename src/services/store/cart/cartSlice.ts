import { createSlice } from "@reduxjs/toolkit";
const inital = {
  products: [],
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: inital,
  reducers: {
    addProduct: (state, action) => {
      const { productId, name, price, quantity = 1, imgurl,size ,color} = action.payload;
      let totalAmount = [
        ...state.products,
        { productId, price, quantity },
      ].reduce((prev, curr) => {
        let productCost = curr.price * curr.quantity;
        return (prev = prev + productCost);
      }, 0);
      return (state = {
        products: [
          ...state.products,
          { productId, name, price, quantity, imgurl,size ,color},
        ],
        totalAmount: totalAmount,
      });
    },
    removeProduct: (state, action) => {
      // let productInx = state.products.findIndex(
      //   (ele) => ele?.productId == action.payload
      // );

      let fillterData = state.products?.filter(
        (ele) => ele?.productId !== action.payload
      );
      let totalAmount = fillterData?.reduce((prev, curr) => {
        let productCost = curr.price * curr.quantity;
        return (prev = prev + productCost);
      }, 0);
      return (state = { products: [...fillterData], totalAmount: totalAmount });
    },
    addQuantity: (state, action) => {
      let product = state.products.find(
        (ele) => ele.productId == action.payload
      );
      let productInx = state.products.findIndex(
        (ele) => ele.productId == action.payload
      );
      let quantity = product?.quantity + 1;
      state.products?.splice(productInx, 1, {
        ...product,
        quantity: quantity,
      });

      let totalAmount = state.products?.reduce((prev, curr) => {
        let productCost = curr.price * curr.quantity;
        return (prev = prev + productCost);
      }, 0);
      state.totalAmount = totalAmount;
      return state;
    },
    removeQuantity: (state, action) => {
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
      let totalAmount = state.products?.reduce((prev, curr) => {
        let productCost = curr.price * curr.quantity;
        return (prev = prev + productCost);
      }, 0);
      state.totalAmount = totalAmount;
    },
    resetCart: () => {
      return inital;
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
