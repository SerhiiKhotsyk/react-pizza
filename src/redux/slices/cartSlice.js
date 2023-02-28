import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  totalProductQuantity: 0,
  totaPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPoductToCart: (state, action) => {
      const findItem = state.products.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totaPrice += action.payload.price;
      state.totalProductQuantity += 1;
    },
    remouveCartProduct: (state, action) => {
      const findItem = state.products.find((obj) => obj.id === action.payload.id);
      if (findItem?.count > 1) {
        findItem.count--;
      } else if (findItem?.count <= 1) {
        state.products = state.products.filter((obj) => obj.id !== findItem.id);
      }
      if (findItem?.count > 0) {
        state.totaPrice -= action.payload.price;
        state.totalProductQuantity -= 1;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totaPrice = 0;
      state.totalProductQuantity = 0;
    },
    clearCartProduct: (state, action) => {
      const findItem = state.products.find((obj) => obj.id === action.payload.id);
      state.totaPrice = state.totaPrice - findItem.price * findItem.count;
      state.totalProductQuantity = state.totalProductQuantity - findItem.count;
      state.products = state.products.filter((obj) => obj.id !== findItem.id);
    },
  },
});

export const { addPoductToCart, remouveCartProduct, clearCart, clearCartProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
