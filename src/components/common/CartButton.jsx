import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import BuyIcon from '../../assets/icons/buy.svg';
import BuyWhiteIcon from '../../assets/dark-icons/Buy.svg';
import { ThemeContext } from '../../themeContext';

const CartButton = () => {
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const { cart } = useSelector((state) => state.app);

  return (
    <button
      type="button"
      onClick={() => history.push('/cart')}
      className="ml-3 flex justify-center items-center p-2 rounded-xl bg-white dark:bg-featureCard-dark-bg shadow-addToCart"
    >
      <span className="inline-block relative">
        <img
          src={theme === 'light' ? BuyIcon : BuyWhiteIcon}
          alt="Login"
          className="md:w-7 md:h-7 h-5 w-5"
        />
        {!!cart?.length && (
          <span className="absolute -top-3 -right-3 block h-4 w-4 rounded-full ring-2 ring-white bg-login-button-bg text-body-2xs">
            {cart?.length}
          </span>
        )}
      </span>
    </button>
  );
};

export default CartButton;
