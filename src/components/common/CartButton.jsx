import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import BuyIcon from '../../assets/icons/buy.svg';
import BuyWhiteIcon from '../../assets/dark-icons/Buy.svg';
import { ThemeContext } from '../../themeContext';

const CartButton = ({ cart }) => {
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const cartItems = cart.reduce((previous, current) => previous + current.qty, 0);

  return (
    <button
      type="button"
      onClick={() => history.push('/cart')}
      className="ml-3 flex justify-center items-center p-2 rounded-xl bg-white dark:bg-featureCard-dark-bg shadow-lg"
    >
      <span className="inline-block relative">
        <img src={theme === 'light' ? BuyIcon : BuyWhiteIcon} alt="Login" className="w-6 h-6" />
        <span className="absolute -top-3 -right-3 block h-4 w-4 rounded-full ring-2 ring-white bg-login-button-bg text-body-2xs">
          {cartItems}
        </span>
      </span>
    </button>
  );
};

const mapStateToProps = ({ app }) => ({
  cart: app.cart,
});

export default connect(mapStateToProps, null)(CartButton);
