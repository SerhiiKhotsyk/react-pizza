import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSortOption, setActiveSortOption] = useState({
    name: 'популярностю',
    sortBy: 'rating',
    order: 'asc',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);
  const { searchValue } = useContext(SearchContext);

  // let onPageChanged = (page) => {
  //   setIsLoading(true);
  //   const category = activeCategory > 0 ? `category=${activeCategory}` : '';
  //   const sortBy = `&sortBy=${activeSortOption.sortBy}&order=${activeSortOption.order} `;
  //   const selectedPage = `&p=${page}`;

  //   fetch(
  //     `https://63f888806978b1f9105b784e.mockapi.io/items?${category}${sortBy}${selectedPage}&l=4`,
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setPizzas(data);
  //       setIsLoading(false);
  //     });
  // };

  useEffect(() => {
    setIsLoading(true);
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = `&sortBy=${activeSortOption.sortBy}&order=${activeSortOption.order} `;

    fetch(`https://63f888806978b1f9105b784e.mockapi.io/items?${category}&${sortBy}`)
      .then((resp) => resp.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
  }, [activeCategory, activeSortOption]);

  // useEffect(() => {
  //   onPageChanged(1);
  // }, [activeCategory, activeSortOption]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <Sort activeSortOption={activeSortOption} setActiveSortOption={setActiveSortOption} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzas
              .filter((pizzaObj) =>
                pizzaObj.title.toLowerCase().includes(searchValue.toLowerCase()),
              )
              .map((pizzaObj) => <PizzBlock {...pizzaObj} key={pizzaObj.id} />)}
      </div>
      {/* <Pagination onPageChanged={onPageChanged} /> */}
    </div>
  );
};

export default Home;
