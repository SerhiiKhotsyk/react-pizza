import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  totalProductQuantity: 0,
  totalPrice: 0,
  typeNames: ['тонке', 'традиційне'],
  priceList: { 26: 1, 30: 1.3, 40: 1.9 },
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
      state.totalPrice += action.payload.price;
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
        state.totalPrice -= action.payload.price;
        state.totalProductQuantity -= 1;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.totalProductQuantity = 0;
    },
    clearCartProduct: (state, action) => {
      const findItem = state.products.find((obj) => obj.id === action.payload.id);
      state.totalPrice = state.totalPrice - findItem.price * findItem.count;
      state.totalProductQuantity = state.totalProductQuantity - findItem.count;
      state.products = state.products.filter((obj) => obj.id !== findItem.id);
    },
    updateCartState: (state, action) => {
      state.products = action.payload.products;
      state.totalProductQuantity = action.payload.totalProductQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { addPoductToCart, remouveCartProduct, clearCart, clearCartProduct, updateCartState } =
  cartSlice.actions;

export default cartSlice.reducer;
