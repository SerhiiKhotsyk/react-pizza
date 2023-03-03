export type PizzaType = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

export interface IPaginationState {
  pizzaPageData: PizzaType[];
  pageSize: number;
  activePage: number;
  portionSize: number;
}
