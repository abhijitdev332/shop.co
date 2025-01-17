import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const inital = {
  topProducts: [],
  arivalsProducts: [],
};
const productSlice = createSlice({
  name: "products",
  initialState: inital,
  reducers: {
    setTopProducts: (state, action) => {
      state = { ...state, topProducts: action?.payload?.data };
    },
    setArivalProducts: (state, action) => {
      state = { ...state, arivalsProducts: action?.payload?.data };
    },
    resetProducts: () => {
      return inital;
    },
  },
});

export default productSlice.reducer;
export const { setTopProducts, setArivalProducts } = productSlice.actions;
