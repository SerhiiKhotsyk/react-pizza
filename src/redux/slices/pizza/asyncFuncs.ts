import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaType } from '../pagination/types';
import { FetchPizzaArgs } from './types';

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params: FetchPizzaArgs) => {
    const { category, sortBy, search, searchValue = '' } = params;
    const response = await axios<PizzaType[]>(
      `https://63f888806978b1f9105b784e.mockapi.io/items?${category}${sortBy}${search}`,
    );
    //   фильтрація пошуку виконується на стороні фронтенд,
    //   якщо масив даних дуже великий, доцільно буде робити фільтрацію на стороні бекенда
    const filtredData = response.data.filter((pizzaObj: any) =>
      pizzaObj.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return filtredData as PizzaType[];
  },
);
