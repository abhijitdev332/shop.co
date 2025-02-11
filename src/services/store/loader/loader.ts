import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    status: false,
  },
  reducers: {
    setLoading: (state) => {
      state.status = true;
    },
    removeLoading: (state) => {
      state.status = false;
    },
  },
});

export default loaderSlice.reducer;
export const { setLoading, removeLoading } = loaderSlice.actions;
