/* eslint-disable no-param-reassign */
import { IAdminRedux } from "@/types/admin";
import { IGameData } from "@/types/mockStore";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAdminRedux = {
  editCard: {
    id: 0,
    name: "",
    age: "",
    rating: 0,
    price: "",
    genre: "",
    permission: [],
    route: "",
    descriptionBack: "",
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    editCard: (state, action: PayloadAction<IGameData>) => {
      state.editCard = action.payload;
    },
    clearCard: (state) => {
      state.editCard = initialState.editCard;
    },
  },
});

const { actions, reducer } = adminSlice;

export const { editCard, clearCard } = actions;

export default reducer;
