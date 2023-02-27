import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateActivePage, updatePage } from '../redux/slices/paginationSlice';

const Pagination = ({ pizzaQuantity = 10, portionSize = 5, pageSize = 4 }) => {
  const { activePage } = useSelector((state) => state.pagination);
  // const [activePage, setActivePage] = useState(Number(sessionStorage.getItem('page')) || 1);
  const dispatch = useDispatch();

  let pagesCount = Math.ceil(pizzaQuantity / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  useEffect(() => {
    if (sessionStorage.getItem('page')) {
      dispatch(updateActivePage(Number(sessionStorage.getItem('page'))));
    }
  }, []);

  // portionSize - максимальна к-сть номерів сторінок, що показуєтсья в пагінації
  // pageSize - розмір сторінки
  // pizzaQuantity - макс к-ть піц на сторінці
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPotionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPotionPageNumber = portionNumber * portionSize;

  const handlePageChange = (page) => {
    dispatch(updateActivePage(page));
    sessionStorage.setItem('page', String(page));
    dispatch(updatePage(page));
  };

  // якщо всі надані піцци поміщаються на одній сторінці, то пагінація на потрібна
  if (pizzaQuantity <= pageSize) return;

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
