import React from 'react';
import debounce from 'lodash.debounce';
import { useCallback, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { updateActivePage } from '../redux/slices/pagination/slice';
import { setSearchValue } from '../redux/slices/search/slice';

const Search = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  // обмежує кількість запитів на сервер - при введенні значення в інпут
  // з інтервалом менше ніж півсекунди, запит на сервер не здійснюється
  // був використаний хук useCallback, для зберігання посилання на функцію при монтуванні компонента
  // щоб при кожній зміні (рендері) компонента не створювалася нова функція і не викликалася заново
  const debounceInput = useCallback(
    debounce((val) => {
      dispatch(setSearchValue(val));
    }, 500),
    [],
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    dispatch(updateActivePage(1));
    debounceInput(inputRef.current?.value);
  };

  const handleClose = (): void => {
    setInputValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  return (
    <div className="search">
      <BiSearch className="search__icon" />
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleInput}
        placeholder="Введіть назву піци..."
      />
      {inputValue && <IoIosCloseCircleOutline className="close__icon" onClick={handleClose} />}
    </div>
  );
};

export default Search;
