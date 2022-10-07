/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlert, Time } from "../../types/alert";

const initialState: IAlert = {
  time: Time.SHORT,
  message: "",
  link: "",
  linkMessage: "",
  notificationType: "error",
};

export const alertSlice = createSlice({
  name: "SnackBar",
  initialState,
  reducers: {
    setSnackBar: (state, action: PayloadAction<IAlert>) => {
      state.time = action.payload.time;
      state.message = action.payload.message;
      state.link = action.payload.link;
      state.linkMessage = action.payload.linkMessage;
      state.notificationType = action.payload.notificationType;
    },
    resetSnackBar: (state) => {
      state.time = initialState.time;
      state.message = initialState.message;
      state.link = initialState.link;
      state.linkMessage = initialState.linkMessage;
      state.notificationType = initialState.notificationType;
    },
  },
});

const { actions, reducer } = alertSlice;

export const { setSnackBar, resetSnackBar } = actions;

export default reducer;
