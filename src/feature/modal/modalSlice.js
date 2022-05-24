import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isCartOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { openModal, closeModal, openCart, closeCart } =
  modalSlice.actions;
export default modalSlice.reducer;
