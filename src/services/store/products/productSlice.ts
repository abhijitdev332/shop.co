import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { product } from "../../../types/product";
const inital = {
  topProducts: [],
  arivalsProducts: [],
};
const productSlice = createSlice({
  name: "products",
  initialState: inital,
  reducers: {
    setTopProducts: (state, action: PayloadAction) => {
      return (state.topProducts = [...action.payload]);
    },
    setArivalProducts: (state, action: PayloadAction) => {
      return (state.arivalsProducts = [...action.payload]);
    },
    resetProducts: () => {
      return inital;
    },
  },
});

export default productSlice.reducer;
export const { setProducts, resetProducts } = productSlice.actions;
