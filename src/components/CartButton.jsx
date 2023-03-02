import { useEffect } from 'react';
import { IoMdCart } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCartState } from '../redux/slices/cartSlice';
import { getLSCartData, setLSCartData } from '../utils/localStorageRequest';

const CartButton = () => {
  const { totalPrice, totalProductQuantity, products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // При першій загрузці, беремо стейт з localStorage і встановлюємо в картстейт
  useEffect(() => {
    dispatch(updateCartState(getLSCartData()));
  }, []);

  // при зміні картстейта, заносимо зміни в localStorage
  useEffect(() => {
    setLSCartData(products, totalProductQuantity, totalPrice);
  }, [products]);

  return (
    <div className="header__cart">
      <Link to="/cart" className="button button--cart">
        <span>{totalPrice} грн</span>
        <div className="button__delimiter"></div>
        <IoMdCart />
        <span>{totalProductQuantity}</span>
      </Link>
    </div>
  );
};

export default CartButton;
