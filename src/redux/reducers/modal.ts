/* eslint-disable no-param-reassign */
import { IModalRedux } from "@/types/modal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IModalRedux = {
  active: false,
  type: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeModalActive: (state, action: PayloadAction<IModalRedux["active"]>) => {
      state.active = action.payload;
    },
    changeModalType: (state, action: PayloadAction<IModalRedux["type"]>) => {
      state.type = action.payload;
    },
  },
});

const { actions, reducer } = modalSlice;

export const { changeModalActive, changeModalType } = actions;

export default reducer;
