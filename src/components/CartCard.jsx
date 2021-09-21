import React, { useState, useContext } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { useDispatch } from 'react-redux';
import { removeItemToCart } from '../redux/actions/AppActions';
import EditIcon from '../assets/img/Edit.svg';
import EditIconWhite from '../assets/dark-icons/Edit.svg';
import DeleteIcon from '../assets/img/Delete.svg';
import BookIcon from '../assets/img/book-icon.png';
import BookWhiteIcon from '../assets/img/book-icon-white.png';
import DeleteIconWhite from '../assets/dark-icons/Delete.svg';
import { ThemeContext } from '../themeContext';
// import CheckoutForm from './CheckoutForm';
import Modal from './common/Modal';
import 'react-circular-progressbar/dist/styles.css';

const CartCard = (props) => {
  const {
    name,
    quote,
    uuid,
    logo,
    company_icon,
    quote_currency,
    curency,
    qty,
    type,
    company_code,
    address,
    product_id,
    currency,
    company,
    currency_limit,
    duration_days_max,
    duration_days_min,
    periodType,
    period,
    quote_chain,
    supportedChains,
  } = props;
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  return (
    <div className="dark:bg-featureCard-dark-bg rounded-xl shadow-md bg-white">
      <div className="py-4 px-4 md:pr-8 rounded-xl grid grid-cols-12 gap-x-1 mb-4 relative md:bg-cartCardBg bg-mobileCartCardBg bg-contain bg-100% bg-no-repeat bg-right">
        <div className="md:col-span-6 col-span-7 flex items-center h-full">
          <div
            className="md:w-20 md:h-20 w-16 h-16 rounded-xl shadow-2xl p-1 relative bg-white"
            style={{ minWidth: 'fit-content' }}
          >
            <img src={logo} className="h-full w-full rounded-xl bg-fixed" alt={name} />
            <img src={company_icon} className="absolute right-1 bottom-1 max-h-5" alt="" />
          </div>
          <div className="md:ml-6 ml-4 md:mr-10">
            <div className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white mb-2 md:mb-0">
              {name}
            </div>
            <div className="md:hidden flex items-center">
              <span className="font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white mr-2">
                Price
              </span>
              <span className="font-Montserrat md:text-h4 text-body-md font-semibold text-dark-blue leading-4 dark:text-white">
                {quote ? quote.toFixed(6) : '---'} {quote_currency}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:col-span-3 md:flex flex-col justify-center">
          <div className="font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white">
            Price
          </div>
          <div className="font-Montserrat text-h4 font-semibold text-dark-blue mt-2 leading-4 dark:text-white">
            {quote ? quote.toFixed(6) : '---'}{' '}
            <span className="font-medium text-body-md">{quote_currency}</span>
          </div>
        </div>
        <div className="flex items-center justify-end md:col-span-3 col-span-5">
          <button type="button" onClick={() => dispatch(removeItemToCart(uuid))}>
            <img
              src={theme === 'light' ? DeleteIcon : DeleteIconWhite}
              alt="Delete"
              className="md:h-6 md:w-6 h-5"
            />
          </button>
          <div className="cursor-pointer md:mx-4 mx-3">
            <img
              src={theme === 'light' ? BookIcon : BookWhiteIcon}
              alt="Edit"
              className="md:h-6 md:w-6 h-5"
            />
          </div>
          <Modal
            title="MSO checkout form"
            bgImg="md:bg-formPopupBg bg-formPopupMobileBg bg-cover bg-no-repeat"
            // renderComponent={<CheckoutForm {...props} />}
          >
            <div className="h-7 w-7 cursor-pointer">
              <CircularProgressbarWithChildren
                value={66}
                styles={buildStyles({
                  pathColor: `#0CED58`,
                  textColor: 'text-dark-blue',
                  trailColor: '#d6d6d6',
                })}
              >
                <img
                  style={{ width: '14px', height: '14px' }}
                  src={theme === 'light' ? EditIcon : EditIconWhite}
                  alt="Edit"
                />
                <div
                  style={{
                    fontSize: 8,
                    position: 'absolute',
                    marginRight: '-10',
                    top: '-4px',
                    left: '-6px',
                  }}
                >
                  <strong>66%</strong>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
