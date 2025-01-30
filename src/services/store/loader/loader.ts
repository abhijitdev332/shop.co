import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: false,
  reducers: {
    setLoading: () => {
      return true;
    },
    removeLoading: () => {
      return false;
    },
  },
});

export default loaderSlice.reducer;
export const { setLoading, removeLoading } = loaderSlice.actions;
