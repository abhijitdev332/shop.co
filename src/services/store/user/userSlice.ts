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
      return { status: true, userDetails: action?.payload };
    },
    removeUser: (state, action) => {
      return inital;
    },
  },
});

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
