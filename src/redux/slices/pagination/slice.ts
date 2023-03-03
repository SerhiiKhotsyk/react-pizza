import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPaginationState, PizzaType } from './types';

const initialState: IPaginationState = {
  pizzaPageData: [],
  activePage: 1,
  pageSize: 4,
  portionSize: 5,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePizzaPageData: (state, action: PayloadAction<PizzaType[]>) => {
      state.pizzaPageData = action.payload;
    },
    updateActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
  },
});

export const { updatePizzaPageData, updateActivePage } = paginationSlice.actions;

export default paginationSlice.reducer;
