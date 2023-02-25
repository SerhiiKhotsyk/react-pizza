import { useState } from 'react';

const Categories = ({ activeCategory, setActiveCategory }) => {
  // const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Всі', "М'ясні", 'Вегетаріанська', 'Гриль', 'Гострі', 'Закриті'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            className={activeCategory === i ? 'active' : ''}
            onClick={() => setActiveCategory(i)}
            key={value}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
