import { Link } from 'react-router-dom';
import Search from './Search';
import { IoMdCart } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Header = () => {
  const { totaPrice, totalProductQuantity } = useSelector((state) => state.cart);
  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img width="38" src="./img/pizza-logo.svg" alt="Pizza logo" />
          <div className="header__logo--text">
            <h1>React Pizza</h1>
            <p>найсмачніша піца у всесвіті</p>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totaPrice} грн</span>
            <div className="button__delimiter"></div>
            <IoMdCart />
            <span>{totalProductQuantity}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
