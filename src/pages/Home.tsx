import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartButton from '../components/CartButton';
import Categories from '../components/Categories';
import NotFoundPizza from '../components/NotFoundPizza';
import Pagination from '../components/Pagination';
import PizzBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { selectFilter } from '../redux/slices/filter/selectors';
import { selectPagination } from '../redux/slices/pagination/selectors';
import { updatePizzaPageData } from '../redux/slices/pagination/slice';
import { fetchPizza } from '../redux/slices/pizza/asyncFuncs';
import { selectPizzaState } from '../redux/slices/pizza/selectors';
import { selectSearch } from '../redux/slices/search/selectors';
import { useAppDispatch } from '../redux/store';
import { getPizzaDataForOnePage } from '../utils/getPizzaDataForOnePage';

const Home: React.FC = () => {
  const { activeCategory, activeSortOption } = useSelector(selectFilter);
  const { searchValue } = useSelector(selectSearch);
  const { status, pizzaData, pizzaQuantity } = useSelector(selectPizzaState);
  const { pizzaPageData, pageSize, activePage, portionSize } = useSelector(selectPagination);
  const dispatch = useAppDispatch();
  const isLoading: boolean = status === 'pending' ? true : false;

  // при зміні загального масиву піц або сторінки, встановлюємо новий масив піц для цієї сторінки
  useEffect(() => {
    dispatch(updatePizzaPageData(getPizzaDataForOnePage(pizzaData, pageSize, activePage)));
  }, [pizzaData, activePage]);

  // Робимо запит на сервер з відповідними параметрами
  useEffect(() => {
    const category: string = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy: string = `&sortBy=${activeSortOption.sortBy}&order=${activeSortOption.order} `;
    const search: string = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizza({ category, sortBy, search, searchValue }));
  }, [activeCategory, activeSortOption, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzaPageData.map((pizzaObj) => <PizzBlock {...pizzaObj} key={pizzaObj.id} />)}
      </div>
      {!isLoading && !pizzaPageData.length && <NotFoundPizza />}

      <Pagination pageSize={pageSize} pizzaQuantity={pizzaQuantity} portionSize={portionSize} />

      <div className="container__footer">
        <CartButton />
      </div>
    </div>
  );
};

export default Home;
