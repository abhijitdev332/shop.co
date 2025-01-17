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
      return (state = { ...state, category: action.payload?.data });
    },
    setSubCategory: (state, action) => {
      return (state = { ...state, subCategory: action.payload?.data });
    },
  },
});

export default categorySlice.reducer;

export const { setCategory, setSubCategory } = categorySlice.actions;
