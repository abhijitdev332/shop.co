import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PrivateAxios } from "../../api/api";
const inital = {
  products: [],
  totalAmount: 0,
};
export const getInitalCart = createAsyncThunk(
  "cart/getInital",
  async (userId) => {
    try {
      let { data } = await PrivateAxios.get(`/cart/${userId}`);
      return data?.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: inital,
  reducers: {
    addProduct: (state, action) => {
      const {
        productId,
        variantId,
        name,
        price,
        quantity = 1,
        imgurl,
        size,
        color,
        stock,
      } = action.payload;
      if (!Array.isArray(state.products)) {
        state.products = [];
      }
      const updatedProducts = [
        ...state.products,
        {
          productId,
          variantId,
          name,
          price,
          quantity,
          imgurl,
          size,
          color,
          stock,
        },
      ];
      let totalAmount = updatedProducts?.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity;
      }, 0);
      state.products = updatedProducts;
      state.totalAmount = totalAmount;
    },
    removeProduct: (state, action) => {
      let fillterData = state.products?.filter(
        (ele) => ele?.productId !== action.payload
      );
      let totalAmount = fillterData?.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity;
      }, 0);
      state.products = fillterData;
      state.totalAmount = totalAmount;
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
        return prev + curr.price * curr.quantity;
      }, 0);
      state.totalAmount = totalAmount;
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
        return prev + curr.price * curr.quantity;
      }, 0);
      state.totalAmount = totalAmount;
    },
    resetCart: () => {
      return inital;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getInitalCart.fulfilled, (state, action) => {
        state.products = action.payload?.products;
        state.totalAmount = action.payload?.cartTotal;
      })
      .addCase(getInitalCart.rejected, (state, action) => {
        state = inital;
      }),
});

export default cartSlice.reducer;
export const {
  addProduct,
  removeProduct,
  resetCart,
  addQuantity,
  removeQuantity,
} = cartSlice.actions;
