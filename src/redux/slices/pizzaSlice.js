import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
  const { category, sortBy, search, searchValue = '' } = params;
  const response = await axios(
    `https://63f888806978b1f9105b784e.mockapi.io/items?${category}${sortBy}${search}`,
  );
  //   фильтрація пошуку виконується на стороні фронтенд,
  //   якщо масив даних дуже великий, доцільно буде робити фільтрацію на стороні бекенда
  const filtredData = response.data.filter((pizzaObj) =>
    pizzaObj.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
  return filtredData;
});

const initialState = {
  pizzaData: [],
  pizzaQuantity: 0,
  status: 'pending',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = 'pending';
      state.pizzaData = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.pizzaData = action.payload;
      state.pizzaQuantity = action.payload.length;
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = 'error';
      console.log('ошибка запроса на сервер');
      state.pizzaData = [];
    });
  },
});

export const { updatePizzaData } = pizzaSlice.actions;

export default pizzaSlice.reducer;
