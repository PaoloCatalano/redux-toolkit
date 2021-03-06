# Redux Toolkit

#### Docs

[Redux Toolkit Docs](https://redux-toolkit.js.org/introduction/getting-started)

#### Install Template

```sh
npx create-react-app my-app --template redux
```

- @latest

```sh
npx create-react-app@latest my-app --template redux
```

#### Existing App

```sh
npm install @reduxjs/toolkit react-redux
```

#### @reduxjs/toolkit

consists of few libraries

- redux (core library, state management)
- immer (allows to mutate state)
- redux-thunk (handles async actions)
- reselect (simplifies reducer functions)

#### Extras

- redux devtools
- combine reducers

#### react-redux

connects our app to redux

#### Setup Store

- create store.js

```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});
```

#### Setup Provider

- index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import store and provider
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### Setup Cart Slice

- application feature
- create features folder/cart
- create cartSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
});

console.log(cartSlice);

export default cartSlice.reducer;
```

- store.js

```js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

#### Redux DevTools

- extension

#### Hero Icons

- [Hero Icons](https://heroicons.com/)

```css
nav svg {
  width: 40px;
  color: var(--clr-white);
}
```

#### Setup Cart

- cartSlice.js

```js
import cartItems from "../../cartItems";

const initialState = {
  products: [],
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};
```

#### First Reducer

- cartSlice.js
- Immer library

```js
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { clearCart } = cartSlice.actions;
```

- create action

```js
const ACTION_TYPE = "ACTION_TYPE";

const actionCreator = (payload) => {
  return { type: ACTION_TYPE, payload: payload };
};
```

#### Remove, Increase, Decrease

- cartSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  products: [],
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
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
```

#### modal slice

- create features/modal/modalSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
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
```

#### async functionality with createAsyncThunk

- cartSlice.js

- action type
- callback function
- lifecycle actions

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://e-commerce-tutorial.herokuapp.com/api/v1/products";

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(error));
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
```

#### Options

```sh
npm install axios
```

- cartSlice.js

```js
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
```
