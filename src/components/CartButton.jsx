import { IoMdCart } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartButton = () => {
  const { totaPrice, totalProductQuantity } = useSelector((state) => state.cart);

  return (
    <div className="header__cart">
      <Link to="/cart" className="button button--cart">
        <span>{totaPrice} грн</span>
        <div className="button__delimiter"></div>
        <IoMdCart />
        <span>{totalProductQuantity}</span>
      </Link>
    </div>
  );
};

export default CartButton;
