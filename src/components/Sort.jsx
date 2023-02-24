import { useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

const Sort = () => {
  const elemList = ['популярностю', 'ціною', 'алфавітом'];
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(elemList[0]);

  const handleOption = (option) => {
    setActiveOption(option);
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        {isOpen ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
        <b>Сортування за:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{activeOption}</span>
      </div>
      <div className={isOpen ? 'sort__popup' : 'sort__popup__hidden'}>
        <ul>
          {elemList.map((option) => (
            <li
              key={option}
              onClick={(e) => handleOption(option)}
              className={activeOption === option ? 'active' : ''}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sort;
