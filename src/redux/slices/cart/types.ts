export type PriceListType = { '26': number; '30': number; '40': number };

export interface ICartState {
  products: PizzaCartType[];
  totalProductQuantity: number;
  totalPrice: number;
  typeNames: string[];
  priceList: PriceListType;
}

export type PizzaCartType = {
  id: string;
  imageUrl: string;
  title: string;
  actualType: number;
  actualSize: number;
  price: number;
  count?: number;
};
