import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://63f888806978b1f9105b784e.mockapi.io/items/')
      .then((resp) => resp.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizzaObj) => <PizzBlock {...pizzaObj} key={pizzaObj.id} />)}
      </div>
    </div>
  );
};

export default Home;
