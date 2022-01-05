import React, { useContext, useState } from 'react';

import SwapIcon from '../../assets/img/swap-icon.svg';
import SwapWhiteIcon from '../../assets/img/swap-white-icon.svg';
import { ThemeContext } from '../../themeContext';

const SwapCurrency = () => {
  const { theme } = useContext(ThemeContext);

  const [isOpen, setISOpen] = useState(false);
  const [firstCurrency, setFirstCurrency] = useState(0);
  const [secondCurrency, setSecondCurrency] = useState(0);

  const changeCurrencySlot = () => {
    setFirstCurrency(secondCurrency);
    setSecondCurrency(firstCurrency);
  };

  return (
    <>
      <div className="relative ml-3 duration-150">
        <div
          onClick={() => setISOpen(!isOpen)}
          className="p-2 rounded-xl cursor-pointer bg-white dark:bg-featureCard-dark-bg shadow-addToCart"
        >
          <img src={theme === 'light' ? SwapIcon : SwapWhiteIcon} alt="Swap" />
        </div>

        {isOpen && (
          <>
            <div
              className="absolute -bottom-64 right-2/4  bg-optionContainerBg p-4 rounded-lg"
              style={{ transform: `translateX(${50}%)` }}
            >
              <div className="bg-white rounded-lg p-6">
                <div className="font-Montserrat font-semibold text-dark-blue text-h5 md:text-body-md mb-4">
                  Swap
                </div>
                <div className="flex justify-between items-center p-4 bg-promo-input-bg rounded-lg w-72 relative mb-2">
                  <div className="text-dark-blue font-Montserrat font-semibold text-body-md mr-6">
                    ETH
                  </div>
                  <input
                    type="text"
                    name=""
                    value={firstCurrency}
                    onChange={(e) => setFirstCurrency(e.target.value)}
                    className="text-dark-blue font-Montserrat font-semibold text-body-md w-full h-5 pr-0 py-0 text-right border-none focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 focus:shadow-0 outline-none bg-transparent"
                  />
                  <div
                    className="absolute right-2/4 -bottom-5 cursor-pointer bg-swapIconBg p-2 border-2 border-white shadow-addToCart rounded-xl"
                    style={{ transform: `translateX(${50}%)` }}
                    onClick={changeCurrencySlot}
                  >
                    <img loading="lazy" src={SwapIcon} alt="" className="w-4" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-promo-input-bg rounded-lg w-72">
                  <div className="text-dark-blue font-Montserrat font-semibold text-body-md">
                    ETH
                  </div>
                  <input
                    type="text"
                    name=""
                    value={secondCurrency}
                    onChange={(e) => setSecondCurrency(e.target.value)}
                    className="text-dark-blue font-Montserrat font-semibold text-body-md w-full h-5 pr-0 py-0 text-right border-none focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 focus:shadow-0 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default SwapCurrency;
