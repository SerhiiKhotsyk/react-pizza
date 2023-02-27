import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import NotFoundPizza from '../components/NotFoundPizza';
import Pagination from '../components/Pagination';
import PizzBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const { activeCategory, activeSortOption } = useSelector((state) => state.filter);
  const { searchValue } = useSelector((state) => state.search);

  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]); // загальний масив піц
  const [pizzaQuantity, setPizzaQuantity] = useState(0); // загальна к-сть піц

  const [pizzaPage, setPizzaPage] = useState([]); // вибрана сторінка піц (масив піц на одній сторінці)
  const [page, setPage] = useState(1); // номер сторінки
  const pageSize = 8; // к-сть піц на сторінці

  // повертає масив піц для однієї сторінки із заданим розміром сторінки
  const choosePage = (pizzasArr, pageSize, selectedPage) => {
    const startIndexPage = selectedPage * pageSize - pageSize;
    const lastIndexPage = selectedPage * pageSize;
    return pizzasArr.slice(startIndexPage, lastIndexPage);
  };

  // при зміні загального масиву піц або сторінки, встановлюємо новий масив піц для сторінки
  useEffect(() => {
    setPizzaPage(choosePage(pizzas, pageSize, page));
  }, [pizzas, page]);

  // Робимо запит на сервер з відповідними параметрами
  useEffect(() => {
    setIsLoading(true);
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = `&sortBy=${activeSortOption.sortBy}&order=${activeSortOption.order} `;
    const search = searchValue ? `&search=${searchValue}` : '';

    axios(`https://63f888806978b1f9105b784e.mockapi.io/items?${category}${sortBy}${search}`).then(
      (response) => {
        // фильтрація пошуку виконується на стороні фронтенд,
        // якщо масив даних дуже великий, доцільно буде робити фільтрацію на стороні бекенда
        const filtredData = response.data.filter((pizzaObj) =>
          pizzaObj.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        // загальний масив піц
        setPizzas(filtredData);
        // загальна к-сть піц
        setPizzaQuantity(filtredData.length);
        // початкова сторінка
        setPage(1);
        setIsLoading(false);
      },
    );
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
          : pizzaPage.map((pizzaObj) => (
              <PizzBlock {...pizzaObj} key={pizzaObj.id} pizzaQuantity={pizzaQuantity} />
            ))}
      </div>
      {!isLoading && !pizzaPage.length && <NotFoundPizza />}
      {pizzaQuantity >= pageSize && (
        <Pagination pageSize={pageSize} setPage={setPage} pizzaQuantity={pizzaQuantity} />
      )}
    </div>
  );
};

export default Home;
