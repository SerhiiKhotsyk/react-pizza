import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../redux/slices/filterSlice';
import { updateActivePage } from '../redux/slices/paginationSlice';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

const Categories = () => {
  const { activeCategory, categories } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleActiveCategory = (categoryIndex) => {
    dispatch(setActiveCategory(categoryIndex));
    dispatch(updateActivePage(1));
  };

  return (
    <div className="categories">
      <div className="categories__option" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />} <span>Вибрати категорію</span>
      </div>
      <ul className={isOpen ? 'active-list' : 'hidden-list'}>
        {categories.map((value, i) => (
          <li
            className={activeCategory === i ? 'active' : ''}
            onClick={() => handleActiveCategory(i)}
            key={value}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
