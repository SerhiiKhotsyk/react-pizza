import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartButton from '../components/CartButton';
import Categories from '../components/Categories';
import NotFoundPizza from '../components/NotFoundPizza';
import Pagination from '../components/Pagination';
import PizzBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { getPizzaDataForOnePage, updatePizzaPageData } from '../redux/slices/paginationSlice';
import { fetchPizza } from '../redux/slices/pizzaSlice';

const Home = () => {
  const { activeCategory, activeSortOption } = useSelector((state) => state.filter);
  const { searchValue } = useSelector((state) => state.search);
  const { status, pizzaData, pizzaQuantity } = useSelector((state) => state.pizza);
  const { pizzaPageData, pageSize, activePage } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();
  const isLoading = status === 'pending' ? true : false;

  // при зміні загального масиву піц або сторінки, встановлюємо новий масив піц для цієї сторінки
  useEffect(() => {
    dispatch(updatePizzaPageData(getPizzaDataForOnePage(pizzaData, pageSize, activePage)));
  }, [pizzaData, activePage]);

  // Робимо запит на сервер з відповідними параметрами
  useEffect(() => {
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = `&sortBy=${activeSortOption.sortBy}&order=${activeSortOption.order} `;
    const search = searchValue ? `&search=${searchValue}` : '';

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

      <Pagination pageSize={pageSize} pizzaQuantity={pizzaQuantity} />

      <div className="container__footer">
        <CartButton />
      </div>
    </div>
  );
};

export default Home;
