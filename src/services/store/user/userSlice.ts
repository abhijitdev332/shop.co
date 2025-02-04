import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const inital = {
  userDetails: {},
  status: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: inital,
  reducers: {
    setUser: (state, action: PayloadAction) => {
      (state.status = true), (state.userDetails = { ...action?.payload });
    },
    removeUser: (state) => {
      state.status = false;
      state.userDetails = {};
    },
  },
});

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
