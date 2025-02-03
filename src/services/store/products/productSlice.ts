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
      return (state = { ...state, topProducts: action?.payload });
    },
    setArivalProducts: (state, action) => {
      return (state = { ...state, arivalsProducts: action?.payload });
    },
    resetProducts: () => {
      return inital;
    },
  },
});

export default productSlice.reducer;
export const { setTopProducts, setArivalProducts } = productSlice.actions;
