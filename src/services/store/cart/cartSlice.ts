import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PrivateAxios } from "../../api/api";
import { useGetUserCart } from "../../../querys/cart/cartQuery";
const inital = {
  products: [],
  totalAmount: 0,
};
export const getInitalCart=createAsyncThunk("cart/getInital",async(userId)=>{
  try {
    let {data}=await PrivateAxios.get(`/cart/${userId}`)
    return data?.data
    
  } catch (err) {
    return Promise.reject(err)
    
  }
})
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
      } = action.payload;
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
          { productId, variantId, name, price, quantity, imgurl, size, color },
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
  extraReducers:(builder)=>
    builder.addCase(getInitalCart.fulfilled,(state,action)=>{
      return (state = {
        products:action.payload?.products,
        totalAmount: action.payload?.cartTotal,
      });

    })
    .addCase(getInitalCart.rejected,(state,action)=>{
      return state=inital
    })
    
});

export default cartSlice.reducer;
export const {
  addProduct,
  removeProduct,
  resetCart,
  addQuantity,
  removeQuantity,
} = cartSlice.actions;
