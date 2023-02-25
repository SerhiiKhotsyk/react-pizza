import { useContext } from 'react';
import { SearchContext } from '../App';
import { BiSearch } from 'react-icons/bi';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className="search">
      <BiSearch className="search__icon" />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Введіть назву піци..."
      />
      {searchValue && (
        <IoIosCloseCircleOutline className="close__icon" onClick={() => setSearchValue('')} />
      )}
    </div>
  );
};

export default Search;
