import { PizzaCartType } from '../redux/slices/cart/types';

export type CartLSDataType = {
  products: PizzaCartType[];
  totalProductQuantity: number;
  totalPrice: number;
};

export const getLSCartData = (): CartLSDataType => {
  return {
    products: JSON.parse(window.localStorage.getItem('products') || '[]'),
    totalProductQuantity: JSON.parse(window.localStorage.getItem('totalProductQuantity') || '0'),
    totalPrice: JSON.parse(window.localStorage.getItem('totalPrice') || '0'),
  };
};

export const setLSCartData = (
  products: PizzaCartType[],
  totalProductQuantity: number,
  totalPrice: number,
): void => {
  window.localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  window.localStorage.setItem('totalProductQuantity', JSON.stringify(totalProductQuantity));
  window.localStorage.setItem('products', JSON.stringify(products));
};
