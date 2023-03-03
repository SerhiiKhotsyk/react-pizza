import React from 'react';
import { useEffect } from 'react';
import { IoMdCart } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCart } from '../redux/slices/cart/selectors';
import { updateCartState } from '../redux/slices/cart/slice';
import { getLSCartData, setLSCartData } from '../utils/localStorageRequest';

export const CartButton: React.FC = () => {
  const { totalPrice, totalProductQuantity, products } = useSelector(selectCart);
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
