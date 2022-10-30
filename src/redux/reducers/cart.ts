/* eslint-disable no-param-reassign */
import { ICartItem, ICartRedux } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICartRedux = {
  games: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ICartItem>) => {
      state.games = [...state.games, action.payload];
    },
    changeCart: (state, action: PayloadAction<ICartRedux["games"]>) => {
      state.games = action.payload;
    },
  },
});

const { actions, reducer } = cartSlice;

export const { addCart, changeCart } = actions;

export default reducer;
