import { createSlice } from "@reduxjs/toolkit";
const inital = {
  category: [],
  subCategory: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState: inital,
  reducers: {
    setCategory: (state, action) => {
      state.category = [...action.payload];
    },
    setSubCategory: (state, action) => {
      state.subCategory = [...action.payload];
    },
  },
});

export default categorySlice.reducer;

export const { setCategory, setSubCategory } = categorySlice.actions;
