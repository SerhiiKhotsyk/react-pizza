import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../redux/slices/filterSlice';

const Categories = () => {
  const { activeCategory, categories } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            className={activeCategory === i ? 'active' : ''}
            onClick={() => dispatch(setActiveCategory(i))}
            key={value}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
