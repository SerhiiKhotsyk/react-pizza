import { createSlice } from '@reduxjs/toolkit';

// повертає масив піц для однієї сторінки із заданим розміром сторінки
export const getPizzaDataForOnePage = (pizzaData, pageSize, selectedPage) => {
  const startIndexPage = selectedPage * pageSize - pageSize;
  const lastIndexPage = selectedPage * pageSize;
  return pizzaData.slice(startIndexPage, lastIndexPage);
};

const initialState = {
  pizzaPageData: [],
  pageSize: 4,
  activePage: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePizzaPageData: (state, action) => {
      state.pizzaPageData = action.payload;
    },
    updateActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { updatePizzaPageData, updateActivePage } = paginationSlice.actions;

export default paginationSlice.reducer;
