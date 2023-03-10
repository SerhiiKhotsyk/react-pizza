import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../redux/slices/filter/selectors';
import { setActiveSortOption } from '../redux/slices/filter/slice';
import { SortListType } from '../redux/slices/filter/types';
import { updateActivePage } from '../redux/slices/pagination/slice';

const Sort = () => {
  const { activeSortOption, sortList } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const handleOption = (sortElement: SortListType) => {
    dispatch(setActiveSortOption(sortElement));
    dispatch(updateActivePage(1));
    setIsOpen(false);
  };

  // обробляємо клік, якщо клік відбувається не по елементу сорт, то закриваємо попап
  useEffect(() => {
    const handleClose = (e: MouseEvent): void => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('click', handleClose);

    // видаляємо прослухохувач при розмонтіровці елемента, якщо не видалити,
    //  то при наступному рендері цього компонента буде вже два прослуховувача і т.д.
    return () => {
      document.body.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        {isOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        <b>Сортування за:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{activeSortOption.name}</span>
      </div>
      <div className={isOpen ? 'sort__popup' : 'sort__popup__hidden'}>
        <ul>
          {sortList.map((sortElement) => (
            <li
              key={sortElement.name}
              onClick={() => handleOption(sortElement)}
              className={activeSortOption.name === sortElement.name ? 'active' : ''}>
              {sortElement.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sort;
