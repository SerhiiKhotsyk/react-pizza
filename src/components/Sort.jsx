import { useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

const Sort = ({ activeSortOption, setActiveSortOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortList = [
    { name: 'популярностю', sortBy: 'rating', order: 'desc' },
    { name: 'ціною (найдешевші спочатку)', sortBy: 'price', order: 'asc' },
    { name: 'ціною (найдорожчі спочатку)', sortBy: 'price', order: 'desc' },
    { name: 'алфавітом', sortBy: 'title', order: 'asc' },
  ];

  const handleOption = (sortElement) => {
    setActiveSortOption(sortElement);
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        {isOpen ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
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
