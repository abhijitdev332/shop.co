import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { product } from "../../../types/product";

const productSlice = createSlice({
  name: "products",
  initialState: [] as product[],
  reducers: {
    setProducts: (_, action: PayloadAction<product[]>) => {
      return [...action.payload];
    },
    resetProducts: () => {
      return [];
    },
  },
});

export default productSlice.reducer;
export const { setProducts, resetProducts } = productSlice.actions;
