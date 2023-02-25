import { useState } from 'react';

const Pagination = ({ pizzaQuantity = 10, portionSize = 5, pageSize = 4, onPageChanged }) => {
  const [activePage, setActivePage] = useState(Number(sessionStorage.getItem('page')) || 1);

  let pagesCount = Math.ceil(pizzaQuantity / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPotionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPotionPageNumber = portionNumber * portionSize;

  const handlePageChange = (page) => {
    setActivePage(page);
    sessionStorage.setItem('page', String(page));
    onPageChanged(page);
  };

  return (
    <div className="pagination">
      {portionNumber > 1 && (
        <button
          className="pagination__button"
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}>
          prev
        </button>
      )}

      {pages
        .filter((p) => p >= leftPotionPageNumber && p <= rightPotionPageNumber)
        .map((p) => {
          return (
            <span
              className={activePage === p ? 'pagination__button active' : 'pagination__button'}
              key={p}
              onClick={() => handlePageChange(p)}>
              {p}
            </span>
          );
        })}

      {portionNumber < portionCount && (
        <button
          className="pagination__button"
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}>
          next
        </button>
      )}
    </div>
  );
};

export default Pagination;
