import { PizzaType } from '../redux/slices/pagination/types';

// повертає масив піц для однієї сторінки із заданим розміром сторінки
export const getPizzaDataForOnePage = (
  pizzaData: PizzaType[],
  pageSize: number,
  selectedPage: number,
): PizzaType[] => {
  const startIndexPage = selectedPage * pageSize - pageSize;
  const lastIndexPage = selectedPage * pageSize;
  return pizzaData.slice(startIndexPage, lastIndexPage);
};
