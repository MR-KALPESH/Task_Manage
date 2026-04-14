import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  user: [],
  login: "false",
};

export const UserSlice = createSlice({
  name: "User",
  initialState: intialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    SetLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { SetUser, SetLogin } = UserSlice.actions;
export default UserSlice.reducer;
