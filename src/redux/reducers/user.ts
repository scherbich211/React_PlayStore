/* eslint-disable no-param-reassign */
import { IUserRedux } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserRedux = {
  isSignedIn: false,
  user: {
    id: -1,
    login: "",
    password: "",
    description: "",
    profileImage: "",
    balance: "0",
  },
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserIsSignedIn: (state, action: PayloadAction<IUserRedux["isSignedIn"]>) => {
      state.isSignedIn = action.payload;
    },
    changeUser: (state, action: PayloadAction<IUserRedux["user"]>) => {
      state.user = action.payload;
    },
    changeAdmin: (state, action: PayloadAction<IUserRedux["isAdmin"]>) => {
      state.isAdmin = action.payload;
    },
    changeLogOut: (state) => {
      state.user = initialState.user;
      state.isSignedIn = initialState.isSignedIn;
      state.isAdmin = initialState.isSignedIn;
    },
  },
});

const { actions, reducer } = userSlice;

export const { changeUserIsSignedIn, changeUser, changeLogOut, changeAdmin } = actions;

export default reducer;
