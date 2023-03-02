import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: ['Всі', "М'ясні", 'Вегетаріанська', 'Гриль', 'Гострі', 'Закриті'],
  activeCategory: 0,
  activeSortOption: {
    name: 'популярностю',
    sortBy: 'rating',
    order: 'asc',
  },
  sortList: [
    { name: 'популярностю', sortBy: 'rating', order: 'desc' },
    { name: 'ціною (найдешевші спочатку)', sortBy: 'price', order: 'asc' },
    { name: 'ціною (найдорожчі спочатку)', sortBy: 'price', order: 'desc' },
    { name: 'алфавітом', sortBy: 'title', order: 'asc' },
  ],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveSortOption(state, action) {
      state.activeSortOption = action.payload;
    },
  },
});

export const { setActiveCategory, setActiveSortOption } = filterSlice.actions;

export default filterSlice.reducer;
