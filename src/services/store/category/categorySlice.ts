import { createSlice } from "@reduxjs/toolkit";
const inital = {
  category: [],
  subCategory: [],
  loading: false,
};
const categorySlice = createSlice({
  name: "category",
  initialState: inital,
  reducers: {
    setCategoryData: (state, action) => {
      state.category = action.payload?.category || [];
      state.subCategory = action.payload?.subCategory || [];
    },
    setCategory: (state, action) => {
      state.category = action.payload ?? [];
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload ?? [];
    },
  },
});

export default categorySlice.reducer;

export const { setCategory, setSubCategory, setCategoryData } =
  categorySlice.actions;
