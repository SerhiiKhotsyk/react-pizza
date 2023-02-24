import { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Всі', "М'ясні", 'Вегетаріанська', 'Гриль', 'Гострі', 'Закриті'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            className={activeIndex === i ? 'active' : ''}
            onClick={() => setActiveIndex(i)}
            key={value}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
