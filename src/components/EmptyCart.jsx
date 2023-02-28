import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Кошик порожній <icon>😕</icon>
          </h2>
          <p>
            Найімовірніше, ви ще не замовляли піцу.
            <br />
            Щоб замовити піцу, перейдіть на головну сторінку.
          </p>
          <img src="/img/empty-cart.png" alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Повернутися назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
