import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/slice';
import search from './slices/search/slice';
import pizza from './slices/pizza/slice';
import pagination from './slices/pagination/slice';
import cart from './slices/cart/slice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    filter,
    search,
    pizza,
    pagination,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
