import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addPoductToCart } from '../../redux/slices/cartSlice';

const PizzBlock = ({ id, imageUrl, title, types, sizes, price }) => {
  const { typeNames, priceList, products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // задаємо актуальні: розмір, тип і ціну, для кожного нового обєкта, який будемо додавати до кошику
  const [actualPrice, setActualPrice] = useState(price);
  const [actualSize, setActualSize] = useState(26);
  const [actualType, setActualType] = useState(0);
  const [newId, setNewId] = useState(`${id}_size=${26}&_type=${0}`);

  // беремо із стейту к-сть піц певного id (для кнопки "Додати")
  const pizzaCountForCart = products.find((pizzaObj) => pizzaObj.id === newId)?.count || 0;

  // додаємо обєкт піци із визначенними параметрами до кошика (до масиву cart.products)
  const handleAddProduct = () => {
    const item = { id: newId, imageUrl, title, actualType, actualSize, price: actualPrice };
    dispatch(addPoductToCart(item));
  };

  // при зміні розміру піци, встановлюємо відповідні id, ціну та розмір
  const handleActiveSize = (pizzaSize) => {
    // коеф. ціни на піцу в залежності від її розмірів
    const priceCoef = priceList[pizzaSize];

    setNewId(`${id}_size=${pizzaSize}&_type=${actualType}`);
    setActualPrice(Math.ceil(price * priceCoef));
    setActualSize(pizzaSize);
  };

  // при зміні типу тіста піци, встановлюємо відповідні id та тип тіста
  const handleActiveType = (pizzaType) => {
    setNewId(`${id}_size=${actualSize}&_type=${pizzaType}`);
    setActualType(pizzaType);
  };

  return (
    <div className="pizza-block">
      <div className="pizza-block__image-container">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>

      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              key={type}
              className={actualType === type ? 'active' : ''}
              onClick={() => handleActiveType(type)}>
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size) => (
            <li
              key={size}
              className={actualSize === size ? 'active' : ''}
              onClick={() => handleActiveSize(size)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">від {actualPrice} грн</div>
        <button onClick={handleAddProduct} className="button button--outline button--add">
          <FiPlus />
          <span>Додати</span>
          <i>{pizzaCountForCart}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzBlock;
