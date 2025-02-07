import { createSlice } from "@reduxjs/toolkit";
const inital = {
  topProducts: [],
  arivalsProducts: [],
};
const productSlice = createSlice({
  name: "products",
  initialState: inital,
  reducers: {
    setTopProducts: (state, action) => {
      state.topProducts = action?.payload;
    },
    setArivalProducts: (state, action) => {
      state.arivalsProducts = action?.payload;
    },
    setAllProducts: (state, action) => {
      state.arivalsProducts = action.payload?.arival || [];
      state.topProducts = action.payload?.top || [];
    },
    resetProducts: (state) => {
      state.arivalsProducts = [];
      state.topProducts = [];
    },
  },
});

export default productSlice.reducer;
export const {
  setTopProducts,
  setArivalProducts,
  setAllProducts,
  resetProducts,
} = productSlice.actions;
