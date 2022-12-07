import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://e-commerce-tutorial.onrender.com/api/v1/products";

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const initialState = {
  products: [],
  isLoading: true,
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      // return initialState
    },
    removeItem: (state, action) => {
      const itemId = action.payload;

      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item._id === payload._id);
      cartItem.inventory = cartItem.inventory + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item._id === payload._id);
      cartItem.inventory = cartItem.inventory - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.inventory;
        total += item.inventory * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
    addItem: (state, { payload }) => {
      const item = state.products.find((item) => item._id === payload._id);

      const check = state.cartItems.every((item) => {
        return item._id !== payload._id;
      });

      if (check) state.cartItems.push(item);
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  addItem,
} = cartSlice.actions;

export default cartSlice.reducer;
