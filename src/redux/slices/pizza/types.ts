import { PizzaType } from '../pagination/types';

export interface IPizzaState {
  pizzaData: PizzaType[];
  pizzaQuantity: number;
  status: 'pending' | 'fulfilled' | 'error';
}

export type FetchPizzaArgs = Record<string, string>;
