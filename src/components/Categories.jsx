import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../redux/slices/filterSlice';
import { updateActivePage } from '../redux/slices/paginationSlice';

const Categories = () => {
  const { activeCategory, categories } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleActiveCategory = (categoryIndex) => {
    dispatch(setActiveCategory(categoryIndex));
    dispatch(updateActivePage(1));
  };

  return (
    <div className="categories">
      <ul>
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
