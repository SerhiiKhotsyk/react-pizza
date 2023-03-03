import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Header: React.FC = () => {
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
      </div>
    </div>
  );
};

export default Header;
