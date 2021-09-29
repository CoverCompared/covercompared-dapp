import React, { useState } from 'react';
import uniqid from 'uniqid';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { emptyCart } from '../redux/actions/AppActions';
import CartCard from '../components/CartCard';
import DeviceCartCard from '../components/DeviceCartCard';
import RightArrow from '../assets/img/Arrow-Right.svg';
import { setLoginModalVisible } from '../redux/actions';

const Cart = (props) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.app);
  const { account } = useWeb3React();
  const [promoCode, setPromoCode] = useState('');

  const subTotal = cart
    .reduce((previous, current) => {
      const { cardType, quote, addOnQuote, wantAddon } = current;
      if (cardType === 'mso' && wantAddon) {
        return previous + +quote + +addOnQuote;
      }
      return previous + +quote;
    }, 0)
    .toFixed(2);

  const taxAmount = 0;
  const grandTotal = (+subTotal + +taxAmount).toFixed(2);

  const handleCheckout = () => {
    if (account) {
      toast.success('Item(s) purchased successfully!');
      dispatch(emptyCart());
    } else {
      toast.warning('You need to login in advance!');
      dispatch(setLoginModalVisible(true));
    }
  };

  return (
    <div className="md:py-6 md:px-10">
      <div className="grid xl:grid-cols-12 lg:grid-cols-2 md:grid-cols-2 xl:gap-10 lg:gap-8 md:gap-6 xl:px-40 md:px-24 lg:px-24 z-10 gap-y-10">
        <div className="col-span-12 lg:col-span-8">
          <div className="font-Montserrat text-dark-blue font-semibold text-h2 mb-6 dark:text-white">
            Order Cart
          </div>
          {cart?.length ? (
            cart.map((cart) =>
              cart.cardType !== 'device' ? (
                <CartCard key={uniqid()} {...props} {...cart} />
              ) : (
                <DeviceCartCard key={uniqid()} {...props} {...cart} />
              ),
            )
          ) : (
            <div className="text-center bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="font-Montserrat text-h5 font-semibold mb-2">
                Shopping cart is empty
              </div>
              <div className="font-Montserrat text-body-md font-medium leading-4 text-gray-600">
                You have no items in your shopping cart.
              </div>
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="font-Montserrat text-dark-blue font-semibold text-h2 mb-6 dark:text-white">
            Payment
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 dark:bg-featureCard-dark-bg">
            <div className="flex justify-between items-center">
              <div className="font-Montserrat md:text-h6 text-body-md font-semibold text-dark-blue dark:text-white">
                Sub Total
              </div>
              <div className="font-Montserrat md:text-h6 text-body-md font-semibold text-dark-blue dark:text-white">
                ${subTotal}
              </div>
            </div>
            <div className="flex justify-between items-center md:mt-6 md:mb-4 mt-4 mb-3">
              <div className="font-Montserrat md:text-h6 text-body-md font-semibold text-dark-blue dark:text-white">
                Tax
              </div>
              <div className="font-Montserrat md:text-h6 text-body-md font-semibold text-dark-blue dark:text-white">
                ${taxAmount}
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="font-Montserrat md:text-h6 text-body-md font-semibold text-dark-blue dark:text-white col-span-6 flex items-center">
                Promo Code
              </div>
              <input
                type="text"
                name="promoCode"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="px-4 py-3 col-span-6 text-right bg-promo-input-bg rounded-lg text-Montserrat text-dark-blue border-0 font-semibold text-body-md focus:outline-none focus:ring-0 focus:border-none"
              />
            </div>
            <div className="border-b-2 border-black dark:border-white w-full border-solid md:mt-6 md:mb-4 mt-4 mb-3" />
            <div className="flex justify-between items-center md:mt-6 md:mb-4 mt-4 mb-3">
              <div className="font-Montserrat md:text-h6 text-body-md font-semibold text-dark-blue dark:text-white">
                Total
              </div>
              <div className="font-Montserrat md:text-h6 text-body-md font-semibold text-dark-blue dark:text-white">
                ${grandTotal}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full h-11 mt-6 flex justify-center items-center font-Montserrat font-semibold text-body-md rounded-xl text-white bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2"
            >
              <span>Check Out</span>
              <img src={RightArrow} alt="" className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
