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
      state = { ...state, category: action.payload?.data };
    },
    setSubCategory: (state, action) => {
      state = { ...state, subCategory: action.payload?.data };
    },
  },
});

export default categorySlice.reducer;

export const { setCategory, setSubCategory } = categorySlice.actions;
