import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import search from './slices/searchSlice';
import pizza from './slices/pizzaSlice';
import pagination from './slices/paginationSlice';
import cart from './slices/cartSlice';

const store = configureStore({
  reducer: {
    filter,
    search,
    pizza,
    pagination,
    cart,
  },
});

export default store;
