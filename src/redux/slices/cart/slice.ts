import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartLSDataType } from '../../../utils/localStorageRequest';
import { ICartState, PizzaCartType } from './types';

const initialState: ICartState = {
  products: [],
  totalProductQuantity: 0,
  totalPrice: 0,
  typeNames: ['тонке', 'традиційне'],
  priceList: { '26': 1, '30': 1.2, '40': 1.8 },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPoductToCart: (state, action: PayloadAction<PizzaCartType>) => {
      const findItem = state.products.find((obj) => obj.id === action.payload.id);
      if (findItem?.count) {
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
    remouveCartProduct: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const findItem = state.products.find((obj) => obj.id === action.payload.id);
      if (findItem?.count && findItem?.count > 1) {
        findItem.count--;
      } else if (findItem?.count && findItem?.count <= 1) {
        state.products = state.products.filter((obj) => obj.id !== findItem.id);
      }
      if (findItem?.count && findItem?.count > 0) {
        state.totalPrice -= action.payload.price;
        state.totalProductQuantity -= 1;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.totalProductQuantity = 0;
    },
    clearCartProduct: (state, action: PayloadAction<string>) => {
      const findItem = state.products.find((obj) => obj.id === action.payload);
      if (findItem?.count) {
        state.totalPrice = state.totalPrice - findItem.price * findItem.count;
        state.totalProductQuantity = state.totalProductQuantity - findItem.count;
        state.products = state.products.filter((obj) => obj.id !== findItem.id);
      }
    },
    updateCartState: (state, action: PayloadAction<CartLSDataType>) => {
      state.products = action.payload.products;
      state.totalProductQuantity = action.payload.totalProductQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { addPoductToCart, remouveCartProduct, clearCart, clearCartProduct, updateCartState } =
  cartSlice.actions;

export default cartSlice.reducer;
