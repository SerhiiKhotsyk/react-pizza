import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const PizzBlock = ({ imageUrl, title, types, sizes, price }) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const typeNames = ['тонке', 'традиційне'];

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
              className={activeType === type ? 'active' : ''}
              onClick={() => setActiveType(type)}>
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={size}
              className={activeSize === i ? 'active' : ''}
              onClick={() => setActiveSize(i)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">від {price} грн</div>
        <div className="button button--outline button--add">
          <FiPlus />
          <span>Додати</span>
          <i>0</i>
        </div>
      </div>
    </div>
  );
};

export default PizzBlock;
