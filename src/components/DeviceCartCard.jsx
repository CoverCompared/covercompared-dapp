import React, { useState, useContext, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../redux/actions/AppActions';
import EditIcon from '../assets/img/Edit.svg';
import EditIconWhite from '../assets/dark-icons/Edit.svg';
import DeleteIcon from '../assets/img/Delete.svg';
import BookIcon from '../assets/img/book-icon.png';
import BookWhiteIcon from '../assets/img/book-icon-white.png';
import DeleteIconWhite from '../assets/dark-icons/Delete.svg';
import { ThemeContext } from '../themeContext';
import CheckoutForm from './CheckoutForm';
import Modal from './common/Modal';
import MSOAdditionalDetails from './MSOAddtionalDetails';
import AdditionalDetails from './AdditionalDetails';
import 'react-circular-progressbar/dist/styles.css';

const DeviceCartCard = (props) => {
  const {
    device,
    brand,
    uuid,
    device_value,
    purchase_month,
    quote_chain,
    quote,
    planType,
    tran_id,
    quote_currency,
  } = props;

  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  return (
    <>
      <div className="dark:bg-featureCard-dark-bg rounded-xl shadow-md bg-white">
        <div className="md:py-4 md:px-4 p-3 md:pr-8 rounded-xl grid grid-cols-12 gap-x-1 mb-4 relative md:bg-cartCardBg bg-mobileCartCardBg bg-100% bg-no-repeat bg-right">
          <div className="md:col-span-7 col-span-8 flex items-center h-full">
            <div
              className="md:w-20 md:h-20 w-14 h-14 rounded-xl shadow-2xl p-1 relative bg-white"
              // style={{ minWidth: 'fit-content' }}
            >
              <img
                src="https://via.placeholder.com/400x250.png"
                className="h-full w-full rounded-xl bg-fixed"
                alt="0"
              />
              {/* <img src={company_icon} className="absolute right-1 bottom-1 max-h-5" alt="" /> */}
            </div>
            <div className="md:ml-6 ml-4 md:mr-10">
              <div>
                <div className="font-Montserrat md:text-h6 text-body-md font-semibold text-dark-blue dark:text-white md:mb-0">
                  {brand} {device}
                </div>
              </div>
              <div className="md:hidden flex items-center">
                <span className="font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white mr-2">
                  Price
                </span>
                <span className="font-Montserrat md:text-h4 text-body-md font-semibold text-dark-blue leading-4 dark:text-white">
                  {quote}
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:col-span-2 md:flex flex-col justify-center">
            <div className="font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white">
              Price
            </div>
            <div className="font-Montserrat text-h4 font-semibold text-dark-blue mt-2 leading-4 dark:text-white">
              {quote} <span className="font-medium text-body-md">{quote_currency}</span>
            </div>
          </div>
          <div className="flex items-center justify-end md:col-span-3 col-span-4">
            <button type="button" onClick={() => dispatch(removeCartItem(uuid))}>
              <img
                src={theme === 'light' ? DeleteIcon : DeleteIconWhite}
                alt="Delete"
                className="md:h-6 md:w-6 h-5"
              />
            </button>
            <Modal
              title="Device Plan Addtional Details"
              bgImg="md:bg-additionalDetailsBg1 bg-mobilePopupBg bg-right-bottom bg-no-repeat bg-contain"
              renderComponent={AdditionalDetails}
            >
              <div className="cursor-pointer md:mx-4 mx-3">
                <img
                  src={theme === 'light' ? BookIcon : BookWhiteIcon}
                  alt="Edit"
                  className="md:h-6 md:w-6 h-5"
                />
              </div>
            </Modal>

            {/* <Modal
              title={renderModalTitle()}
              bgImg="md:bg-formPopupBg bg-formPopupMobileBg bg-contain bg-no-repeat"
              renderComponent={CheckoutForm}
              {...{
                uuid,
                formData,
                unique_id,
                userTypeOptions,
                noOfSpouse,
                noOfDependent,
                mainMemberParents,
                spouseParents,
                totalUsers,
              }}
            >
              <div className="h-7 w-7 cursor-pointer">
                <CircularProgressbarWithChildren
                  value={formData ? 100 : 0}
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
                    <strong className="text-dark-blue dark:text-white">
                      {formData ? 100 : 0}%
                    </strong>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </Modal> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default DeviceCartCard;
