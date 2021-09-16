import React, { useState } from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import CartCard from '../components/CartCard';
import RightArrow from '../assets/img/Arrow-Right.svg';

const CartArr = [
  {
    productName: 'Product Name 1',
    img: 'https://via.placeholder.com/400x250.png',
    price: '100',
  },
  {
    productName: 'Product Name 2',
    img: 'https://via.placeholder.com/400x250.png',
    price: '200',
  },
  {
    productName: 'Product Name 3',
    img: 'https://via.placeholder.com/400x250.png',
    price: '300',
  },
  {
    productName: 'Product Name 4',
    img: 'https://via.placeholder.com/400x250.png',
    price: '400',
  },
];

const Cart = (props) => {
  const { cart } = props;
  const [promoCode, setPromoCode] = useState('');

  return (
    <div className="py-6 md:px-10">
      <div className="grid xl:grid-cols-12 lg:grid-cols-2 md:grid-cols-2 xl:gap-10 lg:gap-8 md:gap-6 xl:px-40 md:px-24 lg:px-24 z-10">
        <div className="col-span-12 lg:col-span-8">
          <div className="font-Montserrat text-dark-blue font-semibold text-h2 mb-6 dark:text-white">
            Order Cart
          </div>
          {cart?.length ? (
            cart.map((cart) => <CartCard key={uniqid()} {...props} {...cart} />)
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
              <div className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white">
                Sub Total
              </div>
              <div className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white">
                $900
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 mb-4">
              <div className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white">
                Tax
              </div>
              <div className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white">
                $50
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white col-span-6 flex items-center">
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
            <div className="border-b-2 border-black dark:border-white w-full border-solid mt-6 mb-4" />
            <div className="flex justify-between items-center mt-6 mb-4">
              <div className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white">
                Total
              </div>
              <div className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white">
                $950
              </div>
            </div>
            <button
              type="button"
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

const mapStateToProps = ({ app }) => ({
  cart: app.cart,
});

export default connect(mapStateToProps, null)(Cart);
