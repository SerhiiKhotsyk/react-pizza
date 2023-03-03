import { createSlice } from '@reduxjs/toolkit';
import { fetchPizza } from './asyncFuncs';
import { IPizzaState } from './types';

const initialState: IPizzaState = {
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

export default pizzaSlice.reducer;
