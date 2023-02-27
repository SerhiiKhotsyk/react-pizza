import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const { activeCategory, activeSortOption } = useSelector((state) => state.filter);
  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);
  const { searchValue } = useSelector((state) => state.search);

  // let onPageChanged = (page) => {
  //   setIsLoading(true);
  //   const category = activeCategory > 0 ? `category=${activeCategory}` : '';
  //   const sortBy = `&sortBy=${activeSortOption.sortBy}&order=${activeSortOption.order} `;
  //   const search = searchValue ? `&search=${searchValue}` : '';
  //   const selectedPage = `&p=${page}&l=4`;

  //   axios(
  //     `https://63f888806978b1f9105b784e.mockapi.io/items?${category}${sortBy}${search}${selectedPage}`,
  //   ).then((response) => {
  //     // фильтрація пошуку виконується на стороні фронтенд,
  //     // якщо масив даних дуже великий, доцільно буде робити фільтрацію на стороні бекенда
  //     const filtredData = response.data.filter((pizzaObj) =>
  //       pizzaObj.title.toLowerCase().includes(searchValue.toLowerCase()),
  //     );
  //     setPizzas(response.data);
  //     setIsLoading(false);
  //     console.log(filtredData);
  //   });
  // };
  // useEffect(() => {
  //   onPageChanged(1);
  // }, [activeCategory, activeSortOption, searchValue]);

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
        setPizzas(filtredData);
        setIsLoading(false);
        console.log(filtredData);
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
          : pizzas.map((pizzaObj) => <PizzBlock {...pizzaObj} key={pizzaObj.id} />)}
      </div>
      {/* <Pagination onPageChanged={onPageChanged} /> */}
    </div>
  );
};

export default Home;
