import { Link } from 'react-router-dom';
import Search from './Search';
import { IoMdCart } from 'react-icons/io';

const Header = () => {
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
            <span>520 грн</span>
            <div className="button__delimiter"></div>
            <IoMdCart />
            <span>3</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
